'use client';
import { Badge, Card, Separator } from '@/components/ui';
import { Order } from '@/lib/types';
import { useTranslation } from 'react-i18next';

interface Props {
  order: Order;
}

export const PaymentSection: React.FC<Props> = ({ order }) => {
  const { t } = useTranslation();

  return (
    <Card className="p-3 h-full flex flex-col gap-3">
      <div className="w-full text-center font-medium">{t('Payment')}</div>
      <Separator />
      <div className="flex justify-between items-center gap-2">
        <div className="text-sm">{t('Payment State')}:</div>
        <Badge className="font-bold bg-primary-foreground text-primary">
          {t(`PaymentState.${order.paymentState}`)}
        </Badge>
      </div>
      <div className="flex justify-between items-center gap-2">
        <div className="text-sm">{t('Subtotal')}:</div>
        <div className="text-sm font-medium">{order.totalAmount.toLocaleString()}₮</div>
      </div>
      <div className="flex justify-between items-center gap-2">
        <div className="text-sm">{t('NUAT')}:</div>
        <div className="text-sm font-medium">{order.vatAmount.toLocaleString()}₮</div>
      </div>
      <div className="flex justify-between items-center gap-2">
        <div className="text-sm">{t('NHAT')}:</div>
        <div className="text-sm font-medium">{order.taxAmount.toLocaleString()}₮</div>
      </div>
      <div className="flex justify-between items-center gap-2">
        <div className="text-sm">{t('Discount')}:</div>
        <div className="text-sm font-medium">{order.discountAmount.toLocaleString()}₮</div>
      </div>
      <div className="flex justify-between items-center gap-2">
        <div className="text-sm">{t('TotalAmount')}:</div>
        <div className="text-sm font-medium">{order.grandTotal.toLocaleString()}₮</div>
      </div>
    </Card>
  );
};
