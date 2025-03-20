'use client';
import { useInView } from 'react-intersection-observer';
import { useEffect, useState } from 'react';
import { BranchDetail } from '@/lib/types';
import { PositionStorage } from '@/lib/providers';
import { FilteredCard } from '../cards';
import { Loader } from '../loader';
import { FILTER_RESULT } from '@/actions';
import { useTranslation } from 'react-i18next';

interface Props {
  filters: string[];
  position: PositionStorage;
  initialData: BranchDetail[];
  limit?: number;
}

export const ResultList: React.FC<Props> = ({ initialData, filters, position, limit = 40 }) => {
  const { t } = useTranslation();
  const [data, setData] = useState<BranchDetail[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const { inView, ref } = useInView();

  useEffect(() => {
    setData(initialData);
    setHasMore(initialData.length >= limit);
  }, [initialData]);

  useEffect(() => {
    if (inView) {
      FILTER_RESULT({
        filters,
        lat: position.lat,
        lon: position.lon,
        limit,
        offset: data.length,
        distance: '10km',
      }).then(({ data: { branches: res } = { branches: [] } }) => {
        if (!res || res.length < limit) setHasMore(false);
        setData([...data, ...res]);
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
        {data.map((branch, index) => (
          <FilteredCard key={index} place={branch} services />
        ))}
      </section>
      {hasMore && (
        <section ref={ref}>
          <Loader className="mt-20" spinnerClassName="h-8 w-8" />
        </section>
      )}
    </>
  );
};
