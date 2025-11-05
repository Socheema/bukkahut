export interface Item {
  id: number | string;
  name: string;
  price: string | number;
  description?: string;
  image?: string;
  quantity?: number;
}

export interface Order {
  id: number;
  items: Item[];
  date: string;
  status: string;
}

export type AddToCartFn = (item: Item) => void;
