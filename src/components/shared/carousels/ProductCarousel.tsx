import { RCarousel, RCarouselContent, RCarouselItem } from '@/components/general';
import { EsProduct } from '@/lib/types';
import { CarouselProductCard } from '../cards';

interface Props {
  products: EsProduct[];
}

export const ProductCarousel: React.FC<Props> = ({ products }) => {
  if (!products.length) return null;

  return (
    <RCarousel scrollWidth={300}>
      <RCarouselContent className="gap-3 pt-1 pb-5">
        {products.map((product, index) => (
          <RCarouselItem key={index}>
            <CarouselProductCard index={index} product={product} />
          </RCarouselItem>
        ))}
      </RCarouselContent>
    </RCarousel>
  );
};
