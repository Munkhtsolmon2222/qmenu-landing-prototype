import { EsChannel } from './channel';

export interface EsProduct {
  id: string;
  name: string;
  price: string;
  channel: string;
  branch: EsChannel;
  description?: string;
  star?: number;
  totalReviews?: number;
  image?: string;
  specification?: string;
}

export interface Rating {
  score: number;
  reviews: number;
}
