import { gql } from '@apollo/client';

const GET_SESSION = gql`
  mutation getSession($phone: String!, $type: SessionType!, $password: String) {
    getSession(phone: $phone, type: $type, password: $password)
  }
`;

const VERIFY_SESSION = gql`
  mutation verifySession($id: String!, $pin: String!) {
    verifySession(id: $id, pin: $pin)
  }
`;

const SESSION_VERIFY = gql`
  mutation sessionVerify($id: String!, $pin: String!) {
    sessionVerify(id: $id, pin: $pin) {
      token
      verified
    }
  }
`;

const UPDATE_PHONE = gql`
  mutation updatePhone($pin: String!, $session: String!) {
    updatePhone(pin: $pin, session: $session)
  }
`;

const UPDATE_PASSWORD = gql`
  mutation updatePassword($password: String!, $newPassword: String!) {
    updatePassword(password: $password, newPassword: $newPassword)
  }
`;

const UPDATE_EMAIL = gql`
  mutation updateEmail($input: EmailInput!) {
    updateEmail(input: $input)
  }
`;

const UPDATE_PROFILE = gql`
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

export const CUSTOMER_MUTATION = {
  GET_SESSION,
  VERIFY_SESSION,
  SESSION_VERIFY,
  UPDATE_PHONE,
  UPDATE_PASSWORD,
  UPDATE_EMAIL,
  UPDATE_PROFILE,
};
