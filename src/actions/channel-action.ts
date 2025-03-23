'use server';
import { query } from '@/api';
import { CHANNEL_QUERY } from '@/graphql/query';
import { getEsInput } from '@/lib/helpers';
import { PositionStorage } from '@/lib/providers';
import { EsQueryInputWithParams, EsQueryResult } from '@/lib/types';

export async function SEARCH_RESULT(value: string) {
  return query<EsQueryResult>({ query: CHANNEL_QUERY.SEARCH, variables: { value } });
}

export async function GET_ES_CHANNELS(input: EsQueryInputWithParams) {
  return query<EsQueryResult>({
    query: CHANNEL_QUERY.GET_ES_CHANNELS,
    variables: { input: getEsInput(input) },
  });
}

export const GET_ES_CHANNEL_LIST = async (positionStr: string) => {
  let position: PositionStorage | undefined;

  try {
    position = JSON.parse(positionStr);
  } catch (error) {}

  return query<EsQueryResult[]>({
    query: CHANNEL_QUERY.GET_ES_CHANNEL_LIST,
    variables: { input: { lat: position?.lat, lon: position?.lon } },
  });
};

export async function GET_ES_CHANNELS_BY_CATEGORIES(input: EsQueryInputWithParams) {
  return query<EsQueryResult>({
    query: CHANNEL_QUERY.GET_ES_CHANNELS_BY_CATEGORIES,
    variables: { input: getEsInput(input) },
  });
}
