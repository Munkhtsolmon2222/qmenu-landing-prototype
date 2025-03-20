import { BranchCardSkeleton } from '@/components/shared';

interface Props {}

export const ListSkeleton: React.FC<Props> = ({}) => {
  return (
    <>
      <div className="mb-10" />
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 w-full mt-1">
        <BranchCardSkeleton className="sm:max-w-full" />
        <BranchCardSkeleton className="sm:max-w-full" />
        <BranchCardSkeleton className="sm:max-w-full" />
        <BranchCardSkeleton className="sm:max-w-full" />
        <BranchCardSkeleton className="sm:max-w-full" />
        <BranchCardSkeleton className="sm:max-w-full" />
        <BranchCardSkeleton className="sm:max-w-full" />
        <BranchCardSkeleton className="sm:max-w-full" />
      </section>
    </>
  );
};
