import { Order } from '@/lib/types';
import React from 'react';
import BaseCard from './base-card';
import { Card, Switch } from '@/components/ui';
import { Button } from '@/components/general';

interface Props {
  order: Order;
}
function ActiveCard(props: Props) {
  const { order } = props;
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
          <p className="text-sm font-normal opacity-80">Сануулах</p>
          <Switch className="bg-current-2" />
        </span>
      </div>
      <BaseCard order={order} border />
      <div className="w-full flex justify-between gap-2 py-1">
        <Button
          variant="outline"
          size="sm"
          className="rounded-full bg-secondary-background w-full text-current-2"
        >
          Цуцлах
        </Button>
        <Button
          size="sm"
          className="rounded-full bg-current-2 w-full whitespace-nowrap text-white dark:text-primary"
        >
          Газрын зураг
        </Button>
      </div>
    </Card>
  );
}

export default ActiveCard;
