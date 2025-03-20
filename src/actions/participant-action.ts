import { query } from '@/api';
import { PARTICIPANT_QUERY } from '@/graphql/query';
import { Participant } from '@/lib/types';

export const GET_PARTICIPANT = async (id: string) =>
  query<Participant>({ query: PARTICIPANT_QUERY.GET_PARTICIPANT, variables: { id } });
