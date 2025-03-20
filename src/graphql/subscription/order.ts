import { gql } from '@apollo/client';
import {
  ORDER_FIELDS,
  ORDER_ITEM_FIELDS,
  ORDER_TABLE_FIELDS,
  STAFF_FIELDS,
  TABLE_FIELDS,
  TRANSACTION_FIELDS,
  CHARGES_FIELDS,
  DISCOUNTS_FIELDS,
  ORDER_LOYALTY_FIELDS,
} from '../fragment';

export const ON_UPDATED_ORDER = gql`
  subscription onUpdatedOrder($customer: ID!) {
    onUpdatedOrder(customer: $customer) {
      branch
      customer
      event
      id
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
        discounts {
          ...DiscountsFields
        }
        charges {
          ...ChargesFields
        }
        loyalties {
          ...OrderLoyaltyFields
        }
        staff {
          ...StaffFields
        }
        tables {
          ...OrderTableFields
        }
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
  ${STAFF_FIELDS}
  ${ORDER_TABLE_FIELDS}
`;
