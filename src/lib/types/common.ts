import { EsChannel } from './channel';
import { EsDiscount } from './discount';
import { IEvent } from './event';
import { ParamFilterObjType } from './filter';
import { EsProduct } from './food';
import { TagType } from './tag';

export class QueryError {
  message?: string;
  code?: string;
}

export interface ActionResponseType<T> {
  data?: T;
  error?: QueryError;
}

export interface EsTagType {
  value: string;
  type: TagType;
}

export interface EsQueryInput {
  tags?: EsTagType[];

  query?: string;
  keywords?: string[];
  productKeywords?: string[];
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

  prices?: [number, number];
  ratings?: [number, number];
}

export interface EsQueryResult {
  tagId?: string;
  name?: string;
  rank?: number;
  tagType?: string;
  afterKey?: string;
  channels?: EsChannel[];
  channelTotal?: number;
  products?: EsProduct[];
  productTotal?: number;
  events?: IEvent[];
  eventTotal?: number;
  discounts?: EsDiscount[];
  discountTotal?: number;
}

export interface EsQueryInputWithParams extends Partial<EsQueryInput> {
  params?: ParamFilterObjType;
}
