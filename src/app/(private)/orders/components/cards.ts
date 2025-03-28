import { OrderState } from '@/lib/types';
import ActiveCard from './active-card';
import CompletedCard from './completed-card';
import CancelledCard from './cancelled-card';
import PendingCard from './pending-card';

type ComponentOrderStates =
  | OrderState.NEW
  | OrderState.BOOKED
  | OrderState.BOOKING
  | OrderState.ACCEPTED
  | OrderState.CANCELLED
  | OrderState.DECLINED
  | OrderState.COMPLETED;

const ORDER_CARDS: {
  [key in ComponentOrderStates]: React.ComponentType<any>;
} = {
  [OrderState.NEW]: PendingCard,
  [OrderState.BOOKING]: PendingCard,
  [OrderState.BOOKED]: ActiveCard,
  [OrderState.ACCEPTED]: ActiveCard,
  [OrderState.COMPLETED]: CompletedCard,
  [OrderState.CANCELLED]: CancelledCard,
  [OrderState.DECLINED]: CancelledCard,
};

export const getOrderCards = (type: OrderState | string): React.ComponentType<any> | null => {
  return ORDER_CARDS[type as ComponentOrderStates] || null;
};
