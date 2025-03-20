'use client';
import { RestaurantListCard } from '@/components/shared';
import { Badge } from '@/components/ui';
import { BranchDetail, Order, OrderState } from '@/lib/types';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';

interface Props {
  order: Order;
  border?: boolean;
}

const classNames: Partial<Record<OrderState, string>> = {
  [OrderState.DRAFT]: '',

  [OrderState.NEW]: '',
  [OrderState.BOOKING]: '',
  [OrderState.BOOKED]: '',

  [OrderState.ACCEPTED]: '',
  [OrderState.PREPARING]: '',
  [OrderState.PREPARED]: '',
  [OrderState.DELIVERING]: '',
  [OrderState.DELIVERED]: '',
  [OrderState.COMPLETED]: 'text-green-600',
  [OrderState.CANCELLED]: 'text-red-600',
  [OrderState.RETURNED]: 'text-red-600',
  [OrderState.MOVED]: 'text-red-600',
  [OrderState.REMOVED]: 'text-red-600',
  [OrderState.MERGED]: 'text-red-600',
  [OrderState.CORRECTION]: 'text-red-600',
  [OrderState.DECLINED]: 'text-red-600',
  [OrderState.NOSHOW]: 'text-red-600',
};

export default function BaseCard({ order, border }: Props) {
  const { t } = useTranslation();

  if (!order) return null;
  return (
    <div
      className={`flex flex-row w-full justify-between items-center ${
        border ? 'border-t py-2.5' : 'pb-2.5'
      } `}
    >
      <div className="flex flex-col w-full gap-2">
        <Badge className={cn('bg-primary-foreground text-primary', classNames[order.state])}>
          {t('OrderState.' + order.state)}
        </Badge>
        <RestaurantListCard place={order.branch as unknown as BranchDetail} />
      </div>
    </div>
  );
}
