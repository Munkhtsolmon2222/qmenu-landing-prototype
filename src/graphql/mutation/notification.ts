import { gql } from '@apollo/client';

const READ_NOTIFICATION = gql`
  mutation readNotification($sk: String!) {
    readNotification(sk: $sk)
  }
`;

export const NOTIFICATION_MUTATION = {
  READ_NOTIFICATION,
};
