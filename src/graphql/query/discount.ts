import { gql } from '@apollo/client';
import { ES_DISCOUNT_FIELDS, ES_QUERY_RESULT_FIELDS } from '../fragment';

const GET_ES_DISCOUNTS = gql`
  query getEsDiscounts($input: EsQueryInput) {
    getEsDiscounts(input: $input) {
      ...EsQueryResultFields
      discounts {
        ...EsDiscountFields
      }
      afterKey
    }
  }
  ${ES_QUERY_RESULT_FIELDS}
  ${ES_DISCOUNT_FIELDS}
`;

export const DISCOUNT_QUERY = {
  GET_ES_DISCOUNTS,
};
