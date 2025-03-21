'use server';
import { query } from '@/api';
import { PRODUCT_QUERY } from '@/graphql/query';
import { EsQueryInput, EsQueryResult } from '@/lib/types';

export async function GET_ES_PRODUCTS(input: EsQueryInput) {
  return query<EsQueryResult>({ query: PRODUCT_QUERY.GET_ES_PRODUCTS, variables: { input } });
}
