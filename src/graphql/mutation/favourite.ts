import { gql } from "@apollo/client";

export const EDIT_FAVOURITE = gql`
  mutation editFavourite($id: String!, $type: String) {
    editFavourite(id: $id, type: $type)
  }
`;
