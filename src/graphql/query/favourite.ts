import { gql } from "@apollo/client";
import { BRANCH_FIELDS1, CUSTOMER_FIELDS, PRODUCT_FIELDS } from "../fragment";

export const GET_FAVOURITES = gql`
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
  ${BRANCH_FIELDS1}
  ${PRODUCT_FIELDS}
  ${CUSTOMER_FIELDS}
`;
