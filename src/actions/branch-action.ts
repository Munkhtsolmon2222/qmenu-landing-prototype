'use server';
import { query } from '@/api';
import { BRANCH_QUERY, LOCATION_QUERY } from '@/graphql/query';
import { PositionStorage } from '@/lib/providers';
import { BranchDetail, BranchList, SearchResult } from '@/lib/types';

export async function SEARCH_RESULT(value: string) {
  return query<SearchResult>({ query: BRANCH_QUERY.SEARCH, variables: { value } });
}

export async function FILTER_BRANCHES(variables: {
  lat: number;
  lon: number;
  filters: string[];
  limit: number;
  offset: number;
  distance: string;
}) {
  return query<BranchDetail[]>({ query: LOCATION_QUERY.FILTER_BRANCHES, variables });
}

export async function FILTER_RESULT(variables: {
  lat: number;
  lon: number;
  filters: string[];
  limit: number;
  offset: number;
  distance: string;
}) {
  return query<{ branches: BranchDetail[] }>({
    query: LOCATION_QUERY.FILTER_RESULT,
    variables,
  });
}

export const GET_BRANCH_LIST = async (positionStr: string) => {
  let position: PositionStorage | undefined;

  try {
    position = JSON.parse(positionStr);
  } catch (error) {}

  return query<BranchList[]>({
    query: BRANCH_QUERY.GET_BRANCH_LIST,
    variables: { lat: position?.lat, lon: position?.lon },
  });
};
