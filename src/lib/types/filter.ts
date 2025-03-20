import { TFunction } from 'i18next';

export enum ParamFilter {
  CUISINE = 'cuisines',
  TAG = 'tags',
  PRICE = 'price',
  TYPE = 'types',
  CATEGORY = 'categories',
  REVIEW = 'review',
  SERVICES = 'services',
}

export interface ParamFilterObjType {
  [ParamFilter.CUISINE]?: string | string[];
  [ParamFilter.TAG]?: string | string[];
  [ParamFilter.PRICE]?: string | string[];
  [ParamFilter.TYPE]?: string | string[];
  [ParamFilter.CATEGORY]?: string | string[];
  [ParamFilter.REVIEW]?: string | string[];
  [ParamFilter.SERVICES]?: string | string[];
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
