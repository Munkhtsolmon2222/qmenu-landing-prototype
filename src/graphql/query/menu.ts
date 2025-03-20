import { gql } from '@apollo/client';
import { MENU_CATEGORY_FIELDS } from '../fragment';

const GET_MASTER_CATEGORIES = gql`
  query getMasterCategories {
    getMasterCategories {
      ...MenuCategoryFields
    }
  }
  ${MENU_CATEGORY_FIELDS}
`;

export const MENU_QUERY = {
  GET_MASTER_CATEGORIES,
};
