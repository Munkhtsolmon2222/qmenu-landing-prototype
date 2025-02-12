import { gql } from "@apollo/client";

export const LOCATION_FIELDS = gql`
  fragment LocationFields on Location {
    id
    type
    code
    name
    nameEn
    address
    description
    photo
    floor
    lat
    lon
    keywords
  }
`;
