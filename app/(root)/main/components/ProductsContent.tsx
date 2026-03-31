'use client';

import { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { useGetFood } from '@/services/queries';
import ProductToolbar from './ProductToolbar';
import { FiltersType } from '@/types';
import Loader from '@/components/Loader';
import Product from './Product';

const MIN_PRICE_DEFAULT = 1;
const MAX_PRICE_DEFAULT = 50;

export default function ProductsContent() {
  const searchParams = useSearchParams();

  const filters: FiltersType = useMemo(() => {
    return {
      categories: searchParams.getAll('category'),
      stars: searchParams.getAll('star').map(Number),
      minPrice: Number(searchParams.get('min-price') ?? MIN_PRICE_DEFAULT),
      maxPrice: Number(searchParams.get('max-price') ?? MAX_PRICE_DEFAULT),
      sort: (searchParams.get('sort') as FiltersType['sort']) ?? 'default',
      search: searchParams.get('search') ?? '',
    };
  }, [searchParams]);

  const { data: food = [], isLoading } = useGetFood(filters);

  return (
    <div className="flex flex-col w-full lg:flex-1 min-w-0">
      <ProductToolbar foodCount={food.length} filters={filters} />

      <div className="relative flex-1 h-full w-full overflow-y-auto">
        {isLoading && (
          <div className="absolute bottom-4 right-4 z-10">
            <Loader />
          </div>
        )}
        <div className="grid grid-cols-1 min-[480px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-5 p-1">
          {food.map((item, foodIndex) => (
            <Product key={`${item.id}-${foodIndex}-food`} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
