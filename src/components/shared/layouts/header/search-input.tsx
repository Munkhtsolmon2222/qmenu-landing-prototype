'use client';
import { SEARCH_RESULT } from '@/actions';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  Icons,
  Input,
} from '@/components/general';
import { SearchResult } from '@/components/shared';
import { useAction } from '@/lib/hooks';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDebouncedCallback } from 'use-debounce';

interface Props {
  suffix?: React.ReactElement;
  prefix?: React.ReactElement;
  placeholder?: string;
  context?: boolean;
  className?: string;
  wrapperClassName?: string;
}

export const SearchInput: React.FC<Props> = ({
  suffix,
  prefix,
  placeholder,
  wrapperClassName,
  className,
}) => {
  const [value, setValue] = useState<string>('');
  const { action: search, loading, data, setData } = useAction(SEARCH_RESULT, { lazy: true });
  const { t } = useTranslation();

  const debounced = useDebouncedCallback((value) => {
    if (value) search(value);
    setValue(value);
  }, 500);

  return (
    <div
      className={cn(
        'flex items-center relative w-full md:w-[20rem] xl:w-[24rem]',
        wrapperClassName,
      )}
    >
      <Dialog
        onOpenChange={(e) => {
          if (e) return;
          setData(undefined);
          setValue('');
        }}
      >
        <DialogTrigger className="w-full">
          <Input
            placeholder={placeholder}
            prefix={prefix}
            className={cn(
              'focus:border-none rounded-full focus:ring-0 focus-within:ring-0 focus-within:ring-transparent md:h-10 h-9 w-full bg-background active:border-none outline-none text-gray-400 placeholder-gray-400',
              className,
            )}
            readOnly
            suffix={suffix}
          />
        </DialogTrigger>
        <DialogContent
          overlayClassName="bg-white/60"
          className={cn(
            'h-full p-0 shadow-xl sm:w-[500px] sm:max-w-[500px] md:w-[720px] md:max-w-[720px] sm:translate-y-0 sm:top-10 md:top-20 flex flex-col',
            value ? 'sm:max-h-[600px]' : 'sm:h-max gap-0',
          )}
        >
          <DialogTitle>
            <Input
              prefix={<Icons.search />}
              placeholder={placeholder}
              className="h-12 sm:h-14 text-base sm:text-lg"
              onChange={(e) => debounced(e.target.value)}
            />
          </DialogTitle>

          <div className="h-full overflow-y-auto">
            <SearchResult
              loading={loading}
              data={data}
              value={value}
              text={{
                restaurant: t('branchType.Restaurant'),
                event: t('Event'),
                product: t('Product'),
                total: t('Total'),
              }}
              noResult={`"${value}" ${t('No results found for')}`}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
