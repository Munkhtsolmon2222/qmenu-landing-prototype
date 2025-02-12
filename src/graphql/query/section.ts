import { gql } from "@apollo/client";
import { SECTION_INFO_FIELDS } from "../fragment";

export const GET_SECTION_INFO = gql`
  query getSectionInfo($input: OrderInput) {
    getSectionInfo(input: $input) {
      ...SectionInfoFields
    }
  }
  ${SECTION_INFO_FIELDS}
`;

export const GET_OPEN_TIMES = gql`
  query getOpenTimes($input: OrderInput) {
    getOpenTimes(input: $input) {
      times {
        time
        date
      }
      durations
      seatDuration
    }
  }
`;
