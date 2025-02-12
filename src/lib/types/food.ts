import { BranchDetail } from "./branch";

export interface Food {
  id: string;
  name: string;
  price: string;
  channel: string;
  description: string;
  star: number;
  totalReviews: number;
  branch: BranchDetail;
  image: string;
}

export interface Rating {
  score: number;
  reviews: number;
}
