'use client';
import { fetchLocation } from '@/actions';
import { Button, Icons, Input, useModal } from '@/components/general';
import { Loader } from '@/components/shared/loader';
import { Separator } from '@/components/ui';
import { PAGE_HOME } from '@/lib/constant';
import { useLocation } from '@/lib/providers';
import { GoogleLocationPlace } from '@/lib/types';
import { redirectWithNProgress } from '@/lib/utils';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDebouncedCallback } from 'use-debounce';

interface Props {
  onChange: (e?: string) => void;
  redirecPath?: string;
}

export const LocationContent: React.FC<Props> = ({ onChange, redirecPath }) => {
  const { t } = useTranslation();
  const searchParams = useSearchParams();
  const { handleSuccess, handleError } = useLocation();
  const [value, setValue] = useState<string>('');
  const [places, setPlaces] = useState<GoogleLocationPlace[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const { onOpenChange } = useModal() ?? {};

  const search = (value: string) => {
    setLoading(true);
    fetchLocation(value)
      .then(setPlaces)
      .finally(() => setLoading(false));
  };

  const debounced = useDebouncedCallback((value) => {
    if (value) search(value);
    setValue(value);
  }, 500);

  const cb = () => {
    const params = new URLSearchParams(searchParams);
    onOpenChange?.(false);
    redirectWithNProgress(redirecPath ?? `${PAGE_HOME}?${params.toString()}`);
  };

  const onSelectCurrent = () => {
    onChange(undefined);
    navigator.geolocation.getCurrentPosition((e) => handleSuccess(e, undefined, cb), handleError);
  };

  const onSelect = (place: GoogleLocationPlace) => {
    const name = place.displayName.text;
    onChange(name);

    const coords = {
      latitude: place.location.latitude,
      longitude: place.location.longitude,
    };
    handleSuccess({ coords }, name, cb);
  };

  return (
    <div className="flex flex-col w-full sm:w-96">
      <div className="mx-2 mb-1 flex flex-col gap-2">
        <Input
          prefix="search"
          placeholder={t('location')}
          onChange={(e) => debounced(e.target.value)}
          className="h-10"
        />
        <Button
          className="h-10 bg-background relative flex justify-start"
          variant="outline"
          onClick={onSelectCurrent}
        >
          <div>
            <Icons.mappinned className="opacity-100 z-50" />
          </div>
          <div className="animate-ping w-4 absolute bg-current-2 h-4 rounded-full top-3 left-5 opacity-30 z-10"></div>
          <div className="w-full text-center">
            <p className="font-semibold">{t('Current location')}</p>
          </div>
        </Button>
      </div>
      {loading ? (
        <Loader className="h-40 w-full min-w-40" />
      ) : (
        value &&
        (places.length < 1 ? (
          <div className="px-3 py-1 text-sm">
            <span className="text-center text-muted-foreground">
              {`"${value}" ` + t(`No results found for`)}
            </span>
          </div>
        ) : (
          <div className="px-3 py-1 max-h-[calc(100vh-150px)] overflow-y-auto sm:max-h-[500px]">
            {places.map((item, index) => (
              <>
                <div
                  key={index}
                  className="cursor-pointer hover:bg-current-1 rounded-md"
                  onClick={() => onSelect(item)}
                >
                  <p className="px-2 w-full truncate font-semibold">{item.displayName.text}</p>
                  <p className="px-2 w-full truncate">{item.formattedAddress}</p>
                </div>
                <Separator className="my-1" />
              </>
            ))}
          </div>
        ))
      )}
    </div>
  );
};
