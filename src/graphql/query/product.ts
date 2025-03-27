import { gql } from '@apollo/client';
import { ES_CHANNEL_FIELDS, ES_QUERY_RESULT_FIELDS, ES_PRODUCT_FIELDS } from '../fragment';

const GET_ES_PRODUCTS = gql`
  query getEsProducts($input: EsQueryInput!) {
    getEsProducts(input: $input) {
      ...EsQueryResultFields
      products {
        ...EsProductFields
        branch {
          ...EsChannelFields
          tableInfo {
            total
            seated
            available
          }
          latitude
          longitude
        }
      }
    }
  }
  ${ES_QUERY_RESULT_FIELDS}
  ${ES_PRODUCT_FIELDS}
  ${ES_CHANNEL_FIELDS}
`;

export const PRODUCT_QUERY = {
  GET_ES_PRODUCTS,
};
