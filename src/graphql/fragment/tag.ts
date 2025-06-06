import { gql } from "@apollo/client";

export const TAG_FIELDS = gql`
  fragment TagFields on Tag {
    id
    name
    type
    icon
    createdAt
    updatedAt
  }
`;
