'use server';
import { query } from '@/api';
import { REVIEW_MUTATION } from '@/graphql/mutation/review';
import { BRANCH_QUERY } from '@/graphql/query';
import { Review, ReviewInput } from '@/lib/types';

export const GET_REVIEWS = async (id: string, type: string) => {
  return query<{ summary: any[]; reviews: Review[]; total: any }>({
    query: BRANCH_QUERY.GET_REVIEWS,
    variables: { id, type },
  });
};

export const CREATE_REVIEW = async (input: ReviewInput) => {
  return query<Review>({ query: REVIEW_MUTATION.CREATE_REVIEW, variables: { input } });
};
