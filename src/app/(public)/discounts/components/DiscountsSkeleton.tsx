import { DiscountCardSkeleton } from '@/components/shared';

interface Props {}

export const DiscountSkeleton: React.FC<Props> = ({}) => {
  return (
    <>
      <div className="mb-10" />
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 w-full mt-1">
        <DiscountCardSkeleton className="sm:max-w-full" />
        <DiscountCardSkeleton className="sm:max-w-full" />
        <DiscountCardSkeleton className="sm:max-w-full" />
        <DiscountCardSkeleton className="sm:max-w-full" />
        <DiscountCardSkeleton className="sm:max-w-full" />
        <DiscountCardSkeleton className="sm:max-w-full" />
        <DiscountCardSkeleton className="sm:max-w-full" />
        <DiscountCardSkeleton className="sm:max-w-full" />
      </section>
    </>
  );
};
