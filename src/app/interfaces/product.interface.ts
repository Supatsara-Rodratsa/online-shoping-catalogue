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

export interface Tab {
  name: string;
  quantity?: number;
}

export interface Pagination {
  currentPage: number;
  pageSize: number;
}

export interface FilterProduct {
  filterItems: Product[];
  totalItems: number;
}

export interface OrderPurchase {
  firstName: string;
  lastName: string;
  email: string;
  address: UserAddress;
  orderItems: Cart[];
  totalPrice: number;
}

interface UserAddress {
  country: string;
  address: string;
  zipCode: number;
  state?: string;
}
