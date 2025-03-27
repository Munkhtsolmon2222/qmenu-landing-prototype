'use server';
import { query } from '@/api';
import { PRODUCT_QUERY } from '@/graphql/query';
import { getEsInput } from '@/lib/helpers';
import { EsQueryInputWithParams, EsQueryResult } from '@/lib/types';

export async function GET_ES_PRODUCTS(input: EsQueryInputWithParams) {
  return query<EsQueryResult>({
    query: PRODUCT_QUERY.GET_ES_PRODUCTS,
    variables: { input: getEsInput(input) },
  });
}
