import { gql } from '@apollo/client';
import { REVIEWS } from '../fragment';

const GET_REVIEWS = gql`
  query getReviews($id: ID!, $type: String!) {
    getReviews(id: $id, type: $type) {
      ...ReviewsFields
    }
  }
  ${REVIEWS}
`;

const GET_MERCHANT_BYDOMAIN = gql`
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

export const BRANCH_QUERY = {
  GET_REVIEWS,
  GET_MERCHANT_BYDOMAIN,
};
