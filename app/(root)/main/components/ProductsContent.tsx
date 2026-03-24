'use client';

import { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { useGetFood } from '@/services/queries';
import ProductToolbar from './ProductToolbar';
import ProductList from './ProductList';
import { Filters } from '@/types';

const MIN_PRICE_DEFAULT = 1;
const MAX_PRICE_DEFAULT = 50;

export default function ProductsContent() {
  const searchParams = useSearchParams();

  const filters: Filters = useMemo(() => {
    return {
      categories: searchParams.getAll('category'),
      stars: searchParams.getAll('star').map(Number),
      minPrice: Number(searchParams.get('min-price') ?? MIN_PRICE_DEFAULT),
      maxPrice: Number(searchParams.get('max-price') ?? MAX_PRICE_DEFAULT),
      sort: (searchParams.get('sort') as Filters['sort']) ?? 'default',
      search: searchParams.get('search') ?? '',
    };
  }, [searchParams]);

  const { data: food = [], isLoading } = useGetFood(filters);

  return (
    <div className="flex flex-col w-full lg:flex-1 min-w-0">
      <ProductToolbar foodCount={food.length} filters={filters} />

      <ProductList food={food} isLoading={isLoading} />
    </div>
  );
}
