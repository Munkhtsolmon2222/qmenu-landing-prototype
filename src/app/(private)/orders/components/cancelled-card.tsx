import { Order } from '@/lib/types';
import BaseCard from './base-card';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/general';

interface Props {
  order: Order;
}
function CancelledCard(props: Props) {
  const { order } = props;

  return (
    <Card className="px-3 py-2">
      <BaseCard order={order} />
      <div className="w-full flex justify-between gap-2 py-1">
        <Button
          size="sm"
          className="rounded-full w-full bg-current-2 whitespace-nowrap text-white dark:text-primary"
        >
          Дахин захиалах
        </Button>
      </div>
    </Card>
  );
}

export default CancelledCard;
