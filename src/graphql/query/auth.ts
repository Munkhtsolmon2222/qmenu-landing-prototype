import { gql } from '@apollo/client';

const CURRENT_TOKEN = gql`
  mutation getToken($code: String, $type: ChannelType!, $token: String, $systemType: SystemType) {
    getToken(code: $code, type: $type, token: $token, systemType: $systemType) {
      token
      id
    }
  }
`;

const GET_CHANNEL_TOKEN = gql`
  mutation getChannelToken($id: ID!, $type: SystemType) {
    getChannelToken(id: $id, type: $type) {
      id
      token
    }
  }
`;

export const TOKEN_QUERY = {
  CURRENT_TOKEN,
  GET_CHANNEL_TOKEN,
};
