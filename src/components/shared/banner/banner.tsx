'use client';
import { Banner } from '@/lib/types';
import { useRef } from 'react';
import fallback from '@/assets/images/noImage.jpg';
// import Image from 'next/image';
import { BannerType } from '@/lib/constant';
import { Dots } from './dots';

interface Props {
  banners: Banner[];
  types: BannerType[];
  empty?: boolean;
  dot?: boolean;
}

export const SmartBanner = ({ banners, types, empty, dot }: Props) => {
  const imageRefs = useRef<(HTMLImageElement | null)[]>([]);

  // const plugin = useRef(Autoplay({ delay: 5000, stopOnInteraction: true }));

  const onClickItem = (item: Banner) => {
    let url: string;
    const actions = item.actions;
    if (!actions || !actions[0]?.url || [BannerType.P].includes(item.type)) return;
    url = actions[0].url;
    window.open(url, '_blank');
  };

  if (!banners || banners.length < 1) {
    // if (empty) return <></>;
    return <></>;
  }

  return (
    <div className="pb-2 md:py-4">
      <div className="gap-4 overflow-y-auto no-scrollbar w-full py-2 flex flex-row md:justify-around px-2">
        {banners.map((item, index) => (
          <img
            onClick={() => onClickItem(item)}
            className="rounded-xl w-auto h-auto md:max-w-[28rem] border"
            alt="stew"
            key={`image-${index}`}
            src={!item.image ? fallback.src : item.image}
            ref={(el) => {
              imageRefs.current[index] = el;
            }}
            data-index={index}
            // height={types.includes(BannerType.A) ? 228 : 172}
          />
        ))}
      </div>
      {dot && <Dots imageRefs={imageRefs} length={banners?.length} />}
    </div>
  );
};
