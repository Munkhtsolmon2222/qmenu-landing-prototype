import { gql } from '@apollo/client';

const EDIT_FAVOURITE = gql`
  mutation editFavourite($id: String!, $type: String) {
    editFavourite(id: $id, type: $type)
  }
`;

export const FAVOURITE_MUTATION = {
  EDIT_FAVOURITE,
};
