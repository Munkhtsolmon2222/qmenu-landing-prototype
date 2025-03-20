'use server';
import { query } from '@/api';
import { EVENT_QUERY } from '@/graphql/query';
import { IEvent } from '@/lib/types';

export const GET_EVENT = async (id: string) => {
  return query<IEvent>({ query: EVENT_QUERY.GET_EVENT, variables: { id } });
};
