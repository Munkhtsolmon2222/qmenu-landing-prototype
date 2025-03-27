'use client';
import { useInView } from 'react-intersection-observer';
import { useEffect, useState } from 'react';
import { EsChannel, ParamFilterObjType } from '@/lib/types';
import { PositionStorage } from '@/lib/providers';
import { FilteredCard } from '../cards';
import { Loader } from '../loader';
import { GET_ES_CHANNELS } from '@/actions';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';

interface Props {
  searchParams?: ParamFilterObjType;
  position: PositionStorage;
  initialData: EsChannel[];
  limit?: number;
  loaderClassName?: string;
}

export const ChannelList: React.FC<Props> = ({
  initialData,
  searchParams,
  position,
  limit = 40,
  loaderClassName,
}) => {
  const { t } = useTranslation();
  const [data, setData] = useState<EsChannel[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const { inView, ref } = useInView();

  useEffect(() => {
    setData(initialData);
    setHasMore(initialData.length >= limit);
  }, [initialData]);

  useEffect(() => {
    if (inView) {
      GET_ES_CHANNELS({
        params: searchParams,
        lat: position.lat,
        lon: position.lon,
        limit,
        offset: data.length,
        distance: '10km',
      }).then(({ data: res = {} }) => {
        const { channels = [] } = res;
        if (channels.length < limit) setHasMore(false);
        setData([...data, ...channels]);
      });
    }
  }, [inView]);

  if (initialData.length < 1)
    return (
      <div className="h-[50vh] flex flex-col items-center justify-center">
        <h1 className="text-2xl text-center mt-10">
          {t('EmptyBranch')}
          <span className="block text-sm text-gray-500 mt-2">{t('Try another filters')}</span>
        </h1>
      </div>
    );

  return (
    <>
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 w-full">
        {data.map((channel, index) => (
          <FilteredCard key={index} channel={channel} services />
        ))}
      </section>
      {hasMore && (
        <section ref={ref}>
          <Loader className={cn('mt-20', loaderClassName)} spinnerClassName="h-8 w-8" />
        </section>
      )}
    </>
  );
};
