import { gql } from '@apollo/client';
import { PRODUCT_FIELDS, VARIANT_FIELDS } from '../fragment';

const GET_CURRENT_CUSTOMER = gql`
  query me {
    me {
      birthday
      createdAt
      email
      firstName
      gender
      id
      lastName
      phone
      name
      updatedAt
      verified
      contacts {
        createdAt
        name
        updatedAt
        id
        description
      }
      accounts {
        id
        type
        data
        verified
        code
      }
    }
  }
`;

const GET_CUSTOMER_PRODUCTS = gql`
  query getCustomerProducts {
    getCustomerProducts {
      id
      spentOrder
      state
      code
      transaction
      expiredAt
      issuedOrder
      issuedType
      product {
        ...ProductFields
        variants {
          ...VariantFields
        }
      }
    }
  }
  ${PRODUCT_FIELDS}
  ${VARIANT_FIELDS}
`;

const SEARCH_CUSTOMERS = gql`
  query searchCustomers($query: String!) {
    searchCustomers(query: $query) {
      gender
      id
      name
      phone
      lastName
      firstName
      email
    }
  }
`;

export const CUSTOMER_QUERY = {
  GET_CURRENT_CUSTOMER,
  GET_CUSTOMER_PRODUCTS,
  SEARCH_CUSTOMERS,
};
