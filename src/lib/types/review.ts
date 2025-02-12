export enum ReviewType {
  S = "S", //Service
  F = "F", //Food
  V = "V", //Vibe
  D = "D", //
  P = "P", //
  Q = "Q", //
}

export enum ReviewerType {
  C = "C", //Customer
}

export enum ReviewItemType {
  P = "P", //Product
  B = "B", //Branch
}

export interface ReviewInput {
  stars: number;

  type: ReviewType;

  item: string;

  itemType: ReviewItemType;

  reviewerType: ReviewerType;

  comment: string;
}

export interface Review {
  id: string;
  reviewerType: ReviewType;
  name: string;
  stars: number;
  type: ReviewerType;
  comment: string;
  createdAt: string;
  updatedAt: string;
}

export interface FetchReview {
  summary: ReviewSummary[];
  reviews: Review[];
  total: ReviewTotal;
}

export interface ReviewSummary {
  star: number;
  total: number;
  type: ReviewType;
}

export interface ReviewTotal {
  average: number;
  sum: number;
  stars: {
    count: number;
    total: number;
    star: number;
    percent: number;
  }[];
}
