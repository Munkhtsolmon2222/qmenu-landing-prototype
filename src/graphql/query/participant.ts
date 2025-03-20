import { gql } from '@apollo/client';
import {
  BRANCH_FIELDS1,
  EVENT_FIELDS,
  MENU_CATEGORY_FIELDS,
  MENU_FIELDS,
  MENU_OPTION_FIELDS,
  MENU_PRODUCT_FIELDS,
  MENU_VARIANT_FIELDS,
} from '../fragment';

const GET_PARTICIPANT = gql`
  query getParticipant($id: ID!, $lat: Float, $lon: Float) {
    getParticipant(id: $id, lat: $lat, lon: $lon) {
      token
      id
      advancePayment
      services
      vat
      waiter
      orderable
      branch {
        ...BranchFields
      }
      payments {
        type
        id
        name
      }
      events {
        ...EventFields
      }
      menu {
        ...MenuFields
        categories {
          ...MenuCategoryFields
          products {
            ...MenuProductFields
            variants {
              ...MenuVariantFields
              options {
                ...MenuOptionFields
              }
            }
          }
          children {
            ...MenuCategoryFields
            products {
              ...MenuProductFields
              variants {
                ...MenuVariantFields
                options {
                  ...MenuOptionFields
                }
              }
            }
          }
        }
      }
    }
  }
  ${MENU_CATEGORY_FIELDS}
  ${MENU_OPTION_FIELDS}
  ${MENU_PRODUCT_FIELDS}
  ${MENU_VARIANT_FIELDS}
  ${MENU_FIELDS}
  ${BRANCH_FIELDS1}
  ${EVENT_FIELDS}
`;

export const PARTICIPANT_QUERY = {
  GET_PARTICIPANT,
};
