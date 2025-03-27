'use client';
import { useInView } from 'react-intersection-observer';
import { useEffect, useState } from 'react';
import { EsChannel, ParamFilterObjType } from '@/lib/types';
import { PositionStorage } from '@/lib/providers';
import { FilteredCard } from '../cards';
import { Loader } from '../loader';
import { GET_ES_CHANNELS_BY_CATEGORIES } from '@/actions';
import { useTranslation } from 'react-i18next';

interface Props {
  position: PositionStorage;
  initialData: EsChannel[];
  size: number;
  searchParams?: ParamFilterObjType;
  afterKey?: string;
}

export const ResultChannelList: React.FC<Props> = ({
  initialData,
  searchParams,
  position,
  size,
  afterKey: propAfterKey,
}) => {
  const { t } = useTranslation();
  const [data, setData] = useState<EsChannel[]>([]);
  const [afterKey, setAfterKey] = useState<string | undefined>(propAfterKey);
  const { inView, ref } = useInView();

  useEffect(() => {
    setData(initialData);
  }, [initialData]);

  useEffect(() => {
    if (inView) {
      GET_ES_CHANNELS_BY_CATEGORIES({
        params: searchParams,
        lat: position.lat,
        lon: position.lon,
        size,
        distance: '10km',
        afterKey,
      }).then(({ data: res = {} }) => {
        const { channels = [], afterKey: aftKey } = res;
        setAfterKey(aftKey);
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
      {afterKey && (
        <section ref={ref}>
          <Loader className="mt-20" spinnerClassName="h-8 w-8" />
        </section>
      )}
    </>
  );
};
