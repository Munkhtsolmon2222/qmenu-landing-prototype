import { gql } from "@apollo/client";

export const GET_APP_TOKEN = gql`
  mutation getAppToken($code: String!) {
    getAppToken(code: $code)
  }
`;

export const LOGIN_OAUTH = gql`
  mutation loginOAuth($input: CustomerAccountInput!) {
    loginOAuth(input: $input)
  }
`;
export const REGISTER = gql`
  mutation signUp($input: CreateCustomerInput!) {
    signUp(input: $input) {
      id
      token
    }
  }
`;

export const FORGOT_PASSWORD = gql`
  mutation passwordReset($password: String!, $session: String!) {
    passwordReset(password: $password, session: $session)
  }
`;

export const LOGIN = gql`
  mutation signIn($password: String!, $phone: String!) {
    signIn(password: $password, phone: $phone) {
      token
    }
  }
`;
