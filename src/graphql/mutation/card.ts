import { gql } from '@apollo/client';
import { TRANSACTION_FIELDS } from '../fragment';

const CHECK_CARD = gql`
  mutation checkCard($card: String!, $branch: String!) {
    checkCard(card: $card, branch: $branch) {
      id
      status
      balance
      number
      firstName
      lastName
      card
      phone
    }
  }
`;

const CREATE_TOPUP = gql`
  mutation createTopUp($amount: Float!, $id: ID!) {
    createTopUp(amount: $amount, id: $id) {
      ...TransactionFields
    }
  }
  ${TRANSACTION_FIELDS}
`;

export const CARD_MUTATION = {
  CHECK_CARD,
  CREATE_TOPUP,
};
