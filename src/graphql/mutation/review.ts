import { gql } from '@apollo/client';
import { REVIEW } from '../fragment';

const CREATE_REVIEW = gql`
  mutation createReview($input: ReviewInput!) {
    createReview(input: $input) {
      ...ReviewFields
    }
  }
  ${REVIEW}
`;

export const REVIEW_MUTATION = {
  CREATE_REVIEW,
};
