'use client';
import { useSearchParams } from 'next/navigation';
import { Button, Icons } from '../general';
import { PAGE_HOME, ParamFilters } from '@/lib/constant';
import { cn, redirectWithNProgress } from '@/lib/utils';
import { getSearchParams, updateParams } from '@/lib/helpers';
import { ParamFilter } from '@/lib/types';
import { useTranslation } from 'react-i18next';

interface Props {
  backPath?: string;
  className?: string;
  clearButtonClassName?: string;
}

export const FilterControl: React.FC<Props> = ({ className, backPath, clearButtonClassName }) => {
  const searchParams = useSearchParams();
  const { t } = useTranslation();

  const path = backPath || PAGE_HOME;

  const filters = Object.entries(getSearchParams(searchParams)).flatMap(([key, value]) =>
    value.map((v) => ({ key, value: v })).flat(),
  );

  const handleRemoveFilter = (key: ParamFilter, value: string) => {
    const params = updateParams(searchParams, key, value);
    redirectWithNProgress(`${path}?${params.toString()}`);
  };

  const handleClear = () => {
    redirectWithNProgress(path);
  };

  const getValue = (key: ParamFilter, value: string) => {
    const filter = ParamFilters.find((f) => f.key === key);
    if (!filter) return value;
    const item = filter.items?.find((i) => i.value === value);

    if (item?.name && filter.valueTranslate) {
      return filter.valueTranslate(item.name as string, t);
    }

    return value;
  };

  if (filters.length === 0) return null;
  return (
    <div className={cn('mb-3 flex gap-2 overflow-x-auto pr-2 no-scrollbar', className)}>
      {filters.map(({ key, value }, index) => (
        <Button
          key={index}
          className="p-1 px-3 rounded-full h-max bg-current-2 flex justify-center items-center gap-1 hover:bg-current-3 min-w-max dark:text-primary"
          onClick={() => handleRemoveFilter(key as ParamFilter, value)}
        >
          <div>{getValue(key as ParamFilter, value)}</div>
          <Icons.x className="w-3 h-3" />
        </Button>
      ))}
      <div
        className={cn('flex items-center justify-end', clearButtonClassName)}
        onClick={handleClear}
      >
        <Icons.filterX className="h-6 w-6 text-current-2 cursor-pointer" />
      </div>
    </div>
  );
};
