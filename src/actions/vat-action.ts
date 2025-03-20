'use server';

import { query } from '@/api';
import { VAT_QUERY } from '@/graphql/query';

export const GET_VAT_PAYER = async (register: string) => {
  return query<{ found: boolean; name: string }>({
    query: VAT_QUERY.GET_VAT_PAYER,
    variables: { register },
  });
};
