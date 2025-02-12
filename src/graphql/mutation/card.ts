import { gql } from "@apollo/client";
import { TRANSACTION_FIELDS } from "../fragment";

export const CHECK_CARD = gql`
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

export const CREATE_TOPUP = gql`
  mutation createTopUp($amount: Float!, $id: ID!) {
    createTopUp(amount: $amount, id: $id) {
      ...TransactionFields
    }
  }
  ${TRANSACTION_FIELDS}
`;
