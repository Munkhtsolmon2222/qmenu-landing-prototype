import { gql } from "@apollo/client";

export const GET_SESSION = gql`
  mutation getSession($phone: String!, $type: SessionType!, $password: String) {
    getSession(phone: $phone, type: $type, password: $password)
  }
`;

export const VERIFY_SESSION = gql`
  mutation verifySession($id: String!, $pin: String!) {
    verifySession(id: $id, pin: $pin)
  }
`;

export const SESSION_VERIFY = gql`
  mutation sessionVerify($id: String!, $pin: String!) {
    sessionVerify(id: $id, pin: $pin) {
      token
      verified
    }
  }
`;

export const UPDATE_PHONE = gql`
  mutation updatePhone($pin: String!, $session: String!) {
    updatePhone(pin: $pin, session: $session)
  }
`;

export const UPDATE_PASSWORD = gql`
  mutation updatePassword($password: String!, $newPassword: String!) {
    updatePassword(password: $password, newPassword: $newPassword)
  }
`;

export const UPDATE_EMAIL = gql`
  mutation updateEmail($input: EmailInput!) {
    updateEmail(input: $input)
  }
`;

export const UPDATE_PROFILE = gql`
  mutation updateProfile($input: ProfileInput!) {
    updateProfile(input: $input) {
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
