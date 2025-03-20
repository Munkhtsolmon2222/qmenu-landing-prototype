'use client';
import { GET_CUSTOMER_ORDERS } from '@/actions';
import { Loader } from '@/components/shared';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui';
import { useAction } from '@/lib/hooks';
import { OrderState, Payload } from '@/lib/types';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavbar } from '@/lib/providers';
import { cn } from '@/lib/utils';
import { useSubscription } from '@apollo/client';
import { ON_UPDATED_ORDER } from '@/graphql/subscription';
import { getOrderCards } from './cards';

interface Props {
  payload: Payload;
}

export const CustomerOrders: React.FC<Props> = ({ payload }) => {
  const searchParams = useSearchParams();
  const { t } = useTranslation();
  const { show } = useNavbar();

  const tabs = [
    { key: '1', name: t('OrdersTab.Waiting'), value: [OrderState.NEW] },
    {
      key: '2',
      name: t('OrdersTab.Active'),
      value: [
        OrderState.BOOKED,
        OrderState.ACCEPTED,
        OrderState.PREPARING,
        OrderState.PREPARED,
        OrderState.DELIVERING,
        OrderState.DELIVERED,
      ],
    },
    { key: '3', name: t('OrdersTab.Completed'), value: [OrderState.COMPLETED] },
    {
      key: '4',
      name: t('OrdersTab.Cancelled'),
      value: [OrderState.CANCELLED, OrderState.DECLINED, OrderState.NOSHOW],
    },
  ];

  const [selected, setSelected] = useState(searchParams.get('key') ?? tabs[1].key);

  const { data = [], loading, setData } = useAction(GET_CUSTOMER_ORDERS);

  const orders = data.filter((e: any) =>
    (tabs.find((e) => e.key === selected)?.value ?? []).includes(e.state),
  );

  useSubscription(ON_UPDATED_ORDER, {
    variables: { customer: payload?.sub },
    skip: !payload?.sub,
    onData({ data: subscriptionData }) {
      if (!data) return;
      const { event, order: subscriptionOrder } = subscriptionData.data.onUpdatedOrder;
      let newData = [...data];

      switch (event) {
        case 'CREATED':
        case 'UPDATED':
          const prev = newData.findIndex((e) => e.id === subscriptionOrder.id);

          if (prev !== -1) {
            newData[prev] = subscriptionOrder;
          } else {
            newData.unshift(subscriptionOrder);
          }
          break;
        case 'DELETED':
          newData = newData.filter((e) => e.id !== subscriptionOrder.id);
          break;
        default:
          return;
      }

      setData(newData);
    },
    onError(error) {
      console.log('Error:', error);
    },
  });

  if (loading) return <Loader className="h-screen" />;

  return (
    <div className="border-none m-0 w-full ">
      <Tabs value={selected} className="relative mr-auto h-full w-full">
        <div
          className={cn(
            'px-4 border-b duration-500 sticky bg-background z-20 overflow-x-auto no-scrollbar',
            show ? 'top-16 sm:top-20' : 'top-0',
          )}
        >
          <TabsList
            className="w-full justify-center h-16 rounded-none bg-transparent p-0"
            style={{ minWidth: 110 * tabs.length }}
          >
            {tabs.map((e, index) => {
              const active = selected === e.key;
              return (
                <TabsTrigger
                  key={index}
                  onClick={() => setSelected(e.key)}
                  value={e.key}
                  className="relative rounded-none border-b border-b-transparent text-base sm:text-lg bg-transparent w-full font-semibold text-muted-foreground transition-none focus-visible:ring-0 !shadow-none cursor-pointer hover:text-current-2"
                >
                  <p className={`${active ? 'text-current-2' : ''} font-medium`}>{e.name}</p>
                  {active && (
                    <div className="bg-current-2 rounded-t-md h-1.5 w-full absolute -bottom-[16px] sm:-bottom-[14px]" />
                  )}
                </TabsTrigger>
              );
            })}
          </TabsList>
        </div>

        {orders.length < 1 && (
          <div className="h-96 w-full flex items-center justify-center">
            <div className="text-lg opacity-50">{t('EmptyOrders')}</div>
          </div>
        )}

        <div className="px-5 py-4 flex flex-col gap-4 sm:grid sm:grid-cols-2 md:grid-cols-3">
          {orders.map((item, index: number) => {
            const OrderCard = getOrderCards(item.state);
            return OrderCard ? <OrderCard key={index} order={item} /> : null;
          })}
        </div>
      </Tabs>
    </div>
  );
};
