import { PaymentType } from '../constant';

export interface Transaction {
  id?: string;
  type: string;
  token: string;
  amount: number;
  currency: string;
  state: string;
  entry: string;
  description: string;
  comment: string;
  createdAt: Date;
  updatedAt: Date;
  links: TransactionLink[];
  payment: Payment;
  image: string;
  code: string;
}

export interface Payment {
  id: string;
  name: string;
  type: PaymentType;
  active: boolean;
}

export interface TransactionLink {
  name: string;
  description: string;
  log: string;
  link: string;
}

export interface TransactionInput {
  order: string;
  confirm: boolean;
  payment: string;
  amount?: number;
  vatType: number;
  register: string;
  buyer: string;
  code: string;
}
