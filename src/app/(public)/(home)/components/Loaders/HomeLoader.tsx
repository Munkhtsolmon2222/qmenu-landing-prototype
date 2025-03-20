import { BranchCardSkeleton } from '@/components/shared';
import { Skeleton } from '@/components/ui';

interface Props {
  count?: number;
}

function CarouseltSkeleton() {
  return (
    <div className="flex flex-col mt-3.5 mb-5">
      <div className="flex justify-between w-full">
        <Skeleton className="h-6 w-40" />
        <Skeleton className="h-6 w-10" />
      </div>
      <div className="flex overflow-x-auto no-scrollbar gap-3 z-0 mt-3">
        {Array(7)
          .fill(null)
          .map((_, index) => (
            <BranchCardSkeleton key={index} className="min-w-72" />
          ))}
      </div>
    </div>
  );
}

function BannerSkeleton() {
  return (
    <div className="flex gap-4 px-3 sm:px-6 md:py-6 overflow-x-auto no-scrollbar mb-5">
      <Skeleton className="rounded-xl w-full h-[12rem] sm:w-[28rem] sm:h-[14rem] min-w-[300px]" />
      <Skeleton className="hidden sm:block rounded-xl w-full h-[12rem] sm:w-[28rem] sm:h-[14rem] min-w-[300px]" />
      <Skeleton className="hidden sm:block rounded-xl w-full h-[12rem] sm:w-[28rem] sm:h-[14rem] min-w-[300px]" />
    </div>
  );
}

export const HomeLoader: React.FC<Props> = ({ count = 3 }) => {
  return (
    <div className="flex flex-col">
      <CarouseltSkeleton />
      <BannerSkeleton />

      {Array.from({ length: count }).map((_, index) => (
        <CarouseltSkeleton key={index} />
      ))}
    </div>
  );
};
