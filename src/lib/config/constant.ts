import { BranchListType, BranchType, OrderState, OrderType } from "../types";
export const QMENU_URL = "https://qr.qmenu.mn/qr";
import { StaticImageData } from "next/image";
export const SEAT_DURATION = 30;
export const TIME_FORMAT = "HH:mm";
export const DATE_FORMAT = "YYYY-MM-DD";
export const DATE_TIME_FORMAT = "YYYY-MM-DD HH:mm";
import Lunch from "@/assets/images/category-tags/lunch.png";
import HotDeals from "@/assets/images/category-tags/hotDeals.png";
import Breakfast from "@/assets/images/category-tags/breakfast.png";
import FastFood from "@/assets/images/category-tags/fastFood.png";
import Pizza from "@/assets/images/category-tags/pizza.png";
import Coffee from "@/assets/images/category-tags/coffee.png";
import Soup from "@/assets/images/category-tags/soup.png";
import Chicken from "@/assets/images/category-tags/chicken.png";
import Burger from "@/assets/images/category-tags/burger.png";
import Dessert from "@/assets/images/category-tags/dessert.png";
import HealthyFood from "@/assets/images/category-tags/healthyFood.png";
import Vegan from "@/assets/images/category-tags/vegan.png";
import Mongolia from "@/assets/images/category-tags/mongolia.png";
import Sushi from "@/assets/images/category-tags/sushi.png";
import Ramen from "@/assets/images/category-tags/ramen.png";
import Korea from "@/assets/images/category-tags/korea.png";
import China from "@/assets/images/category-tags/china.png";
import SeaFood from "@/assets/images/category-tags/seaFood.png";
import Skewer from "@/assets/images/category-tags/skewer.png";
import { icons } from "lucide-react";
export const CENTER = {
  lat: 47.918822,
  long: 106.917561,
};
export enum SystemType {
  C = "C", //Customer
  M = "M", //Merchant
  A = "A", //Administrator
  S = "S", //System
  T = "T", //Toki
  B = "B", //Buyer
  P = "P", //Partner
  MA = "MA", // Mbank App
}

export enum QPAY_BANK_TYPE {
  MBANK = "M bank",
  KHAAN_BANK = "Khan bank",
  SOCIAL_PAY = "Social Pay",
  BOGD_BANK = "Bogd bank",
  CAPITRON_BANK = "Capitron bank",
  CHINGIG_KHAAN_BANK = "Chinggis khaan bank",
  MOST_MONEY = "Most money",
  NATIONAL_INVESTMENT_BANK = "National investment bank",
  STATE_BANK = "State bank",
  TRADE_AND_DEVELOPMENT_BANK = "Trade and Development bank",
  KHAS_BANK = "Xac bank",
  MONPAY = "Monpay",
  ARIG_BANK = "Arig bank",
  ARD_APP = "Ard App",
  TRANS_BANK = "Trans bank",
}

export enum PAYMENT_TYPE {
  QPay = "QPay",
  QPay2 = "QPay2",
  MonPay = "MonPay",
  SocialPay = "SocialPay",
  Toki = "Toki",
  Cash = "Cash",
  Kart = "Card",
  Upoint = "Upoint",
  UPT = "UPT", //Upoint
  CTE = "CTE",
  MNQ = "MNQ",
  UNP = "UNP",
  VCR = "VCR",
  MBK = "MBK", // Mbank
}

export enum ChannelType {
  S = "S", //System
  P = "P", //Point of Sale
  Q = "Q", //QR Menu
  W = "W", //Web
  K = "K", //Kiosk
  A = "A", //Application
  T = "T", //Toki - Food Delivery
  F = "F", //Facebook
  G = "G", //Gastro
  C = "C", //FB Chat
  M = "M", //Monpay
  U = "U", //UBEats
  I = "I", //API
  MR = "MR", // Market
  MB = "MB", // MBank
  QM = "QM", // Qmenu
}

export enum PaymentType {
  Cash = "Cash", //CSH
  Card = "Card", //CRD
  QPay = "QPay", //QPY
  QPay2 = "QPay2", //QPY v2
  MonPay = "MonPay", //MNP
  SocialPay = "SocialPay", //SLP
  Toki = "Toki", //TKI
  Account = "Account", //ACC
  Invoice = "Invoice", //INV
  Upoint = "Upoint", //UPT

  UPT = "UPT", //U-Point
  CSH = "CSH", //Cash
  CRD = "CRD", //Card
  GLP = "GLP", //GLMTPOS
  QPY = "QPY", //QPay
  QP2 = "QP2", //QPay v2
  MNP = "MNP", //MonPay
  MNQ = "MNQ", //MonPay QR
  SLP = "SLP", //SocialPay
  TKI = "TKI", //Toki
  TKL = "TKL", //Toki lunch
  TKP = "TKP", //Toki promo
  CUP = "CUP", //Coupon
  VCR = "VCR", //Voucher
  GFT = "GFT", //Gift Card
  LOY = "LOY", //Loyalty
  CTE = "CTE", //Canteen employee
  MBK = "MBK", //M-Bank
  UNP = "UNP", //UnionPay
  UBE = "UBE", //UBEats
}

