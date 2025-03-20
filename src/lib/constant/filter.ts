import {
  BranchRate,
  BranchType,
  OrderType,
  ParamFilter,
  ParamFilterItem,
  ParamFilterType,
} from '../types';

export const ParamPrices: ParamFilterItem[] = [
  { name: BranchRate.Cheap, value: BranchRate.Cheap },
  { name: BranchRate.Moderate, value: BranchRate.Moderate },
  { name: BranchRate.Expensive, value: BranchRate.Expensive },
  { name: BranchRate.VeryExpensive, value: BranchRate.VeryExpensive },
];

export const ParamServices: ParamFilterItem[] = [
  { name: 'order.' + OrderType.PreOrder, value: OrderType.PreOrder },
  { name: 'order.' + OrderType.TableOrder, value: OrderType.TableOrder },
  { name: 'order.' + OrderType.TakeAway, value: OrderType.TakeAway },
  { name: 'order.' + OrderType.Delivery, value: OrderType.Delivery },
];

export const ParamTypes: ParamFilterItem[] = [
  { name: 'branchType.' + BranchType.Restaurant, value: BranchType.Restaurant },
  { name: 'branchType.' + BranchType.Pub, value: BranchType.Pub },
  { name: 'branchType.' + BranchType.Club, value: BranchType.Club },
  { name: 'branchType.' + BranchType.CoffeeShop, value: BranchType.CoffeeShop },
  { name: 'branchType.' + BranchType.Karaoke, value: BranchType.Karaoke },
  { name: 'branchType.' + BranchType.Hotel, value: BranchType.Hotel },
  { name: 'branchType.' + BranchType.Resort, value: BranchType.Resort },
];

export const ParamReviews: ParamFilterItem[] = [
  { name: '4.5 <', value: '5' },
  { name: '4.0 - 4.5', value: '4' },
  { name: '3.0 - 4.0', value: '3' },
  { name: '2.0 - 3.0', value: '2' },
];

export const ParamFilters: ParamFilterType[] = [
  {
    key: ParamFilter.CUISINE,
    name: 'Food type',
    placeholder: 'National food',
    single: true,
  },
  {
    key: ParamFilter.TAG,
    name: 'Advantage',
  },
  {
    key: ParamFilter.PRICE,
    name: 'Price',
    items: ParamPrices,
    single: true,
  },
  {
    key: ParamFilter.SERVICES,
    name: 'Order type',
    placeholder: 'Order type',
    items: ParamServices,
    valueTranslate: (val, t) => t(val),
    single: true,
  },
  {
    name: 'Organization',
    key: ParamFilter.TYPE,
    items: ParamTypes,
    valueTranslate: (val, t) => t(val),
    single: true,
  },
  {
    key: ParamFilter.CATEGORY,
    name: 'Category',
  },
  {
    key: ParamFilter.REVIEW,
    name: 'Ratings and comments',
    placeholder: 'Rating',
    single: true,
    items: ParamReviews,
    valueTranslate: (val, t) => '⭐ ' + t(val),
  },
];
