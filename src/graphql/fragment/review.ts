import { gql } from "@apollo/client";

export const REVIEW = gql`
  fragment ReviewFields on Review {
    id
    createdAt
    updatedAt
    type
    comment
    name
    stars
  }
`;

export const REVIEW_SUMMARY = gql`
  fragment ReviewSummaryFields on ReviewSummary {
    star
    total
    type
  }
`;

export const REVIEWS_TOTAL_FIELDS = gql`
  fragment ReviewTotalFields on ReviewTotal {
    average
    sum
    stars {
      count
      total
      star
      percent
    }
  }
`;

export const REVIEWS = gql`
  fragment ReviewsFields on Reviews {
    summary {
      ...ReviewSummaryFields
    }
    reviews {
      ...ReviewFields
    }
    total {
      ...ReviewTotalFields
    }
  }
  ${REVIEWS_TOTAL_FIELDS}
  ${REVIEW_SUMMARY}
  ${REVIEW}
`;
