import { gql } from "@apollo/client";

export const GET_CARD_ORDERS = gql`
  query getCardOrders(
    $number: String
    $branch: String
    $startDate: AWSDate!
    $endDate: AWSDate!
  ) {
    getCardOrders(
      number: $number
      branch: $branch
      startDate: $startDate
      endDate: $endDate
    ) {
      id
      number
      grandTotal
      completedAt
      items {
        quantity
        total
        name
        price
      }
    }
  }
`;
