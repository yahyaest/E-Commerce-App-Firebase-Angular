export interface Product {
  title: string;
  slug: string;
  price: string;
  last_update: string;
  inventory: number;
  description: any;
  images: any;
  collection_id: number;
}

export type Collection = { [name: string]: Product[] };
