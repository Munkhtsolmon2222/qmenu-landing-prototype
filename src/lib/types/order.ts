import { Branch } from "./branch";
import { Transaction } from "./transaction";

export enum OrderType {
  Dining = "Dining",
  PreOrder = "PreOrder",
  TakeAway = "TakeAway",
  Delivery = "Delivery",
  TableOrder = "TableOrder",
  Lunch = "Lunch",
  Event = "Event",
}

export enum OrderState {
  DRAFT = "DRAFT",
  NEW = "NEW",
  BOOKED = "BOOKED",
  ACCEPTED = "ACCEPTED",
  PREPARING = "PREPARING",
  PREPARED = "PREPARED",
  DELIVERING = "DELIVERING",
  DELIVERED = "DELIVERED",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
  RETURNED = "RETURNED",
  MOVED = "MOVED",
  REMOVED = "REMOVED",
  MERGED = "MERGED",
  CORRECTION = "CORRECTION",
  DECLINED = "DECLINED",
}

export interface OrderInput {
  type: OrderType;
  name?: string;
  address?: string;
  contact?: string;
  comment?: string;
  guests?: number;
  deliveryDate?: string;
  duration?: number;
  sectionId?: string;
  tableId?: string;
  items: OrderItemInput[];
  tables?: { guests: number; tableId: string }[];
  participants?: string[];
  event?: string;
  advance?: boolean;
}

export interface OrderItemInput {
  id: string;
  quantity: number;
  comment: string;
  options: OrderItemOptionInput[];
}

export interface OrderItemOptionInput {
  id: string;
  value: string;
}

export interface Order {
  id?: string;
  number: string;
  branch: Branch;
  date: string;
  type: string;
  contact: string;
  comment: string;
  deliveryDate: Date;
  customerId: string;
  address: string;
  isRead: boolean;
  name: string;
  channelType: string;
  memberId: string;
  items: OrderItem[];
  charges: OrderCharge[];
  transactions: Transaction[];
  totalAmount: number;
  discountAmount: number;
  discounts: OrderDiscount[];
  taxAmount: number;
  paidAmount: number;
  debtAmount: number;
  guests: number;
  grandTotal: number;
  state: OrderState;
  paymentState: string;
  createdAt: Date;
  updatedAt: Date;
  register: string;
  buyer: string;
  vatState: string;
  vatType: number;
  vatAmount: number;
  cityTax: number;
  vatBillId: string;
  vatDate: string;
  vatLottery: string;
  vatCode: string;
  vatData: string;
  phone?: string;
  acceptedAt: string;
  preparedAt: string;
  vatIncludeAmount: number;
  vatExcludeAmount: number;
  vats?: Vats[];
  tables?: OrderTable[];
}

export interface OrderTable {
  id: string;
  name: string;
}

export interface CustomerOrder {
  items: OrderItem[];
  totalAmount: number;
  grandTotal: number;
  totalQuantity: number;
  state: string;
}

export interface Vats {
  amount: number;
  buyer: string;
  citytax: number;
  createdAt: string;
  date: string;
  id: string;
  register: string;
  state;
  type;
  updatedAt: string;
}

export interface OrderCharge {
  id?: number;
  type;
  name: string;
  chargeId: string;
  calculation;
  state;
  amount: number;
  value: number;
}

export interface OrderDiscount {
  id?: number;
  type;
  name: string;
  calculation;
  amount?: number;
  state;
  discountId: string;
  value: number;
}

export interface OrderItemOptions {
  id: string;
  name: string;
  price: number;
  value;
  type: string;
}

export interface OrderItem {
  id?: string;
  uuid: string;
  name: string;
  quantity: number;
  comment?: string;
  price: number;
  discount: number;
  state: string;
  image: string;
  reason: string;
  productId?: string;
  // variant: IVariant;
  variantName?: string;
  options: OrderItemOptions[];
  createdAt?: Date;
  updatedAt?: Date;
  completedAt?: Date;
}
