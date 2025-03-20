import { Skeleton } from '@/components/ui';

export function FiltersSkeleton() {
  return (
    <div className="w-full flex gap-3 overflow-x-auto no-scrollbar mt-5 items-center mb-3">
      <Skeleton className="h-11 w-10 min-w-10" />
      {Array.from({ length: 3 }).map((_, index) => (
        <Skeleton className="h-11 w-40 min-w-40 rounded-full" key={index} />
      ))}
      {Array.from({ length: 10 }).map((_, index) => (
        <Skeleton className="h-11 w-28 min-w-28 rounded-full" key={index} />
      ))}
    </div>
  );
}
