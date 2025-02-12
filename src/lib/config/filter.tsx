import { Icons } from "@/components/shared/icons";
import { OrderType } from "../types";

export const homefilters = [
  {
    key: OrderType.TableOrder,
    special: true,
    icon: <Icons.spelcial className="md:w-6 md:h-6 md:pt-[2px] h-5 w-5" />,
    name: "Super Deal",
  },
  {
    key: OrderType.TableOrder,
    name: "Ширээ захиалах",
  },
  {
    key: OrderType.PreOrder,
    name: "Урьдчилан захиалах",
  },
  {
    key: OrderType.TakeAway,
    name: "",
  },
  {
    key: OrderType.Delivery,
    name: "Хүргэлт",
  },
];

export const mapfilters = [
  {
    key: OrderType.TableOrder,
    name: "Ширээ захиалах",
  },
  {
    key: OrderType.PreOrder,
    name: "Урьдчилан захиалах",
  },
  {
    key: OrderType.TakeAway,
    name: "Очиж авах",
  },
  {
    key: OrderType.Delivery,
    name: "Хүргэлт",
  },
];
