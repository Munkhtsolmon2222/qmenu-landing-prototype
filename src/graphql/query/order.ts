import { gql } from '@apollo/client';
import {
  BRANCH_FIELDS,
  CUSTOMER_FIELDS,
  ORDER_FIELDS,
  ORDER_ITEM_FIELDS,
  ORDER_TABLE_FIELDS,
  TABLE_FIELDS,
  TRANSACTION_FIELDS,
} from '../fragment';

const ORDER_LOYALTY_FIELDS = gql`
  fragment OrderLoyaltyFields on OrderLoyalty {
    id
    type
    date
    code
    point
    data
    data1
    state
  }
`;

const DISCOUNTS_FIELDS = gql`
  fragment DiscountsFields on OrderDiscount {
    amount
    calculation
    createdAt
    discountId
    state
    id
    name
    type
    updatedAt
    value
  }
`;

const ORDER_VATS_FIELD = gql`
  fragment VatsFields on Vat {
    amount
    citytax
    buyer
    createdAt
    date
    id
    state
    register
    type
    updatedAt
  }
`;

const CHARGES_FIELDS = gql`
  fragment ChargesFields on OrderCharge {
    calculation
    amount
    createdAt
    id
    state
    name
    chargeId
    type
    value
    updatedAt
  }
`;

const GET_ORDER_REVIEWS = gql`
  query getOrderReviewsByLimit($offset: Int, $limit: Int) {
    getOrderReviewsByLimit(offset: $offset, limit: $limit) {
      id
      createdAt
      updatedAt
      type

      liked
      comment
      additional
      pictures
      uploads
      order {
        ...OrderFields
      }
      customer {
        ...CustomerFields
      }
    }
  }
  ${CUSTOMER_FIELDS}
  ${ORDER_FIELDS}
`;

const GET_ORDER = gql`
  query getOrder($id: ID!) {
    getOrder(id: $id) {
      ...OrderFields
      branch {
        ...BranchFields
      }
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
  ${BRANCH_FIELDS}
  ${TABLE_FIELDS}
  ${ORDER_FIELDS}
  ${DISCOUNTS_FIELDS}
  ${CHARGES_FIELDS}
  ${ORDER_ITEM_FIELDS}
  ${TRANSACTION_FIELDS}
  ${ORDER_LOYALTY_FIELDS}
  ${ORDER_TABLE_FIELDS}
`;

const GET_ORDERS = gql`
  query getOrders {
    getOrders {
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
  ${ORDER_TABLE_FIELDS}
`;
const GET_CUSTOMER_ORDERS = gql`
  query getCustomerOrders {
    getCustomerOrders {
      ...OrderFields
      table {
        ...TableFields
      }
      branch {
        ...BranchFields
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
      tables {
        ...OrderTableFields
      }
    }
  }
  ${BRANCH_FIELDS}
  ${TABLE_FIELDS}
  ${ORDER_FIELDS}
  ${DISCOUNTS_FIELDS}
  ${CHARGES_FIELDS}
  ${ORDER_ITEM_FIELDS}
  ${TRANSACTION_FIELDS}
  ${ORDER_TABLE_FIELDS}
`;

export const ORDER_QUERY = {
  GET_ORDER,
  GET_ORDERS,
  GET_CUSTOMER_ORDERS,
  GET_ORDER_REVIEWS,
};
