export enum Gender {
  Male = 'Male',
  Female = 'Female',
  Custom = 'Custom',
}

export interface Customer {
  id: string;
  phone: string;
  email: string;
  comment: string;
  gender: Gender;
  birthday: string;
  covers: string;
  createdAt: string;
  visitedAt: string;
  visits: number;
  spendPerCover: number;
  spendPerVisit: number;
  totalSpend: number;
  groups: Group[];
  firstName?: string;
  lastName?: string;
  fullName?: string;
  verified: boolean;
}

export interface Group {
  id: string;
  createdAt: string;
  updatedAt: string;
  members: Member[];
}

export interface Member {
  comment: string;
  covers: number;
  createdAt: string;
  gender: string;
  email: string;
  code?: string;
  guest: boolean;
  overallRating: string | number;
  phone: string;
  spendPerVisit: number;
  spendPerCover: number;
  totalReviews: number;
  totalSpend: number;
  updatedAt: string;
  visitedAt: string;
  visits: number;
  groups: Group[];
}

export interface IMemberCard {
  id: string;
  balance: number;
  number: string;
  firstName: string;
  lastName: string;
  card: string;
  groups: [];
}

export interface SignupReturnValue {
  id: string;
  token: string;
}
