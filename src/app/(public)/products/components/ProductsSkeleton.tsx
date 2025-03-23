import { ProductCardSkeleton } from '@/components/shared';

interface Props {}

export const ProductsSkeleton: React.FC<Props> = ({}) => {
  return (
    <>
      <div className="mb-10" />
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 w-full mt-1">
        <ProductCardSkeleton className="sm:max-w-full" />
        <ProductCardSkeleton className="sm:max-w-full" />
        <ProductCardSkeleton className="sm:max-w-full" />
        <ProductCardSkeleton className="sm:max-w-full" />
        <ProductCardSkeleton className="sm:max-w-full" />
        <ProductCardSkeleton className="sm:max-w-full" />
        <ProductCardSkeleton className="sm:max-w-full" />
        <ProductCardSkeleton className="sm:max-w-full" />
      </section>
    </>
  );
};
