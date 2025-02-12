"use client";
import { GET_BANNERS } from "@/graphql/query";
import { BannerType } from "@/lib/config/constant";
import { Banner } from "@/lib/types";
import { shuffleArray } from "@/lib/utils";
import { useQuery } from "@apollo/client";
import { useRef, useState } from "react";
import fallback from "@/assets/images/noImage.jpg";
import Dots from "../shared/dots";
import Image from "next/image";
interface Props {
  types: BannerType[];
  empty?: boolean;
  dot?: boolean;
}

export const SmartBanner = ({ types, empty, dot }: Props) => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const { loading } = useQuery<{ getBanners: Banner[] }>(GET_BANNERS, {
    fetchPolicy: "network-only",
    onCompleted(data) {
      setBanners(
        shuffleArray(
          data.getBanners.filter((item) => types.includes(item.type))
        )
      );
    },
  });

  const imageRefs = useRef<(HTMLImageElement | null)[]>([]);

  // const plugin = useRef(Autoplay({ delay: 5000, stopOnInteraction: true }));

  const onClickItem = (item: Banner) => {
    let url = null;
    const actions = item.actions;
    if (!actions || !actions[0]?.url || [BannerType.P].includes(item.type))
      return;
    url = actions[0].url;
    window.open(url, "_blank");
  };

  if (loading) return <></>;

  if (!loading && banners && banners.length < 1) {
    if (empty) return <></>;
    return <></>;
  }

  return (
    <div className="pb-2 md:py-4">
      <div className="gap-4 overflow-y-auto no-scrollbar w-full py-2  flex flex-row md:justify-around px-2">
        {banners.map((item, index) => (
          <Image
            onClick={() => onClickItem(item)}
            className="rounded-xl w-auto h-auto  md:max-w-[28rem] border"
            alt="stew"
            key={`image-${index}`}
            src={!item.image ? fallback : item.image}
            width={500}
            ref={(el) => {
              imageRefs.current[index] = el;
            }}
            data-index={index}
            height={types.includes(BannerType.A) ? 228 : 172}
          />
        ))}
      </div>
      {dot && <Dots imageRefs={imageRefs} length={banners?.length} />}
    </div>
  );
};
