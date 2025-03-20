import { Skeleton } from '@/components/ui';

interface Props {
  ref?: any;
}

export const ResultListSkeleton: React.FC<Props> = ({}) => {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 w-full mt-1">
      <Skeleton className="rounded-2xl border overflow-clip w-full h-56" />
      <Skeleton className="rounded-2xl border overflow-clip w-full h-56" />
      <Skeleton className="rounded-2xl border overflow-clip w-full h-56" />
      <Skeleton className="rounded-2xl border overflow-clip w-full h-56" />
      <Skeleton className="rounded-2xl border overflow-clip w-full h-56" />
      <Skeleton className="rounded-2xl border overflow-clip w-full h-56" />
      <Skeleton className="rounded-2xl border overflow-clip w-full h-56" />
    </section>
  );
};
