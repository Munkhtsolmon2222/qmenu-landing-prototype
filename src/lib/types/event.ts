import { Branch, Table } from "./branch";
import { IChannel } from "./channel";
import { ISection } from "./section";
import { ITimetable } from "./timetable";

export enum EventState {
  PENDING = "PENDING",
  ACTIVE = "ACTIVE",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
}

export enum EventType {
  HBD = "HBD", // Happy BirthDay
  HNY = "HNY", // Happy New Year
}

export enum EventPriceType {
  S = "S", // Set
  P = "P", // Price
}

export interface IEvent {
  id: string;
  name: string;
  description?: string;
  type: EventType;
  image?: string;
  upload?: string;
  images?: string[];
  uploads?: string[];
  priceType: EventPriceType;
  price: number;
  advancePrice: number;
  minGuests: number;
  maxGuests: number;
  section?: ISection;
  tables?: Table[];
  duration: number;
  timetable?: ITimetable;
  startAt: string;
  endAt: string;
  channelId?: string;
  dates?: EventDate[];
  branch?: Branch;
  channel?: IChannel;
}

export interface EventDate {
  total: number;
  date: string;
  state: string;
}

export interface IEventInput {
  name: string;
  description?: string;

  type: EventType;

  image?: string;
  upload?: string;
  images?: string[];
  uploads?: string[];

  priceType: EventPriceType;

  price: number;

  advancePrice: number;

  minGuests: number;
  maxGuests: number;

  section?: string;
  table?: string;

  duration: number;

  timetable?: string;

  startAt: string;

  endAt: string;
}

export const priceType: Record<EventPriceType, string> = {
  [EventPriceType.P]: "Хүн тус бүр",
  [EventPriceType.S]: "Багцын үнэ",
};
