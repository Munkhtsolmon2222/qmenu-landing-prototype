import { gql } from '@apollo/client';
import { NOTIFICATION_ACTION_FIELDS, NOTIFICATION_FIELDS } from '../fragment';

const GET_NOTIFICATIONS = gql`
  query getNotifications($limit: Int!, $nextToken: String) {
    getNotifications(limit: $limit, nextToken: $nextToken) {
      notifications {
        ...NotificationFields
        actions {
          ...NotificationActionFields
        }
      }
      nextToken
    }
  }
  ${NOTIFICATION_ACTION_FIELDS}
  ${NOTIFICATION_FIELDS}
`;

export const NOTIFICATION_QUERY = {
  GET_NOTIFICATIONS,
};
