'use client';
import { Accordion, AccordionContent, AccordionItem } from '@/components/ui/accordion';
import { Order, Participant } from '@/lib/types';
import { useState } from 'react';

interface Props {
  participant?: Participant;
  order?: Order;
}

export const OrderInfo: React.FC<Props> = ({ order, participant }) => {
  const [visible, setVisible] = useState<string>();

  if (!order || !participant) return <></>;

  return (
    <Accordion
      value={visible}
      type="single"
      collapsible
      className="absolute z-50 top-14 left-0 w-full bg-background rounded-b-lg p-2 pt-1 shadow-md"
      onClick={() => setVisible(!visible ? '1' : undefined)}
    >
      <AccordionItem
        value="1"
        className="cursor-pointer flex flex-col items-center border-0 w-full"
      >
        <span className="text-sm text-gray-500 dark:text-gray-300 mb-1">Төлөх дүн</span>
        <span>{order.debtAmount.toLocaleString()} MNT</span>
        <AccordionContent className="p-2 max-w-md w-full">
          <DescItem title="Дэд дүн" value={order.totalAmount} />
          <DescItem
            title="Татвар"
            value={order.totalAmount}
            children={order.charges?.map((charge) => ({
              title: charge.name,
              value: charge.amount,
            }))}
          />
          <DescItem
            title="Хөнгөлөлт"
            value={order.discountAmount}
            children={order.discounts?.map((discount) => ({
              title: discount.name ?? '',
              value: discount.amount ?? '',
            }))}
          />
          <DescItem title="Нийт дүн" value={order.grandTotal} />
          <DescItem title="Төлсөн дүн" value={order.paidAmount} />
          <DescItem title="Төлөх дүн" value={order.debtAmount} />
        </AccordionContent>
        <div className="mx-auto h-1.5 w-[50px] rounded-full bg-gray-300 mt-1" />
      </AccordionItem>
    </Accordion>
  );
};

type ItemType = { value: string | number; title: string };

const DescItem: React.FC<ItemType & { children?: ItemType[] }> = ({ title, value, children }) => {
  return (
    <div className="w-full flex flex-col gap-1">
      <div className="flex justify-between w-full">
        <div className="text-sm text-gray-500 dark:text-gray-300">{title}:</div>
        <div className="text-sm text-gray-500 dark:text-gray-300">{value} MNT</div>
      </div>
      <div className="flex flex-col gap-1 pl-4">
        {children?.map((child) => (
          <div className="flex justify-between w-full">
            <div className="text-sm text-gray-500 dark:text-gray-300">{child.title}:</div>
            <div className="text-sm text-gray-500 dark:text-gray-300">{child.value} MNT</div>
          </div>
        ))}
      </div>
    </div>
  );
};
