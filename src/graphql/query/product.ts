import { gql } from '@apollo/client';
import { BRANCH_FIELDS, PRODUCDETAIL_FIELDS } from '../fragment';

const GET_RECOMMENDED_PRODUCTS = gql`
  query getRecommendedProducts($lat: Float!, $lon: Float!) {
    getRecommendedProducts(lat: $lat, lon: $lon) {
      ...ProductDetailFields
      branch {
        ...BranchDetailFields
        tableInfo {
          total
          seated
          available
        }
      }
    }
  }
  ${PRODUCDETAIL_FIELDS}
  ${BRANCH_FIELDS}
`;

export const PRODUCT_QUERY = {
  GET_RECOMMENDED_PRODUCTS,
};
