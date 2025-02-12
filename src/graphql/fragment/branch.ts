import { gql } from "@apollo/client";
import { TIMETABLE_FIELDS } from "./timetable";

export const BRANCH_FIELDS = gql`
  fragment BranchDetailFields on BranchDetail {
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

export const BRANCH_FIELDS1 = gql`
  fragment BranchFields on Branch {
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
    images
    star
    totalReviews
    distance
    warehouse {
      id
    }
    active
    timetable {
      ...TimeTableFields
    }
    timetableDelivery {
      ...TimeTableFields
    }
    languages
  }
  ${TIMETABLE_FIELDS}
`;
