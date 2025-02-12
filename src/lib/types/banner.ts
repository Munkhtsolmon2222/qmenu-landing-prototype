import { BannerType } from "../config/constant";

export interface BannerAction {
  id: string;
  text: string;
  url: string;
  icon: string;
  type: BannerActionType;
}

export interface Banner {
  id: string;
  name: string;
  description: string;
  startAt: string;
  endAt: string;
  system: string;
  type: BannerType;
  image: string;
  actions: BannerAction[];
}

export enum BannerActionType {
  L = "L", //Link
}
