export type Filters = {
  categories: string[];
  stars: number[];
  minPrice: number;
  maxPrice: number;
  sort: 'default' | 'price-asc' | 'price-desc' | 'rating-asc' | 'rating-desc';
  search: string;
};
