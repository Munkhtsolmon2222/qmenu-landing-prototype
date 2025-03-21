'use client';
import { RestaurantListCard } from '@/components/shared';
import { useMediaQuery } from '@/lib/hooks';
import { EsChannel } from '@/lib/types';
import { cn } from '@/lib/utils';
import { useSearchParams } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { ChannelMap } from './ChannelMap';
import { useRef } from 'react';
import { GoogleMap } from '@react-google-maps/api';
import { motion } from 'framer-motion';

interface Props {
  channels: EsChannel[];
  lat: number;
  lng: number;
}

export const ListChannels: React.FC<Props> = ({ channels, lat, lng }) => {
  const { width } = useMediaQuery();
  const searchParams = useSearchParams();
  const { t } = useTranslation();
  const listRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mapRef = useRef<GoogleMap>(null);

  const onClickMapItem = (e: string) => {
    const index = channels.findIndex((branch) => branch.id === e);
    if (index === -1) return;

    // const { latitude, longitude } = channels[index];
    // if (!latitude || !longitude || latitude === 0 || longitude === 0) return;
    // if (!google.maps.LatLng) return;
    // const center = new google.maps.LatLng(latitude, longitude);
    // mapRef.current?.state.map?.setCenter(center);

    const targetElement = listRefs.current[index];
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'instant', block: 'center' });

      targetElement.animate(
        [
          { transform: 'scale(1)', border: '1px solid #ccc' },
          { transform: 'scale(1.05)', border: '1px solid #ff5733' },
          { transform: 'scale(1)', border: '1px solid #ccc' },
        ],
        {
          // duration: 700,
          duration: 500,
          easing: 'ease-out',
        },
      );
    }
  };

  const setRef = (index: number) => (el: HTMLDivElement | null) => {
    listRefs.current[index] = el;
  };

  if (width <= 768) return <></>;
  return (
    <>
      <div
        className={cn(
          'col-span-3 xl:col-span-2 border-x h-full overflow-y-auto',
          searchParams.size > 0 ? 'max-h-[calc(100vh_-_140px)]' : 'max-h-[calc(100vh_-_85px)]',
        )}
      >
        <div className="sticky top-0 z-20 bg-background p-2 shadow font-semibold">
          {t('Search result')}: {channels.length}
        </div>
        <div className="p-2">
          {channels.map((branch, index) => (
            <motion.div key={index} ref={setRef(index)} className="rounded-md">
              <RestaurantListCard
                key={index}
                place={branch}
                className="mb-1 hover:shadow-md duration-200"
              />
            </motion.div>
          ))}
        </div>
      </div>
      <ChannelMap
        className="col-span-3 xl:col-span-4"
        ref={mapRef}
        channels={channels}
        center={{ lat, lng }}
        onClick={onClickMapItem}
      />
    </>
  );
};
