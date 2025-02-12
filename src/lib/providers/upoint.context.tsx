"use client";
import { useState, useMemo, useCallback, createContext } from "react";
import { useLazyQuery, useMutation } from "@apollo/client";
import { CustomerAccountType } from "@/lib/config/constant";
import { GET_BALANCE_UPOINT, GET_ORDERS } from "@/graphql/query";
import { ADD_ORDER_LOYALTY } from "@/graphql/mutation/loyalty";

interface UpointBalanceState {
  phone: string;
  balance: number;
  payment: string;
  state: "spend" | "collect" | "balance";
  code: string;
}

interface ActionType {
  variables?: () => void;
  onCompleted?: (data) => void;
  onError?: (error: Error) => void;
  options?: () => void;
  update?: () => void;
}

type UpointContextType = {
  upointBalance?: UpointBalanceState;
  setUpointBalance: (e: UpointBalanceState) => void;
  upointLoadingBalance: boolean;
  getUpointBalance: (input) => Promise<void>;
  upointStep: number;
  setUpointStep: (e: number) => void;
  clearUpointState: () => void;
  addOrderLoyalty: (input) => Promise<void>;
  addingLoyalty: boolean;
};

export const UpointContext = createContext<UpointContextType>(
  {} as UpointContextType
);

export interface UpointBalance {
  id: string;
  customerId: string;
  firstName: string;
  lastName: string;
  phone: string;
  type: CustomerAccountType;
  data: string;
  verified: boolean;
  code: string;
  accountId: string;
  balance: number;
}

export const UpointProvider = ({ children }) => {
  const [upointBalance, setUpointBalance] = useState<UpointBalanceState>();
  const [upointStep, setUpointStep] = useState<number>(0);

  const [getBalanceUpoint, { loading: upointLoadingBalance }] = useLazyQuery<{
    getBalanceUpoint: UpointBalance;
  }>(GET_BALANCE_UPOINT);

  const getUpointBalance = useCallback(
    async ({ variables, onCompleted, onError, options }: ActionType) => {
      await getBalanceUpoint({
        fetchPolicy: "network-only",
        variables,
        onCompleted:
          onCompleted ||
          ((data) => {
            setUpointBalance({
              phone: data.getBalanceUpoint.phone,
              balance: +data.getBalanceUpoint.balance,
              payment: "",
              state: "balance",
              code: data.getBalanceUpoint.code,
            });
            setUpointStep((prevStep) => prevStep + 1);
          }),
        onError:
          onError ||
          ((error) => console.log("Error getBalance", error.message)),
        ...options,
      });
      return Promise.resolve();
    },
    [getBalanceUpoint]
  );

  const [addLoyalty, { loading: addingLoyalty }] =
    useMutation(ADD_ORDER_LOYALTY);
  const addOrderLoyalty = useCallback(
    async ({ variables, onError, update, options }: ActionType) => {
      await addLoyalty({
        variables,
        update:
          update ||
          ((cache, { data: { addOrderLoyalty } }) => {
            const caches = cache.readQuery<{ getOrders }>({
              query: GET_ORDERS,
            });
            if (caches?.getOrders) {
              cache.writeQuery({
                query: GET_ORDERS,
                data: {
                  getOrders: caches.getOrders.map((item) =>
                    item.id === addOrderLoyalty.id ? addOrderLoyalty : item
                  ),
                },
              });
            }
          }),
        onError:
          onError ||
          ((error) => console.log("Error addOrderLoyalty", error.message)),
        ...options,
      });
      return Promise.resolve();
    },
    [addLoyalty]
  );

  const clearUpointState = () => {
    setUpointStep(0);
    setUpointBalance(undefined);
  };

  const contextValue = useMemo(
    () => ({
      upointBalance,
      setUpointBalance,
      upointLoadingBalance,
      getUpointBalance,
      upointStep,
      setUpointStep,
      clearUpointState,
      addOrderLoyalty,
      addingLoyalty,
    }),
    [
      upointBalance,
      upointLoadingBalance,
      upointStep,
      addOrderLoyalty,
      addingLoyalty,
      getUpointBalance,
    ]
  );

  return (
    <UpointContext.Provider value={contextValue}>
      {children}
    </UpointContext.Provider>
  );
};
