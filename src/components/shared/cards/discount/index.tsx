'use client';
import { DiscountType, EsDiscount } from '@/lib/types';
import { Flashdeal } from './flash-deal';
import { Bogo } from './bogo';
import { HotDeal } from './hot-deal';
import nProgress from 'nprogress';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui';
import { PAGE_RESTAURANT } from '@/lib/constant';
import { cn } from '@/lib/utils';

interface Props {
  discount: EsDiscount;
  className?: string;
}

export interface CardProps {
  discount: EsDiscount;
}

const Cards: Partial<Record<DiscountType, React.FC<CardProps>>> = {
  [DiscountType.FLD]: Flashdeal,
  [DiscountType.BOGO]: Bogo,
  [DiscountType.HOT]: HotDeal,
};

export default function DiscountCard({ discount, className }: Props) {
  const router = useRouter();

  const navigate = (path: string) => {
    nProgress.start();
    router.push(path);
  };

  const Discount = Cards[discount.type];
  if (!Discount) return null;

  return (
    <Card
      className={cn(
        'w-full overflow-hidden relative rounded-xl hover:shadow-md cursor-pointer transition-all min-w-72 pb-3 pt-0',
        className,
      )}
      onClick={() => navigate(`${PAGE_RESTAURANT}/${discount.channel.id}`)}
    >
      <Discount discount={discount} />
    </Card>
  );
}
