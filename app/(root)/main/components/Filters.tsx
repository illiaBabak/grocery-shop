'use client';

import { CATEGORIES } from '@/utils/constants';
import { capitalize } from '@/utils/capitalize';
import { useEffect, useState } from 'react';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';

const STARS = [5, 4, 3, 2, 1];

const MIN_PRICE = 1;
const MAX_PRICE = 50;

export default function Filters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const categories = searchParams.getAll('category');

  const [selectedCategories, setSelectedCategories] = useState<string[]>(categories);
  const [minPrice, setMinPrice] = useState(MIN_PRICE);
  const [maxPrice, setMaxPrice] = useState(MAX_PRICE);
  const [selectedStars, setSelectedStars] = useState<number[]>([]);

  const toggleCategory = (title: string) => {
    setSelectedCategories((prev) =>
      prev.includes(title) ? prev.filter((c) => c !== title) : [...prev, title]
    );
  };

  const toggleStar = (star: number) => {
    setSelectedStars((prev) =>
      prev.includes(star) ? prev.filter((s) => s !== star) : [...prev, star]
    );
  };

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    params.delete('category');

    selectedCategories.forEach((category) => params.append('category', category));

    params.set('min-price', minPrice.toString());

    params.set('max-price', maxPrice.toString());

    params.delete('star');

    selectedStars.forEach((star) => params.append('star', star.toString()));

    router.push(`${pathname}?${params.toString()}`);
  }, [minPrice, maxPrice, selectedCategories, selectedStars]);

  return (
    <aside className="flex flex-col gap-0 w-[20%] shrink-0 h-fit">
      <h2 className="text-lg font-bold text-gray-900 mb-4">Filter Options</h2>

      {/* Categories */}
      <div className="border-t border-gray-200 py-4">
        <h3 className="text-sm font-semibold text-gray-800 mb-3">By Categories</h3>
        <div className="flex flex-col gap-2">
          {CATEGORIES.map((category) => (
            <label
              key={`${category.title}-category-filter`}
              className="flex items-center gap-2.5 cursor-pointer group"
            >
              <input
                type="checkbox"
                checked={selectedCategories.includes(category.title)}
                onChange={() => toggleCategory(category.title)}
                className="w-4 h-4 rounded border-gray-300 text-emerald-500 focus:ring-emerald-400 cursor-pointer"
              />
              <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
                {capitalize(category.title)}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Price */}
      <div className="border-t border-gray-200 py-4">
        <h3 className="text-sm font-semibold text-gray-800 mb-3">Price</h3>
        <p className="text-sm text-gray-500 mb-3">
          ${minPrice}.00 – ${maxPrice}.00
        </p>
        <div className="relative h-1.5">
          <div className="absolute inset-0 rounded-full bg-gray-200" />
          <div
            className="absolute top-0 h-full rounded-full bg-emerald-500"
            style={{
              left: `${((minPrice - 1) / (MAX_PRICE - 1)) * 100}%`,
              right: `${100 - ((maxPrice - 1) / (MAX_PRICE - 1)) * 100}%`,
            }}
          />
          <input
            type="range"
            min={MIN_PRICE}
            max={MAX_PRICE}
            value={minPrice}
            onChange={({ currentTarget: { value } }) =>
              setMinPrice(Math.min(Number(value), maxPrice - 1))
            }
            className="absolute inset-0 w-full appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-emerald-500 [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow [&::-webkit-slider-thumb]:cursor-pointer"
          />
          <input
            type="range"
            min={MIN_PRICE}
            max={MAX_PRICE}
            value={maxPrice}
            onChange={({ currentTarget: { value } }) =>
              setMaxPrice(Math.max(Number(value), minPrice + 1))
            }
            className="absolute inset-0 w-full appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-emerald-500 [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow [&::-webkit-slider-thumb]:cursor-pointer"
          />
        </div>
      </div>

      {/* Review */}
      <div className="border-t border-gray-200 py-4">
        <h3 className="text-sm font-semibold text-gray-800 mb-3">Review</h3>
        <div className="flex flex-col gap-2">
          {STARS.map((star) => (
            <label
              key={`${star}-star-filter`}
              className="flex items-center gap-2.5 cursor-pointer group"
            >
              <input
                type="checkbox"
                checked={selectedStars.includes(star)}
                onChange={() => toggleStar(star)}
                className="w-4 h-4 rounded border-gray-300 text-emerald-500 focus:ring-emerald-400 cursor-pointer"
              />
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }, (_, i) => (
                  <svg
                    key={`${star}-star-${i}-icon`}
                    className={`w-4 h-4 ${i < star ? 'text-yellow-400' : 'text-gray-300'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="text-sm text-gray-500 ml-1">{star} Star</span>
              </div>
            </label>
          ))}
        </div>
      </div>
    </aside>
  );
}
