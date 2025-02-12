import { gql } from "@apollo/client";
import { SECTION_FIELDS } from "./section";
import { TABLE_FIELDS } from "./table";
import { TIMETABLE_FIELDS } from "./timetable";

export const EVENT_FIELDS = gql`
  fragment EventFields on Event {
    id
    name
    description
    type
    image
    upload
    images
    uploads
    priceType
    price
    advancePrice
    minGuests
    maxGuests
    duration
    startAt
    endAt
    channelId
    branch {
      id
      type
      name
      description
      services
      tags {
        id
        name
        icon
      }
      logo
      banner
      upload
      uploadBanner
      uploadBackground
      background
      country
      province
      district
      address
      phone
      email
      facebook
      instagram
      website
      latitude
      longitude
      timezone
      dayClose
      createdAt
      updatedAt
    }
    section {
      ...SectionFields
    }
    tables {
      ...TableFields
    }
    timetable {
      ...TimeTableFields
    }
    dates {
      total
      state
      date
    }
    channel {
      id
      advancePayment
      services
      waiter
      orderable
    }
  }
  ${SECTION_FIELDS}
  ${TABLE_FIELDS}
  ${TIMETABLE_FIELDS}
`;
