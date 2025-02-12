import { gql } from "@apollo/client";
import { TABLE_FIELDS } from "./table";

export const SECTION_FIELDS = gql`
  fragment SectionFields on Section {
    id
    name
    createdAt
    updatedAt
  }
`;

export const SECTION_INFO_FIELDS = gql`
  fragment SectionInfoFields on SectionInfo {
    id
    name
    availableTables
    available
    guests
    max
    tables {
      ...TableFields
      guests
      remained
    }
  }
  ${TABLE_FIELDS}
`;
