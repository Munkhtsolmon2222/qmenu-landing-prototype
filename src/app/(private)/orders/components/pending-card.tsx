'use client';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { useTranslation } from 'react-i18next';
import BaseCard, { OrderBaseCardProps } from './base-card';
import moment from 'moment';
import { DATE_TIME_FORMAT } from '@/lib/constant';
import { CANCEL_ORDER } from '@/actions';
import { useAction } from '@/lib/hooks';
import { ConfirmCancelOrder } from './ConfirmCancelOrder';
import { showToast } from '@/lib/helpers';

interface Props extends OrderBaseCardProps {}

const PendingCard: React.FC<Props> = ({ order, onClick }) => {
  const { t } = useTranslation();

  const { action: cancelOrder, loading: canceling } = useAction(CANCEL_ORDER, { lazy: true });

  const handleCancel = (reason?: string) => {
    cancelOrder(order.id, reason, { onError: (e) => showToast(e.message) });
  };

  return (
    <Card className="px-3 py-2">
      <div className="w-full flex justify-between">
        <p className="font-medium">
          {order.startAt && moment(new Date(order.startAt)).format(DATE_TIME_FORMAT)}
        </p>
        <span className="flex gap-2">
          <p className="text-sm font-normal opacity-80">{t('Reminder')}</p>
          <Switch className="bg-current-2" />
        </span>
      </div>
      <BaseCard order={order} border onClick={onClick} />
      <div className="w-full flex justify-between gap-8 pb-1">
        <ConfirmCancelOrder
          onCancel={handleCancel}
          order={order}
          loading={canceling}
          variant="outline"
          size="sm"
          className="rounded-full bg-secondary-background w-full text-current-2"
        />
      </div>
    </Card>
  );
};

export default PendingCard;
