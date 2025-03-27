import { IEvent } from './event';
import { Payment } from './transaction';

export enum BranchType {
  Restaurant = 'Restaurant',
  Canteen = 'Canteen',
  Pub = 'Pub',
  Caffee = 'Caffee',
  Club = 'Club',
  CoffeeShop = 'CoffeeShop',
  Karaoke = 'Karaoke',
  Hotel = 'Hotel',
  Resort = 'Resort',
  Supplier = 'Supplier',
  Toki = 'Toki',
  Group = 'Group',
  Other = 'Other',
  Delivery = 'Delivery',
  FastFood = 'FastFood',
}

export enum BranchRate {
  Cheap = '$',
  Moderate = '$$',
  Expensive = '$$$',
  VeryExpensive = '$$$$',
}

export type TableInfo = {
  available: number;
  seated: number;
  total: number;
};

interface Tag {
  __typename: string;
  id: string;
  name: string;
}

export interface BranchMenu {
  id: string;
  name: string;
  description: string;
  __typename: string;
  categories: Category[];
}

export interface Participant {
  id: string;
  advancePayment: boolean;
  services: string[];
  vat: boolean;
  waiter: boolean;
  orderable: boolean;
  branch: Branch;
  payments: Payment[];
  menu: Menu;
  token: string;
  configs: Config[];
  events?: IEvent[];
  __typename: string;
}

export interface Config {
  name: string;
  value: string;
}

export interface ParticipantConfig {
  menuTheme?: string;
  hideImage?: boolean;
  loginRequired?: boolean;
}

export interface Menu {
  id: string;
  name: string;
  description: string;
  __typename: string;
  categories: Category[];
}

export interface Category {
  id: string;
  icon: string;
  color: string;
  name: string;
  sort: number;
  active: boolean;
  __typename: string;
  products: Product[];
  children: Category[];
}

export interface Product {
  id: string;
  name: string;
  description: string;
  bonus: string;
  specification: string;
  type: string;
  image: string;
  state: string;
  productId: string;
  withNote: boolean;
  adultsOnly: boolean;
  sort: number;
  __typename: string;
  variants: Variant[];
}

export interface Variant {
  id: string;
  name: string;
  price: number;
  state: string;
  salePrice: number;
  discount: number;
  unitType: string;
  unitValue: number;
  __typename: string;
  options?: Option[];
}

export interface Option {
  id: string;
  name: string;
  type: string;
  price: number;
  values: [];
  state: MenuItemState;
}

export enum MenuItemState {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  SOLD_OUT = 'SOLD_OUT',
}

export interface Branch {
  id: string;
  type: string;
  name: string;
  description: string;
  services: string[];
  tags: Tag[];
  logo: string;
  banner: null;
  upload: null;
  uploadBanner: null;
  uploadBackground: null;
  background: string;
  country: string;
  province: string;
  district: string;
  address: string;
  phone: string;
  email: string;
  facebook: string;
  instagram: string;
  website: string;
  latitude: number;
  longitude: number;
  timezone: string;
  dayClose: string;
  createdAt: string;
  updatedAt: string;
  images: string[];
  warehouse: null;
  active: boolean;
  timetable: Timetable;
  timetableDelivery: Timetable;
  languages: string[];
  star?: string;
  totalReviews?: number;
  distance?: number;
  rate?: string;
  __typename: string;
}

export interface Timetable {
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
}

interface Tag {
  id: string;
  name: string;
  icon?: string;
  __typename: string;
}

export interface SectionInfo {
  id: string;
  name: string;
  availableTables: number;
  available: number;
  guests: number;
  max: number;
  tables: Table[];
}

export interface SectionInfoTime {
  date: string;
  time: string;
  durations: number[];
}

export interface SectionInfoTimes {
  times: SectionInfoTime[];
  seatDuration: number;
}

export interface Table {
  id: string;
  code: string;
  name: string;
  description: string;
  min: number;
  max: number;
  shape: IShape;
  action: 'C' | 'U' | 'N' | 'D';
  active: boolean;
  guests: number;
  remained: number;
}

export interface IShape {
  type: string;
  x: number;
  y: number;
  width: number;
  height: number;
  radius: number;
  rotation: number;
}

export enum SHAPE_TYPES {
  RECT = 'rect',
  CIRCLE = 'circle',
}
