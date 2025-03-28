import { Order } from '@/lib/types';
import React from 'react';
import BaseCard, { OrderBaseCardProps } from './base-card';
import { Card, Switch } from '@/components/ui';
import { Button } from '@/components/general';
import moment from 'moment';
import { DATE_TIME_FORMAT } from '@/lib/constant';

interface Props extends OrderBaseCardProps {}

const ActiveCard: React.FC<Props> = ({ order, onClick }) => {
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
};

export default ActiveCard;
