import { gql } from "@apollo/client";
import {
  BRANCH_FIELDS,
  EVENT_FIELDS,
  PRODUCDETAIL_FIELDS,
  REVIEWS,
} from "../fragment";

export const GET_BRANCH_LIST = gql`
  query getBranchList($lat: Float!, $lon: Float!) {
    getBranchList(lat: $lat, lon: $lon) {
      name
      type
      branches {
        ...BranchDetailFields
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
  ${EVENT_FIELDS}
  ${BRANCH_FIELDS}
`;

export const SEARCH = gql`
  query search($value: String!) {
    search(value: $value) {
      branches {
        ...BranchDetailFields
        tableInfo {
          total
          seated
          available
        }
        latitude
        longitude
      }
      branchTotal
      products {
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
      productTotal
      events {
        ...EventFields
      }
      eventTotal
    }
  }
  ${PRODUCDETAIL_FIELDS}
  ${BRANCH_FIELDS}
  ${EVENT_FIELDS}
`;

export const GET_REVIEWS = gql`
  query getReviews($id: ID!, $type: String!) {
    getReviews(id: $id, type: $type) {
      ...ReviewsFields
    }
  }
  ${REVIEWS}
`;

export const GET_MERCHANT_BYDOMAIN = gql`
  query getMerchantByDomain($domain: String!) {
    getMerchantByDomain(domain: $domain) {
      id
      type
      name
      description
      services
      logo
      banner
      upload
      uploadBanner
      uploadBackground
      background
    }
  }
`;
