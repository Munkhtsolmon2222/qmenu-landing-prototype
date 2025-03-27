'use client';
import { useInView } from 'react-intersection-observer';
import { useCallback, useEffect, useState } from 'react';
import { DiscountType, EsDiscount } from '@/lib/types';
import { Loader } from '../loader';
import { GET_ES_DISCOUNTS } from '@/actions';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
import DiscountCard from '../cards/discount';

interface Props {
  types?: DiscountType[];
  size: number;
  itemSize: number;
  itemOffset: number;
  total: number;
  hasMore: boolean;
  initialData: EsDiscount[];
  loaderClassName?: string;
  afterKey?: string;
}

export const DiscountList: React.FC<Props> = ({
  types,
  size,
  itemSize,
  itemOffset: propItemOffset,
  total,
  hasMore: propHasMore,
  initialData,
  loaderClassName,
  afterKey: propAfterKey,
}) => {
  const { t } = useTranslation();
  const [afterKey, setAfterKey] = useState(propAfterKey);
  const [itemOffset, setItemOffset] = useState(propItemOffset);
  const [hasMore, setHasMore] = useState(propHasMore);
  const [data, setData] = useState<EsDiscount[]>([]);
  const { inView, ref } = useInView();

  useEffect(() => {
    setData(initialData);
  }, [initialData]);

  const fetchData = useCallback(async () => {
    let result: EsDiscount[] = [];
    let offset = itemOffset;
    let more = hasMore;
    let key = afterKey;

    while (result.length < total) {
      const { data: { discounts = [], afterKey: aftkey } = {} } = await GET_ES_DISCOUNTS({
        types,
        itemSize,
        size,
        itemOffset: offset,
        afterKey: key,
      });

      key = aftkey;
      result = result.concat(discounts);

      if (!key && discounts.length < 1) more = false;
      if (!key) offset += itemSize;
      if (discounts.length < 1) break;
    }

    return { result, key, offset, more };
  }, [types, size, itemSize, total, itemOffset, hasMore, afterKey]);

  useEffect(() => {
    if (inView)
      fetchData().then(({ result, key, offset, more }) => {
        setAfterKey(key);
        setItemOffset(offset);
        setHasMore(more);
        setData([...data, ...result]);
      });
  }, [inView, fetchData]);

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
        {data.map((discount, index) => (
          <DiscountCard key={index} discount={discount} />
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
