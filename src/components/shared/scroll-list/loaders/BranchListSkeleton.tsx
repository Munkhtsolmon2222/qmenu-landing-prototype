import { BranchCardSkeleton } from '../../cards';

interface Props {
  ref?: any;
}

export const BranchListSkeleton: React.FC<Props> = ({}) => {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 w-full mt-1">
      <BranchCardSkeleton />
      <BranchCardSkeleton />
      <BranchCardSkeleton />
      <BranchCardSkeleton />
      <BranchCardSkeleton />
      <BranchCardSkeleton />
      <BranchCardSkeleton />
      <BranchCardSkeleton />
    </section>
  );
};
