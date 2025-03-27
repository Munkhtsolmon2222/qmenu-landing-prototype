import { Skeleton } from '@/components/ui';
import { cn } from '@/lib/utils';

interface Props {
  className?: string;
}

export const ProductCardSkeleton: React.FC<Props> = ({ className }) => {
  return (
    <div
      className={cn('rounded-2xl border overflow-clip min-w-80 sm:min-w-72 sm:max-w-72', className)}
    >
      <div className="relative">
        <Skeleton className="w-full h-[16vh]" />
        <Skeleton className="absolute top-0 right-0 m-2 w-8 h-8 rounded-full" />
      </div>
      <div className="px-2 py-2 md:gap-2.5 gap-1.5 flex flex-col justify-between bg-background">
        <div className="flex items-center justify-between w-full">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-6 w-1/6" />
        </div>
        <div className="pt-0.5 w-full flex items-center gap-2">
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="w-[4px] h-[4px] rounded-full" />
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="w-[4px] h-[4px] rounded-full" />
          <Skeleton className="h-4 w-1/4" />
        </div>
        <div className="flex items-center gap-1 max-w-80">
          <Skeleton className="h-5 w-5" />
          <Skeleton className="h-5 w-3/4" />
        </div>
      </div>
    </div>
  );
};
