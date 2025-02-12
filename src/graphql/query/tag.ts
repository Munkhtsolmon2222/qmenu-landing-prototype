import { gql } from "@apollo/client";
import { TAG_FIELDS } from "@/graphql/fragment";

export const GET_TAGS_BY_TYPE = gql`
  query getTagsByType($type: String!) {
    getTagsByType(type: $type) {
      ...TagFields
    }
  }
  ${TAG_FIELDS}
`;
