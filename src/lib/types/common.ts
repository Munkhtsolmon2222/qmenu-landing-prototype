import { EsChannel } from './channel';
import { EsDiscount } from './discount';
import { IEvent } from './event';

export class QueryError {
  message?: string;
  code?: string;
}

export interface ActionResponseType<T> {
  data?: T;
  error?: QueryError;
}

export interface EsQueryInput {
  keywords?: string[];
  lat?: number;
  lon?: number;
  distance?: string;

  limit?: number;
  offset?: number;

  size?: number;
  itemSize?: number;
  itemOffset?: number;
  afterKey?: string;

  types?: string[];
  services?: string[];
  categories?: string[];

  prices?: [number, number];
  ratings?: [number, number];
}

export interface EsQueryResult {
  name?: string;
  rank?: number;
  tagType?: string;
  afterKey?: string;
  channels?: EsChannel[]; // EsChannelType
  channelTotal?: number;
  products?: any[]; // EsProductType
  productTotal?: number;
  events?: IEvent[]; // EsEventType
  eventTotal?: number;
  discounts?: EsDiscount[]; // EsDiscountType
  discountTotal?: number;
}
