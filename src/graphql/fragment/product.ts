import { gql } from "@apollo/client";

export const PRODUCDETAIL_FIELDS = gql`
  fragment ProductDetailFields on ProductDetail {
    id
    channel
    name
    price
    image
    star
    totalReviews
  }
`;
