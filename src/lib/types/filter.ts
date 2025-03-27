import { TFunction } from 'i18next';
import { TagType } from './tag';

export enum ParamFilter {
  CUISINE = 'cuisines',
  TAG = 'tags',
  PRICE = 'price',
  TYPE = 'types',
  CATEGORY = 'categories',
  REVIEW = 'review',
  SERVICES = 'services',
  DISCOUNT = 'discount',
  WEB = 'web',
}

export interface ParamFilterObjType {
  [ParamFilter.CUISINE]?: string | string[];
  [ParamFilter.TAG]?: string | string[];
  [ParamFilter.PRICE]?: string | string[];
  [ParamFilter.TYPE]?: string | string[];
  [ParamFilter.CATEGORY]?: string | string[];
  [ParamFilter.REVIEW]?: string | string[];
  [ParamFilter.SERVICES]?: string | string[];
  [ParamFilter.WEB]?: string | string[];
}

export interface ParamFilterType {
  name?: string;
  placeholder?: string;
  key: ParamFilter;
  single?: boolean;
  valueTranslate?: (name: string, t: TFunction) => string;
  items?: ParamFilterItem[];
}

export interface ParamFilterItem {
  name: React.ReactNode;
  value: string;
  active?: boolean;
}

export const ParamsTagType: Partial<Record<ParamFilter, TagType>> = {
  [ParamFilter.CUISINE]: TagType.K,
  [ParamFilter.TAG]: TagType.F,
  [ParamFilter.CATEGORY]: TagType.C,
  [ParamFilter.WEB]: TagType.W,
};
