'use client';
import { CarouselApi, RCarousel, RCarouselContent, RCarouselItem } from '@/components/general';
import { RestaurantGridCard } from '@/components/shared';
import { useMediaQuery } from '@/lib/hooks';
import { EsChannel } from '@/lib/types';
import { cn } from '@/lib/utils';
import { ChannelMap } from './ChannelMap';
import { useCallback, useEffect, useRef, useState } from 'react';
import { GoogleMap } from '@react-google-maps/api';

interface Props {
  channels: EsChannel[];
  lat: number;
  lng: number;
}

export const CarouselChannels: React.FC<Props> = ({ channels, lat, lng }) => {
  const { width } = useMediaQuery();
  const mapRef = useRef<GoogleMap>(null);
  const [api, setApi] = useState<CarouselApi>();

  const onClickMapItem = useCallback(
    (e: string) => {
      const index = channels.findIndex((branch) => branch.id === e);
      if (index === -1 || !api) return;

      api.scrollTo(index, true);
      showCarousel();
      setTimeout(() => panTo(index), 500);
    },
    [api, channels],
  );

  const panTo = useCallback(
    (index: number) => {
      const activeBranch = channels[index];
      if (!activeBranch) return;
      const { latitude, longitude } = activeBranch;
      if (!latitude || !longitude || latitude === 0 || longitude === 0) return;
      if (!google.maps.LatLng) return;
      const center = new google.maps.LatLng(latitude, longitude);
      mapRef.current?.state.map?.setCenter(center);
    },
    [channels],
  );

  useEffect(() => {
    if (!api) return;

    const onChange = () => {
      const index = api.selectedScrollSnap();
      panTo(index);
    };

    api.on('select', onChange);

    return () => {
      api.off('select', onChange);
    };
  }, [api, channels]);

  const hideCarousel = () => {
    const element = document.getElementById('mapCarouselChannelsContainer');
    if (!element) return;

    element.style.transform = 'translateY(130%)';

    const mapElement = document.getElementById('branch-map-origin-container');
    if (!mapElement) return;

    mapElement.className = cn(mapElement.className, 'h-[calc(100vh-120px)]');
  };

  const showCarousel = () => {
    const element = document.getElementById('mapCarouselChannelsContainer');
    if (!element) return;

    element.style.transform = 'translateY(0)';

    const mapElement = document.getElementById('branch-map-origin-container');
    if (!mapElement) return;

    mapElement.className = cn(mapElement.className, 'h-[calc(100vh-330px)]');
  };

  if (width > 768) return <></>;
  return (
    <>
      <div
        id="mapCarouselChannelsContainer"
        className="fixed bottom-[50px] left-0 right-0 bg-transparent z-50 rounded-t-2xl overflow-hidden duration-300"
      >
        <RCarousel scrollWidth={300} arrows={false} setApi={setApi}>
          <RCarouselContent className="flex gap-3">
            {channels.map((channel, index) => (
              <RCarouselItem key={index} className={cn(index === 0 && 'ml-3')}>
                <RestaurantGridCard
                  key={index}
                  place={channel}
                  services={false}
                  className="shadow-lg mb-5"
                />
              </RCarouselItem>
            ))}
          </RCarouselContent>
        </RCarousel>
      </div>
      <ChannelMap
        ref={mapRef}
        onDragStart={hideCarousel}
        channels={channels}
        center={{ lat, lng }}
        onClick={onClickMapItem}
        className="duration-300 h-[calc(100vh-330px)]"
      />
    </>
  );
};
