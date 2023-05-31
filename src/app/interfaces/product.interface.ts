export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  category: string;
  rating?: Rating;
}

interface Rating {
  rate: number;
  count: number;
}

export interface Cart extends Product {
  quantity: number;
  isUpdated?: boolean;
}
