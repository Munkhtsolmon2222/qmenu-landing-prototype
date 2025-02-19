"use client";
import { useQuery } from "@apollo/client";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs-1";
import { GET_CUSTOMER_ORDERS } from "@/graphql/query";
import Loader from "@/components/shared/loader";
import { useState, Suspense } from "react";
import { Order, OrderState } from "@/lib/types";
import { getOrderCards } from "./components/cards";
import { useSearchParams } from "next/navigation";
import { useTranslation } from "react-i18next";

function OrdersContent() {
  const searchParams = useSearchParams();
  const { t } = useTranslation();
  const tabs = [
    { key: "1", name: t("Waiting"), value: [OrderState.NEW] },
    {
      key: "2",
      name: t("Active"),
      value: [OrderState.ACCEPTED, OrderState.BOOKED],
    },
    { key: "3", name: t("Done"), value: [OrderState.COMPLETED] },
    { key: "4", name: t("Cancelled"), value: [OrderState.CANCELLED] },
  ];

  const [selected, setSelected] = useState(
    searchParams.get("key") ?? tabs[1].key
  );

  const { data, loading } = useQuery<{ getCustomerOrders: Order[] }>(
    GET_CUSTOMER_ORDERS
  );

  if (loading) return <Loader />;

  const orders = data?.getCustomerOrders?.filter((e) =>
    (tabs.find((e) => e.key === selected)?.value ?? []).includes(e.state)
  );

  return (
    <div className="pt-14  md:pt-20 border-none m-0 w-full ">
      <Tabs value={selected} className="relative mr-auto h-full w-full">
        <div className="px-4 border-b sticky top-0 bg-background z-50 overflow-x-auto no-scrollbar">
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
                  className="relative rounded-none border-b border-b-transparent text-base sm:text-lg bg-transparent w-full font-semibold text-muted-foreground transition-none focus-visible:ring-0 !shadow-none"
                >
                  <p
                    className={`${active ? "text-current-2" : ""} font-medium`}
                  >
                    {e.name}
                  </p>
                  {active && (
                    <div className="bg-current-2 rounded-t-md h-1.5 w-full absolute -bottom-[16px] sm:-bottom-[14px]" />
                  )}
                </TabsTrigger>
              );
            })}
          </TabsList>
        </div>
        <div className="px-5 py-4 flex flex-col gap-4 md:grid md:grid-cols-3">
          {orders?.map((item: Order, index: number) => {
            const OrderCard = getOrderCards(item.state);
            return OrderCard ? <OrderCard key={index} /> : null;
          })}
        </div>
      </Tabs>
    </div>
  );
}

export default function Orders() {
  return (
    <Suspense fallback={<Loader />}>
      <OrdersContent />
    </Suspense>
  );
}
