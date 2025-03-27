export enum DiscountType {
  C = 'C', // Custom
  FLD = 'FLD', // Flash deals
  BOGO = 'BOGO', // Buy one get one
  LTD = 'LTD', // Limited time deals
  BND = 'BND', // Bundle deals
  SPO = 'SPO', // Special offers
  HOT = 'HOT', // Hot deals
}

export enum Calculation {
  P = 'P', //Percent
  C = 'C', //Constant
  B = 'B', //Buy X Get Y
}

export interface EsDiscount {
  id: string;
  name: string;
  calculation: Calculation;
  type: DiscountType;
  auto: boolean;
  distance: number;
  keywords: string[];
  image: string;
  value: number;
  setMaxAmount: boolean;
  maxAmount: number;
  buyX: number;
  getY: number;
  services: string[];
  allProducts: boolean;
  categories: string[];
  allMembers: boolean;
  groups: string[];
  setMinPrice: boolean;
  minPrice: number;
  setTimetable: boolean;
  setDateRange: boolean;
  startDate: string;
  endDate: string;
  startAt: string;
  endAt: string;
  buyProduct: {
    id: string;
    name: string;
    price: number;
    image: string;
    variants?: {
      id: string;
      name: string;
      price: number;
    }[];
  };
  buyVariant: {
    id: string;
    name: string;
    price: number;
  };
  getProduct: {
    id: string;
    name: string;
    price: number;
    image: string;
    variants?: {
      id: string;
      name: string;
      price: number;
    }[];
  };
  getVariant: {
    id: string;
    name: string;
    price: number;
  };
  channel: {
    id: string;
    name: string;
    type: string;
  };
  timetable: {
    mon: boolean;
    monOpen: string;
    monClose: string;
    tue: boolean;
    tueOpen: string;
    tueClose: string;
    wed: boolean;
    wedOpen: string;
    wedClose: string;
    thu: boolean;
    thuOpen: string;
    thuClose: string;
    fri: boolean;
    friOpen: string;
    friClose: string;
    sat: boolean;
    satOpen: string;
    satClose: string;
    sun: boolean;
    sunOpen: string;
    sunClose: string;
  };
  branch: {
    id: string;
    name: string;
    active: boolean;
    logo: string;
    latitude: number;
    longitude: number;
  };
}
