import { gql } from '@apollo/client';
import { BRANCH_FIELDS, CUSTOMER_FIELDS, PRODUCT_FIELDS } from '../fragment';

const GET_FAVOURITES = gql`
  query getFavourites($type: String!) {
    getFavourites(type: $type) {
      branch {
        ...BranchFields
      }
      product {
        ...ProductFields
      }
      customer {
        ...CustomerFields
      }
      type
    }
  }
  ${BRANCH_FIELDS}
  ${PRODUCT_FIELDS}
  ${CUSTOMER_FIELDS}
`;

export const FAVOURITE_QUERY = {
  GET_FAVOURITES,
};
