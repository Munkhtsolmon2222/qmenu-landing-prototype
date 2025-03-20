'use client';
import { Order } from '@/lib/types';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { useTranslation } from 'react-i18next';
import BaseCard from './base-card';
import { Button } from '@/components/general';

interface Props {
  order: Order;
}

const PendingCard: React.FC<Props> = ({ order }) => {
  const { t } = useTranslation();

  function formatDate(isoString: string): string {
    // Convert the ISO string to a Date object
    const date = new Date(isoString);

    // Define the options for formatting the date and time
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    };

    // Format the date using Intl.DateTimeFormat
    return new Intl.DateTimeFormat('en-US', options).format(date);
  }
  return (
    <Card className="px-3 py-2">
      <div className="w-full flex justify-between pb-2">
        <p className="font-medium ">{formatDate(order.date)}</p>
        <span className="flex gap-2">
          <p className="text-sm font-normal opacity-80">{t('Reminder')}</p>
          <Switch className="bg-current-2" />
        </span>
      </div>
      <BaseCard order={order} border />
      <div className="w-full flex justify-between gap-8  py-1">
        <Button
          variant="outline"
          size="sm"
          className="rounded-full bg-secondary-background w-full text-current-2"
        >
          {t('Cancell')}
        </Button>
      </div>
    </Card>
  );
};

export default PendingCard;
