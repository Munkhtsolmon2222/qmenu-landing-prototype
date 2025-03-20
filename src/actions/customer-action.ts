'use server';
import { LoginInput, ProfileInput, SignupInput } from '@/lib/validations';
import { CUSTOMER_MUTATION, AUTH_MUTATION } from '@/graphql/mutation';
import { Customer, SignupReturnValue } from '@/lib/types';
import { CUSTOMER_QUERY } from '@/graphql/query';
import { SessionType } from '@/lib/constant';
import { query } from '@/api';

export const LOGIN = async ({ password, phone }: LoginInput) =>
  query<{ token: string }>({
    query: AUTH_MUTATION.LOGIN,
    variables: { password, phone },
  });

export const REGISTER = async (input: SignupInput) =>
  query<SignupReturnValue>({ query: AUTH_MUTATION.REGISTER, variables: { input } });

export const SEARCH_CUSTOMERS = async (value: string) =>
  query<Customer[]>({ query: CUSTOMER_QUERY.SEARCH_CUSTOMERS, variables: { query: value } });

export const GET_SESSION = async (phone: string, type: SessionType, password?: string) =>
  query<string>({ query: CUSTOMER_MUTATION.GET_SESSION, variables: { phone, type, password } });

export const SESSION_VERIFY = async (id: string, pin: string) =>
  query<{ token: string; verified?: boolean }>({
    query: CUSTOMER_MUTATION.SESSION_VERIFY,
    variables: { id, pin },
  });

export const VERIFY_SESSION = async (id: string, pin: string) =>
  query<boolean>({
    query: CUSTOMER_MUTATION.VERIFY_SESSION,
    variables: { id, pin },
  });

export const GET_CURRENT_CUSTOMER = async () =>
  query<Customer>({ query: CUSTOMER_QUERY.GET_CURRENT_CUSTOMER });

export const GET_CUSTOMER_PRODUCTS = async () =>
  query<any>({ query: CUSTOMER_QUERY.GET_CUSTOMER_PRODUCTS });

export const UPDATE_PROFILE = async (input: ProfileInput) => {
  return query<Customer>({ query: CUSTOMER_MUTATION.UPDATE_PROFILE, variables: { input } });
};

export const UPDATE_PASSWORD = async (input: { password: string; newPassord: string }) => {
  return query<Customer>({ query: CUSTOMER_MUTATION.UPDATE_PASSWORD, variables: { ...input } });
};

export const UPDATE_PHONE = async (session: string, pin: string) => {
  return query<Customer>({ query: CUSTOMER_MUTATION.UPDATE_PHONE, variables: { session, pin } });
};
