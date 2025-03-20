'use client';
import { useState, useMemo, useCallback, createContext } from 'react';
import { CustomerAccountType } from '@/lib/constant';
import { useAction } from '../hooks';
import { ADD_ORDER_LOYALTY, GET_BALANCE_UPOINT } from '@/actions';
import { QueryError } from '../types';

interface UpointBalanceState {
  phone: string;
  balance: number;
  payment: string;
  state: 'spend' | 'collect' | 'balance';
  code: string;
}

interface ActionType {
  // variables: UpointBalanceInput;
  variables: any;
  onSuccess?: (data: UpointBalance) => void;
  onError?: (error: QueryError) => void;
  options?: any;
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

export const UpointContext = createContext<UpointContextType>({} as UpointContextType);

export interface UpointBalanceInput {
  mobile?: string;
  pin_code: string;
  order: string;
  payment: string;
  card_number?: string;
  verify?: boolean;
}

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

  const { action: getBalanceUpoint, loading: upointLoadingBalance } = useAction(
    GET_BALANCE_UPOINT,
    { lazy: true },
  );

  const getUpointBalance = useCallback(
    async ({ variables, onSuccess, onError, options }: ActionType) => {
      await getBalanceUpoint(variables, {
        onSuccess:
          onSuccess ||
          ((data) => {
            setUpointBalance({
              phone: data?.phone ?? '',
              balance: +(data?.balance || 0),
              payment: '',
              state: 'balance',
              code: data?.code ?? '',
            });
            setUpointStep((prevStep) => prevStep + 1);
          }),
        onError: onError || ((error) => console.log('Error getBalance', error.message)),
        ...options,
      });
      return Promise.resolve();
    },
    [getBalanceUpoint],
  );

  const { action: addLoyalty, loading: addingLoyalty } = useAction(ADD_ORDER_LOYALTY, {
    lazy: true,
  });

  const addOrderLoyalty = useCallback(
    async ({ variables, onError, options }: ActionType) => {
      await addLoyalty(variables.id, variables.type, {
        onError: onError || ((error) => console.log('Error addOrderLoyalty', error.message)),
        ...options,
      });
      return Promise.resolve();
    },
    [addLoyalty],
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
    ],
  );

  return <UpointContext.Provider value={contextValue}>{children}</UpointContext.Provider>;
};
