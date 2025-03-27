'use server';
import { query } from '@/api';
import { DISCOUNT_QUERY } from '@/graphql/query';
import { getEsInput } from '@/lib/helpers';
import { EsQueryInputWithParams, EsQueryResult } from '@/lib/types';

export async function GET_ES_DISCOUNTS(input?: EsQueryInputWithParams) {
  return query<EsQueryResult>({
    query: DISCOUNT_QUERY.GET_ES_DISCOUNTS,
    variables: { input: getEsInput(input) },
  });
}
