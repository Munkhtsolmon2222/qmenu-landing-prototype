import { gql } from '@apollo/client';

const GET_VAT_PAYER = gql`
  query getVatPayer($register: String) {
    getVatPayer(register: $register) {
      found
      name
    }
  }
`;

export const VAT_QUERY = {
  GET_VAT_PAYER,
};
