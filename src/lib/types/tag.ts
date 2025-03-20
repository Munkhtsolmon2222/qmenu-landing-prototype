export interface Tag {
  id: string;
  name: string;
  type: string;
  icon: string;
  createdAt: string;
  updatedAt: string;
}

export enum TagType {
  K = 'K', // Kitchen
  B = 'B', // Brand
  S = 'S', // Supplier
  C = 'C', // Category
  P = 'P', // Product
  R = 'R', // Recipe
  F = 'F', // Feature
  W = 'W', // Web
}