export const PartnerObjType: {
  [k in SystemType]?: {
    type: SystemType;
    channel: ChannelType;
    payment: PaymentType;
    name: string;
    menu: string;
  };
} = {
  [SystemType.MA]: {
    type: SystemType.MA,
    channel: ChannelType.MB,
    payment: PaymentType.MBK,
    name: "Mbank",
    menu: "B",
  },
};

export enum CustomerAccountType {
  TKI = "TKI", //Toki
  UPT = "UPT", //U-Point
  MNP = "MNP", //Monpay
}

export enum LoyaltyType {
  U = "U", //U-point
}

export enum BannerType {
  M = "M", //Mid
  F = "F", //Footer
  E = "E", //End
  P = "P", //Popup
  A = "A", //After
  PF = "PF", //Popup full image
  PQ = "PQ", //Popup QR Menu
}

export const BRANCH_LIST_TYPE = new Map<BranchListType, string>([
  [BranchListType.FEATURED, "Онцгой"],
  [BranchListType.LIKED, "Таалагдсан"],
  [BranchListType.NEAR, "Ойрхон"],
  [BranchListType.REVIEW, "Өндөр үнэлгээтэй"],
]);

export const BRANCH_TYPES = new Map<BranchType, string>([
  [BranchType.Restaurant, "Ресторан"],
  [BranchType.Pub, "Паб"],
  [BranchType.Club, "Клуб"],
  [BranchType.CoffeeShop, "Кофе шоп"],
  [BranchType.Karaoke, "Караоке"],
  [BranchType.Hotel, "Зочид буудал"],
  [BranchType.Resort, "Амралтын газар"],
]);

export const ORDER_STATES = new Map<OrderState, string>([
  [OrderState.BOOKED, "Урьдчилсан"],
  [OrderState.NEW, "Идэвхтэй"],
  [OrderState.COMPLETED, "Дууссан"],
]);

export enum SessionType {
  R = "R", //Registration
  P = "P", //Password reset
  C = "C", //Change phone
  M = "M", //Merchant password reset
  T = "T", //Toki password reset
}
export const ORDERS = new Map<string, string>([
  [OrderType.PreOrder, "Урьдчилан захиалах"],
  [OrderType.TableOrder, "Ширээ захиалах"],
  [OrderType.TakeAway, "Очиж авах"],
  [OrderType.Delivery, "Хүргэлт"],
]);

export const ALL_ORDER = new Map<string, string>([["All", "Бүгд"]]);

export const ALL_ORDERS_ARRAY = Array.from(ALL_ORDER.entries()).map(
  ([key, value]) => ({ type: key, label: value })
);
export const ORDERS_ARRAY = Array.from(ORDERS.entries()).map(
  ([key, value]) => ({ type: key, label: value, t: `order.${key}` })
);

export const BRANCHES = Array.from(BRANCH_TYPES.entries()).map(
  ([key, value]) => ({
    name: value,
    label: value,
    key: key,
    text: `branchType.${key}`,
    icons: value,
  })
);

export type BranchesType = typeof BRANCHES;

export const CUISINES = [
  { name: "Монгол", text: "cuisine.mongolian", pic: "mongolia.jpg" },
  { name: "Солонгос", text: "cuisine.korean", pic: "mexican.jpg" },
  { name: "Хятад", text: "cuisine.chinese", pic: "mongolia.jpg" },
  { name: "Япон", text: "cuisine.japanese", pic: "mongolia.jpg" },
  { name: "Итали", text: "cuisine.italian", pic: "italian.jpg" },
  { name: "Мексик", text: "cuisine.mexican", pic: "mexican.jpg" },
];

export interface Tag {
  id: string;
  name: string;
  type: string;
  icon: null;
  createdAt: string;
  updatedAt: string;
}
export interface categoryItem {
  Lunch: string;
  HotDeals: string;
  Breakfast: string;
  FastFood: string;
  Pizza: string;
  Coffee: string;
  Soup: string;
  Chicken: string;
  Burger: string;
  Dessert: string;
  HealthyFood: string;
  Vegan: string;
  Mongolia: string;
  Sushi: string;
  Ramen: string;
  Korea: string;
  China: string;
  SeaFood: string;
  Skewer: string;
}
export enum TagType {
  K = "K", // Kitchen
  B = "B", // Brand
  S = "S", // Supplier
  C = "C", // Category
  P = "P", // Product
  R = "R", // Recipe
  F = "F", // Feature
}

export const TagTypes = [
  { name: "Төрөл", value: TagType.K },
  { name: "Нийлүүлэгч", value: TagType.S },
  { name: "Брэнд", value: TagType.B },
  { name: "Ангилал", value: TagType.C },
  { name: "Бүтээгдэхүүн", value: TagType.P },
  { name: "Орц", value: TagType.R },
  { name: "Онцлох", value: TagType.F },
];

export const categoryItems: Record<string, StaticImageData> = {
  Lunch: Lunch,
  HotDeals: HotDeals,
  Breakfast: Breakfast,
  FastFood: FastFood,
  Pizza: Pizza,
  Coffee: Coffee,
  Soup: Soup,
  Chicken: Chicken,
  Burger: Burger,
  Dessert: Dessert,
  HealthyFood: HealthyFood,
  Vegan: Vegan,
  Mongolia: Mongolia,
  Sushi: Sushi,
  Ramen: Ramen,
  Korea: Korea,
  China: China,
  SeaFood: SeaFood,
  Skewer: Skewer,
};
