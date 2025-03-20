import { Separator, Skeleton } from '@/components/ui';

interface Props {}

export const RestaurantLoader: React.FC<Props> = ({}) => {
  return (
    <div className="w-full max-w-3xl xl:max-w-full xl:px-10 sm:mt-2 mx-auto px-0 sm:px-4 bg-background flex flex-col gap-5">
      <Skeleton className="relative z-0 w-full overflow-x-hidden flex gap-3 h-96 sm:rounded-xl sm:h-64" />

      <div className="relative z-0 w-full sm:min-h-10 min-h-14">
        <div className="absolute -top-14 sm:-top-20 left-8 overflow-hidden flex gap-4 items-end w-[calc(100%_-_25px)] pr-2">
          <Skeleton className="w-28 min-w-28 h-28 z-50 rounded-2xl border-border border shadow" />
          <Skeleton className="w-34 h-8 mb-2" />
          <div className="hidden xl:flex ml-auto gap-3">
            <Skeleton className="w-44 h-10" />
            <Skeleton className="w-44 h-10" />
          </div>
        </div>
      </div>

      <div className="flex gap-3 w-full md:h-[256px]">
        <div className="flex flex-col gap-3 px-5 sm:px-2 w-full md:w-[450px]">
          <div className="flex gap-3 items-center">
            <Skeleton className="w-6 h-6 rounded-full" />
            <Skeleton className="w-40 h-6" />
          </div>
          <div className="flex gap-3 items-center">
            <Skeleton className="w-6 h-6 rounded-full" />
            <Skeleton className="w-full h-6" />
          </div>
          <div className="flex gap-3 items-center">
            <Skeleton className="w-6 h-6 rounded-full" />
            <Skeleton className="w-full h-12" />
          </div>

          <Skeleton className="hidden sm:block h-14 w-full mt-auto" />
        </div>
        <Skeleton className="hidden sm:block w-full h-full" />
      </div>

      <div className="flex justify-between gap-2 px-3 sm:px-0">
        <Skeleton className="w-full h-10" />
        <Skeleton className="w-full h-10" />
        <Skeleton className="w-full h-10" />
      </div>
      <Separator />

      <Skeleton className="w-full max-w-40 h-10 mx-3 sm:px-0" />
      <Skeleton className="w-full max-w-56 h-10 mx-3 sm:px-0" />
    </div>
  );
};
