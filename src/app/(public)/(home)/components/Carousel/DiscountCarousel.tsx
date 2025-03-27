import { DiscountType, EsDiscount, ParamFilter } from '@/lib/types';
import { CarouselHeader } from './Header';
import { DiscountCarousel } from '@/components/shared';
import { PAGE_DISCOUNT } from '@/lib/constant';

interface Props {
  name: string;
  type: DiscountType;
  path?: string;
  discounts: EsDiscount[];
}

export const DiscountsCarousel: React.FC<Props> = ({ discounts, name, type }) => {
  if (discounts.length === 0) return null;

  return (
    <>
      <CarouselHeader name={name} path={`${PAGE_DISCOUNT}?${ParamFilter.DISCOUNT}=${type}`} />
      <DiscountCarousel discounts={discounts} />
    </>
  );
};
