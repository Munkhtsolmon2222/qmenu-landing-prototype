import PickUp from "@/assets/images/types/pick-up";
import Dine from "@/assets/images/types/dine";
import Delivery from "@/assets/images/types/delivery";
import { OrderType } from "../types";
import PreOrder from "@/assets/images/types/preorder";

export const branchTypes = [
  {
    icon: <Dine />,
    name: "Ширээ захиалах",
    key: OrderType.TableOrder,
  },
  {
    icon: <Delivery />,
    name: "Урьдчилан захиалах",
  },
  {
    icon: <PickUp />,
    name: "Очиж авах",
  },
  {
    icon: <Delivery />,
    name: "Хүргэлт",
  },
];

export const SEVICES_MAP = new Map([
  [OrderType.Delivery, { icon: <Delivery />, name: "Хүргэлт" }],
  [OrderType.TakeAway, { icon: <PickUp />, name: "Очиж авах" }],
  [OrderType.PreOrder, { icon: <PreOrder />, name: "Урьдчилан захиалах" }],
  [OrderType.TableOrder, { icon: <Dine />, name: "Ширээ захиалах" }],
]);
