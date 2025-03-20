'use client';
import { FilterContent } from '@/components/shared';
import { useMediaQuery } from '@/lib/hooks';
import { ParamFilter, Tag } from '@/lib/types';
import { cn } from '@/lib/utils';
import { useSearchParams } from 'next/navigation';

interface Props {
  tags: {
    categories: Tag[];
    cuisineTags: Tag[];
    advantageTags: Tag[];
  };
  accept: ParamFilter[];
}

export const MapFilterContent: React.FC<Props> = ({ tags, accept }) => {
  const { width } = useMediaQuery();
  const searchParams = useSearchParams();

  if (width <= 768) return <></>;

  return (
    <FilterContent
      accept={accept}
      allTags={tags}
      className={cn(
        searchParams.size > 0 ? 'max-h-[calc(100vh_-_140px)]' : 'max-h-[calc(100vh_-_85px)]',
      )}
    />
  );
};
