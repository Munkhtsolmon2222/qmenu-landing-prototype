import { gql } from '@apollo/client';
import { TIMETABLE_FIELDS } from './timetable';

export const ES_DISCOUNT_FIELDS = gql`
  fragment EsDiscountFields on EsDiscount {
    id
    name
    calculation
    type
    auto
    distance
    keywords
    image
    value
    setMaxAmount
    maxAmount
    buyX
    getY
    services
    allProducts
    categories
    allMembers
    groups
    setMinPrice
    minPrice
    setTimetable
    setDateRange
    startDate
    endDate
    startAt
    endAt
    buyProduct {
      id
      name
      price
      image
      variants {
        id
        name
        price
      }
    }
    buyVariant {
      id
      name
      price
    }
    getProduct {
      id
      name
      price
      image
      variants {
        id
        name
        price
      }
    }
    getVariant {
      id
      name
      price
    }
    channel {
      id
      name
      type
    }
    branch {
      id
      name
      active
      logo
      latitude
      longitude
      type
    }
    timetable {
      ...TimeTableFields
    }
  }
  ${TIMETABLE_FIELDS}
`;
