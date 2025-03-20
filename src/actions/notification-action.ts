'use server';
import { query } from '@/api';
import { NOTIFICATION_MUTATION } from '@/graphql/mutation';
import { NOTIFICATION_QUERY } from '@/graphql/query';
import { INotification } from '@/lib/types';

export const GET_NOTIFICATIONS = async (limit: number, nextToken?: string) => {
  return query<{ notifications: INotification[]; nextToken: string }>({
    query: NOTIFICATION_QUERY.GET_NOTIFICATIONS,
    variables: {
      limit,
      nextToken,
    },
  });
};

export const READ_NOTIFICATION = async (sk: string) => {
  return query<INotification>({
    query: NOTIFICATION_MUTATION.READ_NOTIFICATION,
    variables: { sk },
  });
};
