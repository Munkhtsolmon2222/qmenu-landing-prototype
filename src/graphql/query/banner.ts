import { gql } from '@apollo/client';
import { BANNER_FIELDS } from '../fragment';

const GET_BANNERS = gql`
  query getBanners {
    getBanners {
      ...BannerFields
    }
  }
  ${BANNER_FIELDS}
`;

export const BANNER_QUERY = {
  GET_BANNERS,
};
