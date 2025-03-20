'use server';

import { query } from '@/api';
import { FAVOURITE_MUTATION } from '@/graphql/mutation';
import { FAVOURITE_QUERY } from '@/graphql/query';
import { Favourite, FavouriteItemType } from '@/lib/types';

export const GET_FAVOURITES = async (type: FavouriteItemType) => {
  return query<Favourite[]>({
    query: FAVOURITE_QUERY.GET_FAVOURITES,
    variables: { type },
  });
};

export const EDIT_FAVOURITE = async (id: string, type: FavouriteItemType) => {
  return query<boolean>({
    query: FAVOURITE_MUTATION.EDIT_FAVOURITE,
    variables: { id, type },
  });
};
