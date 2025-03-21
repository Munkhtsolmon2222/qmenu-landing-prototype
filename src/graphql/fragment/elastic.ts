import { gql } from '@apollo/client';

export const ES_QUERY_RESULT_FIELDS = gql`
  fragment EsQueryResultFields on EsQueryResult {
    name
    rank
    tagType
    afterKey
    channelTotal
    productTotal
    eventTotal
    discountTotal
  }
`;
