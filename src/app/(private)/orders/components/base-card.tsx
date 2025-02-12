import { Order } from "@/lib/types";
import { RestaurantList } from "@/components/cards/RestaurantListCard";

interface Props {
  order: Order;
  border?: boolean;
}
export default function BaseCard(props: Props) {
  const { order, border } = props;

  return (
    <div
      className={`flex flex-row w-full justify-between items-center ${
        border ? "border-t py-2.5" : "pb-2.5"
      } `}
    >
      <RestaurantList place={order?.branch} />
    </div>
  );
}
