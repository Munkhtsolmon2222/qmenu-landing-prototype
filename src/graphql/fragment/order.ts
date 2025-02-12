import { gql } from "@apollo/client";
import { ORDER_ITEM_OPTION_FIELDS } from "./option";

export const ORDER_FIELDS = gql`
  fragment OrderFields on Order {
    id
    type
    date
    number
    state
    branchId
    customerId
    isRead
    paymentState
    address
    floor
    channelType
    contact
    guests
    comment
    name
    deliveryDate
    totalAmount
    discountAmount
    taxAmount
    grandTotal
    paidAmount
    debtAmount
    createdAt
    updatedAt
    register
    buyer
    vatState
    vatType
    vatAmount
    cityTax
    vatBillId
    vatIncludeAmount
    vatExcludeAmount
    vatDate
    vatLottery
    vatData
    orderedAt
    acceptedAt
    preparingAt
    preparedAt
    deliveringAt
    deliveredAt
    completedAt
    cancelledAt
    returnedAt
    movedAt
    printed
  }
`;

export const ORDER_ITEM_FIELDS = gql`
  fragment OrderItemFields on OrderItem {
    id
    state
    quantity
    comment
    reason
    total
    name
    price
    type
    discount
    createdAt
    updatedAt
    completedAt
    image
    productId
    variantName
    options {
      ...OrderItemOptionFields
    }
  }
  ${ORDER_ITEM_OPTION_FIELDS}
`;

export const DISCOUNTS_FIELDS = gql`
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

export const ORDER_VATS_FIELD = gql`
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

export const CHARGES_FIELDS = gql`
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

export const ORDER_LOYALTY_FIELDS = gql`
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

export const ORDER_TABLE_FIELDS = gql`
  fragment OrderTableFields on OrderTable {
    id
    tableId
    orderId
    name
    guests
  }
`;

// export const ORDER_SUMMARY_FIELDS = gql`
//   fragment OrderSummaryFields on OrderSummary {
//     date
//     average
//     count
//     total
//   }
// `;
