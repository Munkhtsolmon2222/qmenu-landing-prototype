import { gql } from '@apollo/client';
import { LOCATION_FIELDS } from '../fragment';

const GET_NEAREST_LOCATIONS = gql`
  query getNearestLocations($lat: Float!, $lon: Float!) {
    getNearestLocations(lat: $lat, lon: $lon) {
      ...LocationFields
    }
  }
  ${LOCATION_FIELDS}
`;

export const LOCATION_QUERY = {
  GET_NEAREST_LOCATIONS,
};
