import { gql } from '@apollo/client';

export const ES_CHANNEL_FIELDS = gql`
  fragment EsChannelFields on EsChannel {
    id
    name
    branch
    tags
    services
    star
    totalReviews
    image
    logo
    distance
    open
    type
    description
    rate
  }
`;
