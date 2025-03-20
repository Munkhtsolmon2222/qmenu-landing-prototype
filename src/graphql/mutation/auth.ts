import { gql } from '@apollo/client';

const GET_APP_TOKEN = gql`
  mutation getAppToken($code: String!) {
    getAppToken(code: $code)
  }
`;

const LOGIN_OAUTH = gql`
  mutation loginOAuth($input: CustomerAccountInput!) {
    loginOAuth(input: $input)
  }
`;

const REGISTER = gql`
  mutation signUp($input: CreateCustomerInput!) {
    signUp(input: $input) {
      id
      token
    }
  }
`;

const FORGOT_PASSWORD = gql`
  mutation passwordReset($password: String!, $session: String!) {
    passwordReset(password: $password, session: $session)
  }
`;

const LOGIN = gql`
  mutation signIn($password: String!, $phone: String!) {
    signIn(password: $password, phone: $phone) {
      token
    }
  }
`;

export const AUTH_MUTATION = {
  GET_APP_TOKEN,
  LOGIN_OAUTH,
  REGISTER,
  FORGOT_PASSWORD,
  LOGIN,
};
