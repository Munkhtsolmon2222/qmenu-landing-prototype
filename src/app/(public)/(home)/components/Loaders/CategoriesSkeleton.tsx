import { Skeleton } from '@/components/ui';

interface Props {
  count: number;
}

export const CategoriesSkeleton: React.FC<Props> = ({ count }) => {
  return (
    <div className="gap-3 overflow-y-auto no-scrollbar w-full px-2 flex flex-row mb-2">
      {Array.from({ length: count }).map((_, index) => (
        <div className="p-1 z-50 text-sm md:text-base" key={index}>
          <div className="rounded-lg flex items-center justify-center">
            <Skeleton className="w-10 h-10 rounded-lg" />
          </div>
          <Skeleton className="h-4 w-20 mt-1 mx-auto" />
        </div>
      ))}
    </div>
  );
};
