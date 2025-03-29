'use client';
import { RestaurantListCard } from '@/components/shared';
import { Badge } from '@/components/ui';
import { Order, OrderState } from '@/lib/types';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';

export interface OrderBaseCardProps {
  order: Order;
  onClick: () => void;
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

const BaseCard: React.FC<OrderBaseCardProps> = ({ order, border, onClick }) => {
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
        <RestaurantListCard
          onClick={onClick}
          place={{
            id: order.channelId,
            name: order.branch.name,
            type: order.branch.type,
            logo: order.branch.logo,
            branch: order.branch.id,
            image: order.branch.logo,
            tags: order.branch.tags?.map((tag) => tag.name),
            services: order.branch.services,
            star: order.branch.star ?? '0',
            totalReviews: order.branch.totalReviews ?? 0,
            distance: undefined as any,
            open: true,
            description: order.branch.description,
            tableInfo: undefined as any,
            latitude: order.branch.latitude,
            longitude: order.branch.longitude,
            address: order.branch.address,
            rate: order.branch.rate ?? '0',
          }}
        />
      </div>
    </div>
  );
};

export default BaseCard;
