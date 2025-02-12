import { gql } from "@apollo/client";
import { EVENT_FIELDS } from "../fragment";

export const GET_EVENT = gql`
  query getEvent($id: ID!, $times: Boolean) {
    getEvent(id: $id, times: $times) {
      ...EventFields
    }
  }
  ${EVENT_FIELDS}
`;

export const FILTER_EVENTS = gql`
  query filterEvents($filters: [String!], $limit: Int, $offset: Int) {
    filterEvents(filters: $filters, limit: $limit, offset: $offset) {
      ...EventFields
    }
  }
  ${EVENT_FIELDS}
`;
