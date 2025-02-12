import { OrderState } from "@/lib/types";
import ActiveCard from "./active-card";
import CompletedCard from "./completed-card";
import CancelledCard from "./cancelled-card";
import PendingCard from "./pending-card";

type ComponentOrderStates =
  | OrderState.NEW
  | OrderState.BOOKED
  | OrderState.ACCEPTED
  | OrderState.CANCELLED
  | OrderState.DECLINED
  | OrderState.COMPLETED;

const ORDER_CARDS: {
  [key in ComponentOrderStates]: React.ComponentType;
} = {
  [OrderState.NEW]: PendingCard,
  [OrderState.BOOKED]: ActiveCard,
  [OrderState.ACCEPTED]: ActiveCard,
  [OrderState.COMPLETED]: CompletedCard,
  [OrderState.CANCELLED]: CancelledCard,
  [OrderState.DECLINED]: CancelledCard,
};

export const getOrderCards = (
  type: OrderState | string
): React.ComponentType | null => {
  return ORDER_CARDS[type as ComponentOrderStates] || null;
};
