import { gql } from "@apollo/client";
import { REVIEW } from "../fragment";

export const CREATE_REVIEW = gql`
  mutation createReview($input: ReviewInput!) {
    createReview(input: $input) {
      ...ReviewFields
    }
  }
  ${REVIEW}
`;
