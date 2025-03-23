'use client';
import { useInView } from 'react-intersection-observer';
import { useCallback, useEffect, useState } from 'react';
import { EsProduct, ParamFilterObjType } from '@/lib/types';
import { Loader } from '../loader';
import { GET_ES_PRODUCTS } from '@/actions';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
import { CarouselProductCard } from '../cards';

interface Props {
  size: number;
  itemSize: number;
  itemOffset: number;
  total: number;
  hasMore: boolean;
  initialData: EsProduct[];
  loaderClassName?: string;
  afterKey?: string;
  searchParams?: ParamFilterObjType;
}

export const ProductList: React.FC<Props> = ({
  size,
  itemSize,
  itemOffset: propItemOffset,
  total,
  hasMore: propHasMore,
  initialData,
  loaderClassName,
  afterKey: propAfterKey,
  searchParams,
}) => {
  const { t } = useTranslation();
  const [afterKey, setAfterKey] = useState(propAfterKey);
  const [itemOffset, setItemOffset] = useState(propItemOffset);
  const [hasMore, setHasMore] = useState(propHasMore);
  const [data, setData] = useState<EsProduct[]>([]);
  const { inView, ref } = useInView();

  useEffect(() => {
    setData(initialData);
  }, [initialData]);

  useEffect(() => {
    setAfterKey(propAfterKey);
    setItemOffset(propItemOffset);
    setHasMore(propHasMore);
  }, [propAfterKey, propHasMore, propItemOffset]);

  const fetchData = useCallback(async () => {
    let result: EsProduct[] = [];
    let offset = itemOffset;
    let more = hasMore;
    let key = afterKey;

    while (result.length < total) {
      const { data: { products = [], afterKey: aftkey } = {} } = await GET_ES_PRODUCTS({
        params: searchParams,
        itemSize,
        size,
        itemOffset: offset,
        afterKey: key,
      });

      key = aftkey;
      result = result.concat(products);

      if (!key && products.length < 1) more = false;
      if (!key) offset += itemSize;
      if (products.length < 1) break;
    }

    return { result, key, offset, more };
  }, [size, itemSize, total, itemOffset, hasMore, afterKey]);

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
        {data.map((product, index) => (
          <CarouselProductCard key={index} product={product} className="max-w-full" />
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
