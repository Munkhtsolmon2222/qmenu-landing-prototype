'use client';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui';
import { useAction, useMediaQuery } from '@/lib/hooks';
import { Icons } from '@/components/general';
import { useSearchParams } from 'next/navigation';
import { cn, redirectWithNProgress } from '@/lib/utils';
import { FilterContent } from './filter-content';
import { Loader } from '../loader';
import { ParamFilter, TagType } from '@/lib/types';
import { GET_TAGS_BY_TYPE } from '@/actions';

interface Props extends React.PropsWithChildren {
  backPath: string;
  className?: string;
  accept?: ParamFilter[];
}

export const DrawerFilter: React.FC<Props> = ({ backPath, className, accept }) => {
  const { device } = useMediaQuery();
  const searchParams = useSearchParams();

  const { data: cuisineTags = [], loading: l1 } = useAction(GET_TAGS_BY_TYPE, TagType.K);
  const { data: advantageTags = [], loading: l2 } = useAction(GET_TAGS_BY_TYPE, TagType.F);
  const { data: categories = [], loading: l3 } = useAction(GET_TAGS_BY_TYPE, TagType.C);

  const tagsState = { categories, cuisineTags, advantageTags };
  const loading = l1 || l2 || l3;

  return (
    <Drawer direction={device === 'mobile' ? 'bottom' : 'right'}>
      <DrawerTrigger
        className={cn(
          'sticky left-0 z-20 bg-background group p-2 rounded-lg border border-current-2 cursor-pointer duration-200 text-current-2 hover:bg-current-2 hover:text-white',
          searchParams.size > 0 && 'bg-current-2 text-white',
          className,
        )}
      >
        <Icons.filter className="" />
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full min-h-[60vh] h-full flex flex-col justify-between">
          {loading ? (
            <Loader className="h-full" />
          ) : (
            <FilterContent allTags={tagsState} accept={accept} />
          )}

          <div className="self-end w-full flex items-end justify-around rounded-t-lg border-t py-3 ">
            <div
              className="rounded-full text-current-2 cursor-pointer border-current-2 bg-secondary"
              onClick={() => redirectWithNProgress(backPath)}
            >
              <Icons.filterX />
            </div>
            <DrawerTrigger className="rounded-full cursor-pointer">
              <Icons.close />
            </DrawerTrigger>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
