'use client';
import { Badge, Card, Separator } from '@/components/ui';
import { DATE_TIME_FORMAT } from '@/lib/constant';
import { Order, OrderType } from '@/lib/types';
import { convertToHoursAndMinutes } from '@/lib/utils';
import moment from 'moment';
import { useTranslation } from 'react-i18next';

interface Props {
  order: Order;
}

export const OrderSection: React.FC<Props> = ({ order }) => {
  const { t, i18n } = useTranslation();

  return (
    <Card className="p-3 h-full flex flex-col gap-3">
      <div className="w-full text-center font-medium">{t('IOrder')}</div>
      <Separator />
      <div className="flex justify-between items-center gap-2">
        <div className="text-sm">{t('Order number')}:</div>
        <Badge className="font-bold bg-primary-foreground text-primary">{order.number ?? ''}</Badge>
      </div>
      <div className="flex justify-between items-center gap-2">
        <div className="text-sm">{t('State')}:</div>
        <Badge className="font-bold bg-primary-foreground text-primary">
          {t(`OrderState.${order.state}`)}
        </Badge>
      </div>
      <div className="flex justify-between items-center gap-2">
        <div className="text-sm">{t('Order type')}:</div>
        <Badge className="font-bold bg-primary-foreground text-primary">
          {t(`orderType.${order.type}`)}
        </Badge>
      </div>
      <div className="flex justify-between items-center gap-2">
        <div className="text-sm">{t('Date')}:</div>
        <div className="text-sm font-medium">
          {order.createdAt && moment(new Date(order.createdAt)).format(DATE_TIME_FORMAT)}
        </div>
      </div>
      {[OrderType.TableOrder, OrderType.PreOrder].includes(order.type) && (
        <>
          <div className="flex justify-between items-center gap-2">
            <div className="text-sm">{t('Start time')}:</div>
            <div className="text-sm font-medium">
              {order.startAt && moment(new Date(order.startAt)).format(DATE_TIME_FORMAT)}
            </div>
          </div>
          <div className="flex justify-between items-center gap-2">
            <div className="text-sm">{t('Sitting time')}:</div>
            <div className="text-sm font-medium">
              {convertToHoursAndMinutes(order.duration)[i18n.language] ??
                convertToHoursAndMinutes(order.duration).mn}
            </div>
          </div>
        </>
      )}
    </Card>
  );
};
