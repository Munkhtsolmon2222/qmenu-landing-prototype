"use client";
import { useSubscription } from "@apollo/client";
import { createContext, useContext, useMemo, useState } from "react";
import { AuthContext, getPayload } from "./auth";
import { GET_CUSTOMER_ORDERS } from "@/graphql/query";
import { Order, OrderState } from "../types";
import OrderBookedModal from "@/components/modal/OrderBookedModal";
import { ON_UPDATED_ORDER } from "@/graphql/subscription/order";

type OrderContextType = Record<string, unknown>;

export const OrderContext = createContext<OrderContextType>(
  {} as OrderContextType
);

export const OrderProvider = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);
  const [visible, setVisible] = useState<boolean>(false);
  const [order, setOrder] = useState<Order>();

  let customerId: string | undefined;

  const payload = getPayload();

  if (payload && isAuthenticated && payload.role !== "guest") {
    customerId = payload.sub;
  }

  useSubscription(ON_UPDATED_ORDER, {
    variables: { customer: customerId },
    skip: !customerId,
    onData({ client, data }) {
      if (!data) return;
      const caches = client.readQuery<{ getCustomerOrders: Order[] }>({
        query: GET_CUSTOMER_ORDERS,
      });
      if (!caches?.getCustomerOrders) return;

      const { event, order: subscriptionOrder } = data.data.onUpdatedOrder;
      const updatedOrders = caches.getCustomerOrders.map((order) =>
        order.id === subscriptionOrder.id ? subscriptionOrder : order
      );

      if (
        event === "UPDATED" &&
        subscriptionOrder.state === OrderState.BOOKED
      ) {
        setOrder(subscriptionOrder);
        setVisible(true);
      }

      switch (event) {
        case "CREATED":
        case "UPDATED":
          if (
            !updatedOrders.find((order) => order.id === subscriptionOrder.id)
          ) {
            updatedOrders.push(subscriptionOrder);
          }
          client.writeQuery({
            query: GET_CUSTOMER_ORDERS,
            data: {
              getCustomerOrders: updatedOrders.find(
                (order) => order.id === subscriptionOrder.id
              ),
            },
          });
          break;
        case "DELETE":
          client.writeQuery({
            query: GET_CUSTOMER_ORDERS,
            data: {
              getCustomerOrders: updatedOrders.filter(
                (order) => order.id !== subscriptionOrder.id
              ),
            },
          });
          break;
        default:
          return;
      }

      client.writeQuery({
        query: GET_CUSTOMER_ORDERS,
        data: { getCustomerOrders: updatedOrders },
      });
    },
    onError(e) {
      console.log(e);
    },
  });

  const contextValue = useMemo(() => ({}), []);

  return (
    <OrderContext.Provider value={contextValue}>
      {children}
      <OrderBookedModal
        order={order}
        visible={visible}
        onClose={() => setVisible(false)}
      />
    </OrderContext.Provider>
  );
};
