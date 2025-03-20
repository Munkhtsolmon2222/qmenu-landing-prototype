import { gql } from '@apollo/client';
import {
  CHARGES_FIELDS,
  DISCOUNTS_FIELDS,
  ORDER_LOYALTY_FIELDS,
  TABLE_FIELDS,
  TRANSACTION_FIELDS,
  ORDER_ITEM_FIELDS,
  ORDER_FIELDS,
} from '../fragment';

const ADD_ORDER_LOYALTY = gql`
  mutation addOrderLoyalty($id: ID!, $type: LoyaltyType!) {
    addOrderLoyalty(id: $id, type: $type) {
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
    }
  }
  ${TABLE_FIELDS}
  ${ORDER_FIELDS}
  ${DISCOUNTS_FIELDS}
  ${CHARGES_FIELDS}
  ${ORDER_ITEM_FIELDS}
  ${TRANSACTION_FIELDS}
  ${ORDER_LOYALTY_FIELDS}
`;

export const LOYALTY_MUTATION = {
  ADD_ORDER_LOYALTY,
};
