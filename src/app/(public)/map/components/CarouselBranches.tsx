'use client';
import { CarouselApi, RCarousel, RCarouselContent, RCarouselItem } from '@/components/general';
import { RestaurantGridCard } from '@/components/shared';
import { useMediaQuery } from '@/lib/hooks';
import { BranchDetail } from '@/lib/types';
import { cn } from '@/lib/utils';
import { BranchMap } from './BranchMap';
import { useCallback, useEffect, useRef, useState } from 'react';
import { GoogleMap } from '@react-google-maps/api';

interface Props {
  branches: BranchDetail[];
  lat: number;
  lng: number;
}

export const CarouselBranches: React.FC<Props> = ({ branches, lat, lng }) => {
  const { width } = useMediaQuery();
  const mapRef = useRef<GoogleMap>(null);
  const [api, setApi] = useState<CarouselApi>();

  const onClickMapItem = useCallback(
    (e: string) => {
      const index = branches.findIndex((branch) => branch.id === e);
      if (index === -1 || !api) return;

      api.scrollTo(index, true);
      showCarousel();
      setTimeout(() => panTo(index), 500);
    },
    [api, branches],
  );

  const panTo = useCallback(
    (index: number) => {
      const activeBranch = branches[index];
      if (!activeBranch) return;
      const { latitude, longitude } = activeBranch;
      if (!latitude || !longitude || latitude === 0 || longitude === 0) return;
      if (!google.maps.LatLng) return;
      const center = new google.maps.LatLng(latitude, longitude);
      mapRef.current?.state.map?.setCenter(center);
    },
    [branches],
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
  }, [api, branches]);

  const hideCarousel = () => {
    const element = document.getElementById('mapCarouselBranchesContainer');
    if (!element) return;

    element.style.transform = 'translateY(130%)';

    const mapElement = document.getElementById('branch-map-origin-container');
    if (!mapElement) return;

    mapElement.className = cn(mapElement.className, 'h-[calc(100vh-120px)]');
  };

  const showCarousel = () => {
    const element = document.getElementById('mapCarouselBranchesContainer');
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
        id="mapCarouselBranchesContainer"
        className="fixed bottom-[50px] left-0 right-0 bg-transparent z-50 rounded-t-2xl overflow-hidden duration-300"
      >
        <RCarousel scrollWidth={300} arrows={false} setApi={setApi}>
          <RCarouselContent className="flex gap-3">
            {branches.map((branch, index) => (
              <RCarouselItem key={index} className={cn(index === 0 && 'ml-3')}>
                <RestaurantGridCard
                  key={index}
                  place={branch}
                  services={false}
                  className="shadow-lg mb-5"
                />
              </RCarouselItem>
            ))}
          </RCarouselContent>
        </RCarousel>
      </div>
      <BranchMap
        ref={mapRef}
        onDragStart={hideCarousel}
        branches={branches}
        center={{ lat, lng }}
        onClick={onClickMapItem}
        className="duration-300 h-[calc(100vh-330px)]"
      />
    </>
  );
};
