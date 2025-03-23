import { gql } from '@apollo/client';
import {
  ES_CHANNEL_FIELDS,
  ES_PRODUCT_FIELDS,
  ES_QUERY_RESULT_FIELDS,
  EVENT_FIELDS,
} from '../fragment';

const GET_ES_CHANNEL_LIST = gql`
  query getEsChannelList($input: EsQueryInput!) {
    getEsChannelList(input: $input) {
      ...EsQueryResultFields
      channels {
        ...EsChannelFields
        rate
        address
        tableInfo {
          total
          seated
          available
        }
      }
      events {
        ...EventFields
      }
    }
  }
  ${ES_QUERY_RESULT_FIELDS}
  ${EVENT_FIELDS}
  ${ES_CHANNEL_FIELDS}
`;

const GET_ES_CHANNELS = gql`
  query getEsChannels($input: EsQueryInput!) {
    getEsChannels(input: $input) {
      ...EsQueryResultFields
      channels {
        ...EsChannelFields
        tableInfo {
          total
          seated
          available
        }
        latitude
        longitude
        address
      }
    }
  }
  ${ES_QUERY_RESULT_FIELDS}
  ${ES_CHANNEL_FIELDS}
`;

const GET_ES_CHANNELS_BY_CATEGORIES = gql`
  query getEsChannelsByCategories($input: EsQueryInput!) {
    getEsChannelsByCategories(input: $input) {
      ...EsQueryResultFields
      channels {
        ...EsChannelFields
        tableInfo {
          total
          seated
          available
        }
        latitude
        longitude
        address
      }
    }
  }
  ${ES_QUERY_RESULT_FIELDS}
  ${ES_CHANNEL_FIELDS}
`;

const SEARCH = gql`
  query search($value: String!) {
    search(value: $value) {
      ...EsQueryResultFields
      channels {
        ...EsChannelFields
        tableInfo {
          total
          seated
          available
        }
        latitude
        longitude
      }
      products {
        ...EsProductFields
        branch {
          ...EsChannelFields
          tableInfo {
            total
            seated
            available
          }
        }
      }
      events {
        ...EventFields
      }
    }
  }
  ${ES_QUERY_RESULT_FIELDS}
  ${ES_PRODUCT_FIELDS}
  ${ES_CHANNEL_FIELDS}
  ${EVENT_FIELDS}
`;

export const CHANNEL_QUERY = {
  SEARCH,
  GET_ES_CHANNELS_BY_CATEGORIES,
  GET_ES_CHANNEL_LIST,
  GET_ES_CHANNELS,
};
