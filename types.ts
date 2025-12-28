export interface ProductVariant {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  images?: string[];
  video?: string;
  hasOffer?: boolean;
  offerBadge?: string;
  variants?: ProductVariant[];
}
