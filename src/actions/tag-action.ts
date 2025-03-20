'use server';
import { query } from '@/api';
import { TAG_QUERY } from '@/graphql/query';
import { Tag, TagType } from '@/lib/types';

export const GET_TAGS_BY_TYPE = async (type: TagType) => {
  return query<Tag[]>({ query: TAG_QUERY.GET_TAGS_BY_TYPE, variables: { type } });
};
