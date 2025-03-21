import { EsChannel } from './channel';

export interface EsProduct {
  id: string;
  name: string;
  price: string;
  channel: string;
  description: string;
  star: number;
  totalReviews: number;
  branch: EsChannel;
  image: string;
}

export interface Rating {
  score: number;
  reviews: number;
}
