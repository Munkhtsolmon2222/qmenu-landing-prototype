import { gql } from '@apollo/client';
import { SECTION_INFO_FIELDS } from '../fragment';

const GET_SECTION_INFO = gql`
  query getSectionInfo($input: OrderInput) {
    getSectionInfo(input: $input) {
      ...SectionInfoFields
    }
  }
  ${SECTION_INFO_FIELDS}
`;

const GET_OPEN_TIMES = gql`
  query getOpenTimes($input: OrderInput) {
    getOpenTimes(input: $input) {
      times {
        time
        date
        #durations
      }
      seatDuration
    }
  }
`;

export const SECTION_QUERY = {
  GET_SECTION_INFO,
  GET_OPEN_TIMES,
};
