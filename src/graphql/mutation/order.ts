import { gql } from '@apollo/client';
import {
  CHARGES_FIELDS,
  DISCOUNTS_FIELDS,
  ORDER_FIELDS,
  ORDER_ITEM_FIELDS,
  ORDER_LOYALTY_FIELDS,
  ORDER_TABLE_FIELDS,
  TABLE_FIELDS,
  TRANSACTION_FIELDS,
} from '../fragment';

const CREATE_ORDER = gql`
  mutation createOrder($id: ID, $input: OrderInput!, $participant: ID!) {
    createOrder(id: $id, input: $input, participant: $participant) {
      branch {
        id
        logo
        type
        name
      }
      ...OrderFields
      table {
        ...TableFields
      }
      items {
        ...OrderItemFields
      }
      transactions {
        ...TransactionFields
      }
      discounts {
        ...DiscountsFields
      }
      charges {
        ...ChargesFields
      }
      loyalties {
        ...OrderLoyaltyFields
      }
      tables {
        ...OrderTableFields
      }
    }
  }
  ${TABLE_FIELDS}
  ${ORDER_FIELDS}
  ${DISCOUNTS_FIELDS}
  ${CHARGES_FIELDS}
  ${ORDER_ITEM_FIELDS}
  ${TRANSACTION_FIELDS}
  ${ORDER_LOYALTY_FIELDS}
  ${ORDER_TABLE_FIELDS}
`;

const CORRECTION_TRANSACTION = gql`
  mutation returnTransaction($id: ID!, $reason: String) {
    returnTransaction(id: $id, reason: $reason) {
      order {
        ...OrderFields
        table {
          ...TableFields
        }
        items {
          ...OrderItemFields
        }
        transactions {
          ...TransactionFields
        }
        loyalties {
          ...OrderLoyaltyFields
        }
      }
      transaction {
        ...TransactionFields
      }
    }
  }
  ${ORDER_FIELDS}
  ${TABLE_FIELDS}
  ${ORDER_ITEM_FIELDS}
  ${TRANSACTION_FIELDS}
  ${ORDER_LOYALTY_FIELDS}
`;

const VALIDATE_TRANSACTION = gql`
  mutation validateTransaction($id: ID!) {
    validateTransaction(id: $id) {
      ...OrderFields
      table {
        ...TableFields
      }
      items {
        ...OrderItemFields
      }
      transactions {
        ...TransactionFields
      }
      loyalties {
        ...OrderLoyaltyFields
      }
    }
  }
  ${ORDER_FIELDS}
  ${TABLE_FIELDS}
  ${ORDER_ITEM_FIELDS}
  ${TRANSACTION_FIELDS}
  ${ORDER_LOYALTY_FIELDS}
`;

const PAY_ORDER_WITH_SUB_PAYMENTS = gql`
  mutation payOrderWithSubPayments($input: TransactionInput!, $inputs: [TransactionInput!]) {
    payOrderWithSubPayments(input: $input, inputs: $inputs) {
      order {
        ...OrderFields
        table {
          ...TableFields
        }
        items {
          ...OrderItemFields
        }
        transactions {
          ...TransactionFields
        }
        loyalties {
          ...OrderLoyaltyFields
        }
      }
      transaction {
        ...TransactionFields
      }
    }
  }
  ${ORDER_FIELDS}
  ${TABLE_FIELDS}
  ${ORDER_ITEM_FIELDS}
  ${ORDER_LOYALTY_FIELDS}
  ${TRANSACTION_FIELDS}
`;

const GET_PAY_ORDER = gql`
  mutation payOrder($input: TransactionInput!) {
    payOrder(input: $input) {
      order {
        ...OrderFields
        table {
          ...TableFields
        }
        items {
          ...OrderItemFields
        }
        transactions {
          ...TransactionFields
        }
        loyalties {
          ...OrderLoyaltyFields
        }
      }
      transaction {
        ...TransactionFields
      }
    }
  }
  ${ORDER_FIELDS}
  ${TABLE_FIELDS}
  ${ORDER_ITEM_FIELDS}
  ${ORDER_LOYALTY_FIELDS}
  ${TRANSACTION_FIELDS}
`;

const CANCEL_ORDER = gql`
  mutation cancelOrder($id: ID!, $reason: String) {
    cancelOrder(id: $id, reason: $reason)
  }
`;

export const ORDER_MUTATION = {
  CREATE_ORDER,
  CORRECTION_TRANSACTION,
  VALIDATE_TRANSACTION,
  PAY_ORDER_WITH_SUB_PAYMENTS,
  GET_PAY_ORDER,
  CANCEL_ORDER,
};
