'use server';
import { query } from '@/api';
import { BANNER_QUERY } from '@/graphql/query';
import { Banner } from '@/lib/types';

export const GET_BANNERS = async () => {
  return query<Banner[]>({ query: BANNER_QUERY.GET_BANNERS });
};
