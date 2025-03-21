'use client';
import { GoogleMap, useJsApiLoader, OverlayViewF, OverlayView } from '@react-google-maps/api';
import { EsChannel } from '@/lib/types';
import { Icons } from '@/components/general';
import defaultImage from '@/assets/images/restaurant.png';
import Image from 'next/image';
import { Loader } from '@/components/shared';
import { cn } from '@/lib/utils';
import { useCallback, useState } from 'react';

interface Props
  extends Omit<React.ComponentProps<typeof GoogleMap>, 'center' | 'zoom' | 'onClick'> {
  onMapClick?: () => void;
  onClick?: (id: string) => void;
  channels: EsChannel[];
  center: { lat: number; lng: number };
  ref?: React.RefObject<GoogleMap | null>;
  className?: string;
}

const defaultZoom = 16;

export const ChannelMap: React.FC<Props> = ({
  channels: propChannels,
  center,
  ref,
  onClick,
  className,
  onMapClick,
  ...mapProps
}) => {
  const { loadError, isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.GOOGLE_MAPS_API ?? '',
    id: 'google-map-script',
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [channels, setChannels] = useState<EsChannel[]>([]);

  const onChangeBounds = useCallback(
    (propMap?: google.maps.Map) => {
      const mapInstance = propMap ?? map;
      if (!mapInstance) return;

      const bounds = mapInstance.getBounds();
      if (!bounds) return;

      const ne = bounds.getNorthEast();
      const sw = bounds.getSouthWest();

      const filteredChannels = propChannels.filter(({ latitude, longitude }) => {
        if (!latitude || !longitude) return false;
        return (
          latitude <= ne.lat() &&
          latitude >= sw.lat() &&
          longitude <= ne.lng() &&
          longitude >= sw.lng()
        );
      });

      setChannels(filteredChannels);
    },
    [map, propChannels],
  );

  const onLoad = useCallback(
    (mapInstance: google.maps.Map) => {
      setMap(mapInstance);
      onChangeBounds(mapInstance);
    },
    [onChangeBounds],
  );

  if (loadError) return <div>Error loading Google Maps</div>;
  if (!isLoaded) return <Loader className="h-screen" />;
  return (
    <div
      id="branch-map-origin-container"
      className={cn('w-full col-span-2 h-[calc(100vh-120px)] md:h-full', className)}
    >
      <GoogleMap
        ref={ref}
        mapContainerStyle={{ height: '100%', width: '100%' }}
        center={center}
        zoom={defaultZoom}
        onBoundsChanged={onChangeBounds}
        onLoad={onLoad}
        options={{
          disableDefaultUI: true,
          zoomControl: false,
          gestureHandling: 'greedy',
          disableDoubleClickZoom: true,
        }}
        onClick={onMapClick}
        {...mapProps}
      >
        <div className="md:hidden absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0 -mt-[25px] animate-bounce text-current-2">
          <Icons.chevronDown className="w-8 h-8" />
        </div>

        <div className="hidden md:block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0 -mt-[25px] text-current-2">
          <Icons.pin className="w-8 h-8 fill-current-2" />
        </div>

        {channels.map(({ latitude: lat, longitude: lng, id, logo }, index) => (
          <OverlayViewF
            key={index}
            position={{ lat, lng }}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          >
            <div
              onClick={(e) => {
                e.stopPropagation();
                onClick?.(id);
              }}
              className="cursor-pointer translate-x-1/2 -translate-y-full relative select-none"
            >
              <Icons.pin className="w-[40px] h-[40px] text-current-3 fill-current-3 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
              <Image
                width={40}
                height={40}
                src={logo ?? defaultImage}
                alt=""
                className="w-[25px] h-[25px] object-cover absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full -mt-[3px]"
              />
            </div>
          </OverlayViewF>
        ))}
      </GoogleMap>
    </div>
  );
};
