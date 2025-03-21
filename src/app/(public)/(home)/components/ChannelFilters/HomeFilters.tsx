'use client';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'next/navigation';
import { useNavbar } from '@/lib/providers';
import { ParamFilter, Tag } from '@/lib/types';
import { PAGE_HOME, ParamReviews, ParamTypes } from '@/lib/constant';
import { cn, redirectWithNProgress } from '@/lib/utils';
import { BranchTypeCard, DrawerFilter } from '@/components/shared';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui';
import './styles.css';
import { selectFilters, updateParams } from '@/lib/helpers';

interface Props {
  tags: Tag[];
  plain?: boolean;
}

export const HomeFilters: React.FC<Props> = ({ plain, tags }) => {
  const searchParams = useSearchParams();
  const { t } = useTranslation();
  const { show } = useNavbar();

  const isActive = (key: ParamFilter) => searchParams.get(key) ?? '';

  const onSelect = async (key: ParamFilter, value: string) => {
    const params = updateParams(searchParams, key, value);

    let url = `${PAGE_HOME}?${params.toString()}`;

    if (params.size < 1) redirectWithNProgress(PAGE_HOME);
    redirectWithNProgress(url);
  };

  const filters = selectFilters(
    [
      {
        key: ParamFilter.REVIEW,
        render: () => ParamReviews.map((price) => ({ ...price, name: `⭐ ${price.name}` })),
      },
      {
        key: ParamFilter.CUISINE,
        tags,
      },
      ParamFilter.SERVICES,
    ],
    t,
    searchParams,
  );

  return (
    <div
      className={cn(
        'w-full overflow-x-scroll no-scrollbar flex gap-3 flex-1 sticky bg-background z-50 mb-2 duration-500 mt-3',
        show ? 'top-16 md:top-20 lg:top-20' : 'top-0 md:top-0 lg:top-0',
      )}
    >
      <div className="py-2 flex flex-row items-center gap-3">
        <DrawerFilter
          backPath={PAGE_HOME}
          accept={[
            ParamFilter.CUISINE,
            ParamFilter.TAG,
            ParamFilter.PRICE,
            ParamFilter.SERVICES,
            ParamFilter.TYPE,
            ParamFilter.CATEGORY,
            ParamFilter.REVIEW,
          ]}
        />

        {filters.map((filter, index) => (
          <div key={index} className="relative">
            <Select
              onValueChange={(value) => onSelect(filter.key, value)}
              value={isActive(filter.key)}
            >
              <SelectTrigger
                className={cn(
                  'w-max min-w-[140px] text-sm py-3 md:py-5 px-4 rounded-full md:text-base font-semibold bg-current-1 data-[placeholder]:text-primary cursor-pointer filter-select',
                  isActive(filter.key) &&
                    'active-select bg-current-2 text-background data-[placeholder]:text-background',
                )}
              >
                <SelectValue placeholder={filter.placeholder} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel
                    className="cursor-pointer hover:bg-current-1 mb-1 rounded-md"
                    onClick={() => onSelect(filter.key, '')}
                  >
                    {t('All')}
                  </SelectLabel>
                  {filter.items.map((option, index: number) => (
                    <SelectItem value={option.value} key={index}>
                      {option.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        ))}
      </div>
      <div className="w-full py-2 flex flex-row gap-3 items-center">
        {ParamTypes.map((type, index) => (
          <div
            key={index}
            className="p-0 cursor-pointer"
            onClick={() => onSelect(ParamFilter.TYPE, type.value)}
          >
            <BranchTypeCard
              name={t(type.name as string)}
              active={isActive(ParamFilter.TYPE) === type.value}
              plain={plain}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
