'use client';
import BaseCard, { OrderBaseCardProps } from './base-card';
import { Card, Switch } from '@/components/ui';
import { Button } from '@/components/general';
import moment from 'moment';
import { DATE_TIME_FORMAT } from '@/lib/constant';
import { useTranslation } from 'react-i18next';
import { ConfirmCancelOrder } from './ConfirmCancelOrder';
import { CANCEL_ORDER } from '@/actions';
import { useAction } from '@/lib/hooks';
import { showToast } from '@/lib/helpers';

interface Props extends OrderBaseCardProps {}

const ActiveCard: React.FC<Props> = ({ order, onClick }) => {
  const { t } = useTranslation();

  const { action: cancelOrder, loading: canceling } = useAction(CANCEL_ORDER, { lazy: true });

  const handleCancel = (reason?: string) => {
    cancelOrder(order.id, reason, { onError: (e) => showToast(e.message) });
  };

  return (
    <Card className="px-3 py-2">
      <div className="w-full flex justify-between">
        <p className="font-medium ">
          {order.startAt && moment(new Date(order.startAt)).format(DATE_TIME_FORMAT)}
        </p>
        <span className="flex gap-2">
          <p className="text-sm font-normal opacity-80">Сануулах</p>
          <Switch className="bg-current-2" />
        </span>
      </div>
      <BaseCard order={order} border onClick={onClick} />
      <div className="w-full flex justify-between gap-2 pb-1">
        <ConfirmCancelOrder
          onCancel={handleCancel}
          order={order}
          loading={canceling}
          variant="outline"
          size="sm"
          className="rounded-full bg-secondary-background w-full text-current-2"
        />
        <Button
          size="sm"
          className="rounded-full bg-current-2 w-full whitespace-nowrap text-white dark:text-primary"
        >
          {t('Map')}
        </Button>
      </div>
    </Card>
  );
};

export default ActiveCard;
