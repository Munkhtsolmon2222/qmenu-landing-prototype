import { gql } from '@apollo/client';
import { BRANCH_FIELDS, LOCATION_FIELDS, PRODUCDETAIL_FIELDS } from '../fragment';

const GET_NEAR_BRANCHES = gql`
  query getNearMeBranches($lat: Float!, $lon: Float!, $type: String) {
    getNearMeBranches(lat: $lat, lon: $lon, type: $type) {
      ...BranchDetailFields
      tableInfo {
        total
        seated
        available
      }
      latitude
      longitude
    }
  }
  ${BRANCH_FIELDS}
`;

const FILTER_BRANCHES = gql`
  query filterBranches(
    $filters: [String!]
    $lat: Float!
    $lon: Float!
    $limit: Int
    $offset: Int
    $distance: String
  ) {
    filterBranches(
      filters: $filters
      lat: $lat
      lon: $lon
      limit: $limit
      offset: $offset
      distance: $distance
    ) {
      ...BranchDetailFields
      tableInfo {
        total
        seated
        available
      }
      latitude
      longitude
      address
    }
  }
  ${BRANCH_FIELDS}
`;

const FILTER_PRODUCTS = gql`
  query filterProducts($filters: [String!]) {
    filterProducts(filters: $filters) {
      ...ProductDetailFields
      branch {
        ...BranchDetailFields
        tableInfo {
          total
          seated
          available
        }
        latitude
        longitude
      }
    }
  }
  ${PRODUCDETAIL_FIELDS}
  ${BRANCH_FIELDS}
`;

const FILTER_RESULT = gql`
  query filterResult(
    $filters: [String!]
    $branchFilters: [String!]
    $lat: Float!
    $lon: Float!
    $limit: Int
    $offset: Int
    $distance: String
  ) {
    filterResult(
      filters: $filters
      branchFilters: $branchFilters
      lat: $lat
      lon: $lon
      limit: $limit
      offset: $offset
      distance: $distance
    ) {
      branches {
        ...BranchDetailFields
        tableInfo {
          total
          seated
          available
        }
        latitude
        longitude
      }
      branchTotal
      products {
        ...ProductDetailFields
        branch {
          ...BranchDetailFields
          tableInfo {
            total
            seated
            available
          }
        }
      }
      productTotal
    }
  }
  ${PRODUCDETAIL_FIELDS}
  ${BRANCH_FIELDS}
`;

const GET_NEAREST_LOCATIONS = gql`
  query getNearestLocations($lat: Float!, $lon: Float!) {
    getNearestLocations(lat: $lat, lon: $lon) {
      ...LocationFields
    }
  }
  ${LOCATION_FIELDS}
`;

export const LOCATION_QUERY = {
  GET_NEAR_BRANCHES,
  FILTER_BRANCHES,
  FILTER_PRODUCTS,
  FILTER_RESULT,
  GET_NEAREST_LOCATIONS,
};
