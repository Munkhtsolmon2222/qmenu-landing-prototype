'use client';
import { ParamFilter, Tag } from '@/lib/types';
import { usePathname, useSearchParams } from 'next/navigation';
import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { ParamReviews } from '@/lib/constant';
import { cn, redirectWithNProgress } from '@/lib/utils';
import { Icons } from '@/components/general';
import { selectFilters, updateParams } from '@/lib/helpers';

interface Props {
  allTags: {
    categories: Tag[];
    cuisineTags: Tag[];
    advantageTags: Tag[];
  };
  className?: string;
  accept?: ParamFilter[];
}

export const FilterContent: React.FC<Props> = ({ allTags, accept, className }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { t } = useTranslation();

  const onChangefilter = (key: ParamFilter, value: string) => {
    const params = updateParams(searchParams, key, value);
    redirectWithNProgress(`${pathname}?${params.toString()}`);
  };

  const array = selectFilters(
    [
      {
        key: ParamFilter.CUISINE,
        tags: allTags.cuisineTags,
      },
      {
        key: ParamFilter.TAG,
        tags: allTags.advantageTags,
      },
      ParamFilter.PRICE,
      ParamFilter.SERVICES,
      {
        key: ParamFilter.CATEGORY,
        tags: allTags.categories,
      },
      ParamFilter.TYPE,
      {
        key: ParamFilter.REVIEW,
        render: () =>
          ParamReviews.map((e) => ({
            ...e,
            name: (
              <div className="flex gap-2 w-full items-center justify-between">
                {Array.from({ length: 5 }).map((_, index) => {
                  const fill = +e.value <= index ? 'gray-500' : 'yellow-500';
                  return <Icons.star key={index} className={`fill-${fill} stroke-yellow-500`} />;
                })}
                <p className="w-20">{e.name}</p>
              </div>
            ),
          })),
      },
    ],
    t,
    searchParams,
  );

  const filters = accept ? array.filter((e) => accept.includes(e.key)) : array;

  return (
    <div className={cn('flex gap-3 flex-col pb-6 p-4 max-h-[90vh] overflow-x-hidden', className)}>
      {filters.map((e, index: number) => (
        <Fragment key={index}>
          <p className="font-bold">{e.name}</p>
          <div className="flex flex-wrap gap-2">
            {e.items.map((filter, index2: number) => (
              <div
                key={index2}
                onClick={() => onChangefilter(e.key, filter.value)}
                className={cn(
                  'rounded-full text-nowrap px-3 py-0.5 text-sm cursor-pointer border border-secondary hover:border-current-2 hover:text-current-2',
                  filter.active ? 'bg-current-2 text-white hover:text-white' : 'bg-secondary',
                  e.key === ParamFilter.REVIEW && 'w-full',
                )}
              >
                {filter.name}
              </div>
            ))}
          </div>
        </Fragment>
      ))}
    </div>
  );
};
