'use client';

import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useGetFood } from '@/services/queries';
import { capitalize } from '@/utils/capitalize';
import Badge from './Badge';

const SORT_OPTIONS = [
  { value: 'default', label: 'Default Sorting' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating-asc', label: 'Rating: Low to High' },
  { value: 'rating-desc', label: 'Rating: High to Low' },
];

const MIN_PRICE_DEFAULT = 1;
const MAX_PRICE_DEFAULT = 50;

export default function ProductToolbar() {
  const { data: food } = useGetFood();

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const categories = searchParams.getAll('category');
  const stars = searchParams.getAll('star');
  const minPrice = Number(searchParams.get('min-price') ?? MIN_PRICE_DEFAULT);
  const maxPrice = Number(searchParams.get('max-price') ?? MAX_PRICE_DEFAULT);
  const sort = searchParams.get('sort') ?? 'default';

  const hasPriceFilter = minPrice !== MIN_PRICE_DEFAULT || maxPrice !== MAX_PRICE_DEFAULT;

  const hasAnyFilter = categories.length > 0 || stars.length > 0 || hasPriceFilter;

  const removeCategory = (category: string) => {
    const params = new URLSearchParams(searchParams.toString());

    const remaining = categories.filter((c) => c !== category);
    params.delete('category');
    remaining.forEach((c) => params.append('category', c));

    router.push(`${pathname}?${params.toString()}`);
  };

  const removeStar = (star: string) => {
    const params = new URLSearchParams(searchParams.toString());

    const remaining = stars.filter((s) => s !== star);
    params.delete('star');
    remaining.forEach((s) => params.append('star', s));

    router.push(`${pathname}?${params.toString()}`);
  };

  const removePrice = () => {
    const params = new URLSearchParams(searchParams.toString());

    params.delete('min-price');
    params.delete('max-price');

    router.push(`${pathname}?${params.toString()}`);
  };

  const clearAll = () => {
    const params = new URLSearchParams();

    if (sort !== 'default') params.set('sort', sort);

    router.push(`${pathname}?${params.toString()}`);
  };

  const onSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value === 'default') params.delete('sort');
    else params.set('sort', value);

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex flex-col gap-3 w-full pb-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          Found <span className="font-semibold text-gray-800">{food?.length ?? 0}</span> results
        </p>

        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Sort by :</span>
          <select
            value={sort}
            onChange={(e) => onSortChange(e.target.value)}
            className="text-sm font-medium text-gray-800 bg-transparent border-none focus:outline-none cursor-pointer"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {hasAnyFilter && (
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm text-gray-500 shrink-0">Active Filter</span>

          {categories.map((category) => (
            <Badge
              key={`badge-cat-${category}`}
              label={capitalize(category)}
              onRemove={() => removeCategory(category)}
            />
          ))}

          {hasPriceFilter && (
            <Badge label={`Price : $${minPrice}.00 - $${maxPrice}.00`} onRemove={removePrice} />
          )}

          {stars.map((star) => (
            <Badge
              key={`badge-star-${star}`}
              label={`${star} Star`}
              onRemove={() => removeStar(star)}
            />
          ))}

          <button
            onClick={clearAll}
            className="text-sm text-emerald-700 hover:text-emerald-900 font-medium ml-1 cursor-pointer transition-colors"
          >
            Clear All
          </button>
        </div>
      )}
    </div>
  );
}
