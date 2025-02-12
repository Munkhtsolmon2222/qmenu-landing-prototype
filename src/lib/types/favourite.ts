import { Branch, Product } from "./branch";
import { Customer } from "./customer";

export interface Favourite {
  branch: Branch;
  product: Product;
  customer: Customer;
  type: string;
}

export enum FavouriteItemType {
  BRANCH = "BRANCH",
  PRODUCT = "PRODUCT",
}
