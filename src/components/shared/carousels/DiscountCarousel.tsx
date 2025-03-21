import { RCarousel, RCarouselContent, RCarouselItem } from '@/components/general';
import { EsDiscount } from '@/lib/types';
import DiscountCard from '../cards/discount';

interface Props {
  discounts: EsDiscount[];
}

export const DiscountCarousel: React.FC<Props> = ({ discounts }) => {
  return (
    <RCarousel scrollWidth={300}>
      <RCarouselContent className="gap-3 pt-1 pb-5">
        {discounts.map((discount, index) => (
          <RCarouselItem key={index}>
            <DiscountCard discount={discount} />
          </RCarouselItem>
        ))}
      </RCarouselContent>
    </RCarousel>
  );
};
