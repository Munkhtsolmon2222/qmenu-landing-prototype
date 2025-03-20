'use server';

import { query } from '@/api';
import { LOYALTY_MUTATION, ORDER_MUTATION } from '@/graphql/mutation';
import { SECTION_QUERY, ORDER_QUERY, LOYALTY_QUERY } from '@/graphql/query';
import { LoyaltyType } from '@/lib/constant';
import { UpointBalance, UpointBalanceInput } from '@/lib/providers';
import {
  Order,
  OrderInput,
  OrderType,
  SectionInfo,
  SectionInfoTime,
  Transaction,
  TransactionInput,
} from '@/lib/types';

export const CREATE_ORDER = async (input: OrderInput, participant: string) => {
  return query<Order>({ query: ORDER_MUTATION.CREATE_ORDER, variables: { input, participant } });
};

export const GET_ORDER = async (id: string) => {
  return query<Order>({ query: ORDER_QUERY.GET_ORDER, variables: { id } });
};

export const GET_OPEN_TIMES = async (deliveryDate: string, type: OrderType) => {
  return query<SectionInfoTime>({
    query: SECTION_QUERY.GET_OPEN_TIMES,
    variables: { input: { deliveryDate, type } },
  });
};

export const GET_SECTION_INFO = async (input: {
  type: OrderType;
  deliveryDate: string;
  guests: number;
  duration?: number;
  event?: string;
}) => {
  return query<SectionInfo[]>({
    query: SECTION_QUERY.GET_SECTION_INFO,
    variables: { input },
  });
};

export const PAY_ORDER = async (input: TransactionInput) => {
  return query<{ order: Order; transaction: Transaction }>({
    query: ORDER_MUTATION.GET_PAY_ORDER,
    variables: { input },
  });
};

export const CORRECTION_TRANSACTION = async (id: string, reason: string) => {
  return query<Order>({ query: ORDER_MUTATION.CORRECTION_TRANSACTION, variables: { id, reason } });
};

export const PAY_ORDER_WITH_SUB_PAYMENTS = async (
  input: TransactionInput,
  inputs: TransactionInput[],
) => {
  return query<{ order: Order; transaction: Transaction }>({
    query: ORDER_MUTATION.PAY_ORDER_WITH_SUB_PAYMENTS,
    variables: { input, inputs },
  });
};

export const VALIDATE_TRANSACTION = async (id: string) => {
  return query<Order>({
    query: ORDER_MUTATION.VALIDATE_TRANSACTION,
    variables: { id },
  });
};

export const GET_BALANCE_UPOINT = async (input: UpointBalanceInput) => {
  return query<UpointBalance>({
    query: LOYALTY_QUERY.GET_BALANCE_UPOINT,
    variables: { input },
  });
};

export const ADD_ORDER_LOYALTY = async (id: string, type: LoyaltyType) => {
  return query<Order>({
    query: LOYALTY_MUTATION.ADD_ORDER_LOYALTY,
    variables: { id, type },
  });
};

export const GET_CUSTOMER_ORDERS = async () => {
  return query<Order[]>({ query: ORDER_QUERY.GET_CUSTOMER_ORDERS });
};
