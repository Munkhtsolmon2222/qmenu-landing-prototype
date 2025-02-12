"use client";
import PickUp from "@/assets/images/types/pick-up";
import TableOrder from "@/assets/images/types/tableorder";
import { Icons } from "@/components/shared/icons";
import { ToastAction } from "@/components/ui/toast";
import { toast } from "@/components/ui/use-toast";
import {
  PAGE_ORDER,
  PAGE_ORDER_BASKET,
  PAGE_ORDER_USER,
  PAGE_RESTAURANT,
  PAGE_TABLE_ORDER,
  PAGE_TAKE_AWAY,
} from "@/lib/config/page";
import { getPayload } from "@/lib/providers/auth";
import { useRestaurantStore } from "@/lib/providers/restaurant";
import { OrderInput, OrderType } from "@/lib/types";
import OrderDialog from "@/components/modal/OrderDialog/page";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
interface ItemType {
  value: OrderType;
  name: string;
  active: boolean;
  icon: React.ReactNode;
  path: string;
  required?: string;
}

const OrderTypes = (id: string): ItemType[] => [
  {
    value: OrderType.PreOrder,
    name: "Ширээнд суух",
    active: true,
    icon: <TableOrder />,
    required: "Та бүтээгдэхүүн сонгоно уу",
    path: `${PAGE_RESTAURANT}/${id}/${PAGE_ORDER}/${PAGE_TABLE_ORDER}`,
  },
  {
    value: OrderType.TakeAway,
    name: "Авч явах",
    active: true,
    icon: <PickUp />,
    required: "Та бүтээгдэхүүн сонгоно уу",
    path: `${PAGE_RESTAURANT}/${id}/${PAGE_ORDER}/${PAGE_TAKE_AWAY}`,
  },
];

const Type = () => {
  const { items, totalPrice, current, setInput, input, setStore } =
    useRestaurantStore();
  const [typeItem, setTypeItem] = useState<ItemType | undefined>(
    OrderTypes(current?.id ?? "").find((e) => e.value === input?.type)
  );
  const router = useRouter();

  const onFinish = () => {
    if (!typeItem) return;
    let path = typeItem.path;

    if (getPayload()?.role !== "customer")
      path = `${PAGE_RESTAURANT}/${current?.id}/${PAGE_ORDER}/${PAGE_ORDER_USER}`;

    router.push(path);
  };

  const onSelect = (item: ItemType) => {
    if (item.active) {
      if (item.required && items.length < 1) {
        toast({
          title: item.name,
          description: item.required,
          action: <ToastAction altText="close">Хаах</ToastAction>,
        });
      } else {
        setInput((e) => ({ ...e, type: item.value }));
        setTypeItem(item);
      }
    }
  };

  useEffect(() => {
    if (items.length < 1 && typeItem?.required) setTypeItem(undefined);
  }, [items, typeItem]);

  useEffect(() => {
    setStore((set) => set({ inputParticipants: [] }));
    setInput(({ type }) => ({ type } as OrderInput));
  }, [setInput, setStore]);

  return (
    <>
      <OrderDialog.Header
        onClick={() =>
          router.push(
            `${PAGE_RESTAURANT}/${current?.id}/${PAGE_ORDER}/${PAGE_ORDER_BASKET}`
          )
        }
      >
        Урьдчилсан захиалга
      </OrderDialog.Header>

      <OrderDialog.Container>
        {OrderTypes(current?.id ?? "")
          .filter((e) => (current?.services ?? []).includes(e.value))
          .map((item, index) => {
            const active = typeItem?.value === item.value;
            return (
              <div
                onClick={() => onSelect(item)}
                key={index}
                className="mb-2 cursor-pointer"
              >
                <div
                  className={`flex items-center justify-between gap-5 border p-3.5 rounded-xl ${
                    active ? "border-current-2" : "border-border"
                  } ${
                    item.active && items.length > 0
                      ? ""
                      : "opacity-65 cursor-no-drop"
                  }`}
                >
                  <div className="flex gap-3">
                    <div className="text-current-2">{item.icon}</div>
                    <span>{item.name}</span>
                  </div>
                  <div
                    className={`w-6 h-6 border-2 rounded-full flex items-center justify-center ${
                      active
                        ? "border-current-2 bg-current-2"
                        : "border-gray-300"
                    }`}
                  >
                    {active && <Icons.check className="w-4 h-4 text-white" />}
                  </div>
                </div>
              </div>
            );
          })}
      </OrderDialog.Container>

      <OrderDialog.Footer
        disabled={!typeItem || items.length < 1}
        onClick={onFinish}
      >
        {items.length > 0 ? (
          <>
            <span className="text-white">Үргэлжлүүлэх</span>
            <span className="text-white">
              {totalPrice.toLocaleString()} MNT
            </span>
          </>
        ) : (
          <span className="text-white mx-auto">Үргэлжлүүлэх</span>
        )}
      </OrderDialog.Footer>
    </>
  );
};

export default Type;
