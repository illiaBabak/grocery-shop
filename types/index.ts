export type FiltersType = {
  categories: string[];
  stars: number[];
  minPrice: number;
  maxPrice: number;
  sort: 'default' | 'price-asc' | 'price-desc' | 'rating-asc' | 'rating-desc';
  search: string;
};

export type CartItem = {
  id: string;
  imageUrl: string;
  name: string;
  price: number;
  quantity: number;
};

export type OrderItemType = {
  id: string;
  quantity: number;
};
