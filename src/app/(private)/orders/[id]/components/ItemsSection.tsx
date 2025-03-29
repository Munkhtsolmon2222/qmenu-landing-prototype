'use client';
import {
  Badge,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui';
import { Order, OrderItemState, OrderType } from '@/lib/types';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface Props {
  order: Order;
}

export const ItemsSection: React.FC<Props> = ({ order }) => {
  const { t } = useTranslation();

  let tabs = [
    { name: 'All', value: 'all' },
    {
      name: `OrderTypeItemStates.${order.type}.${OrderItemState.DRAFT}`,
      value: OrderItemState.DRAFT,
    },
    {
      name: `OrderTypeItemStates.${order.type}.${OrderItemState.NEW}`,
      value: OrderItemState.NEW,
    },
    {
      name: `OrderTypeItemStates.${order.type}.${OrderItemState.ACCEPTED}`,
      value: OrderItemState.ACCEPTED,
    },
    {
      name: `OrderTypeItemStates.${order.type}.${OrderItemState.PREPARING}`,
      value: OrderItemState.PREPARING,
    },
    {
      name: `OrderTypeItemStates.${order.type}.${OrderItemState.PREPARED}`,
      value: OrderItemState.PREPARED,
    },
    {
      name: `OrderTypeItemStates.${order.type}.${OrderItemState.DELIVERING}`,
      value: OrderItemState.DELIVERING,
    },
    {
      name: `OrderTypeItemStates.${order.type}.${OrderItemState.DELIVERED}`,
      value: OrderItemState.DELIVERED,
    },
    {
      name: `OrderTypeItemStates.${order.type}.${OrderItemState.COMPLETED}`,
      value: OrderItemState.COMPLETED,
    },
    {
      name: `OrderTypeItemStates.${order.type}.${OrderItemState.CANCELLED}`,
      value: OrderItemState.CANCELLED,
    },
    {
      name: `OrderTypeItemStates.${order.type}.${OrderItemState.RETURN}`,
      value: OrderItemState.RETURN,
    },
    {
      name: `OrderTypeItemStates.${order.type}.${OrderItemState.MOVED}`,
      value: OrderItemState.MOVED,
    },
    {
      name: `OrderTypeItemStates.${order.type}.${OrderItemState.MERGED}`,
      value: OrderItemState.MERGED,
    },
    {
      name: `OrderTypeItemStates.${order.type}.${OrderItemState.REMOVED}`,
      value: OrderItemState.REMOVED,
    },
    {
      name: `OrderTypeItemStates.${order.type}.${OrderItemState.TRANSFERED}`,
      value: OrderItemState.TRANSFERED,
    },
  ];

  if (![OrderType.Delivery, OrderType.TakeAway].includes(order.type)) {
    tabs = tabs.filter(
      (e) =>
        ![OrderItemState.DELIVERING, OrderItemState.DELIVERED].includes(e.value as OrderItemState),
    );
  }

  const [selected, setSelected] = useState(tabs[0].value);

  return (
    <div className="mt-2 sm:col-span-2">
      <div className="text-center w-full font-medium my-2">{t('Product')}</div>
      <Tabs value={selected} className="relative mr-auto h-full w-full">
        <div className="border-b w-full overflow-x-auto no-scrollbar bg-background px-3">
          <TabsList
            className="w-full bg-transparent justify-center h-13 rounded-none p-0 max-w-max"
            style={{ minWidth: 100 * tabs.length }}
          >
            {tabs.map((e, index) => {
              const active = selected === e.value;
              return (
                <TabsTrigger
                  key={index}
                  onClick={() => setSelected(e.value)}
                  value={e.value}
                  className="relative rounded-none border-b border-b-transparent bg-transparent w-full font-semibold text-muted-foreground transition-none focus-visible:ring-0 !shadow-none cursor-pointer group"
                >
                  <p
                    className={`font-medium group-hover:text-current-2 ${
                      active && 'text-current-2'
                    }`}
                  >
                    {t(e.name)}
                  </p>
                  {active && (
                    <div className="bg-current-2 rounded-t-md h-1.5 w-full absolute -bottom-[12px] sm:-bottom-[12px]" />
                  )}
                </TabsTrigger>
              );
            })}
          </TabsList>
        </div>

        {tabs.map((e, index) => {
          const items = order.items.filter((item) => e.value === 'all' || item.state === e.value);
          return (
            <TabsContent key={index} value={e.value} className="w-full h-full min-h-[200px]">
              <Table>
                {items.length < 1 && <TableCaption>{t('Product')}</TableCaption>}
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">{t('Product Name')}</TableHead>
                    <TableHead className="text-center">{t('State')}</TableHead>
                    <TableHead className="text-center">{t('Quantity')}</TableHead>
                    <TableHead className="text-right">{t('Amount')}</TableHead>
                    <TableHead className="text-right">{t('TotalAmount')}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {items.map((item, index) => {
                    let total = item.quantity * item.price;

                    const optionsTotal = item.options?.reduce((acc, option) => {
                      return acc + option.price;
                    }, 0);

                    if (optionsTotal) total += optionsTotal;

                    return (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{item.name}</TableCell>
                        <TableCell className="text-center">
                          <Badge className="bg-primary-foreground text-primary">
                            {t(`OrderTypeItemStates.${order.type}.${item.state}`)}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center">{item.quantity}</TableCell>
                        <TableCell className="text-right">{item.price.toLocaleString()}₮</TableCell>
                        <TableCell className="text-right">{total.toLocaleString()}₮</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
};
