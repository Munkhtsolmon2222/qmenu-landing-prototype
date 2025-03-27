import { gql } from '@apollo/client';

export const ES_PRODUCT_FIELDS = gql`
  fragment EsProductFields on EsProduct {
    id
    channel
    name
    price
    image
    star
    totalReviews
    description
    specification
  }
`;
