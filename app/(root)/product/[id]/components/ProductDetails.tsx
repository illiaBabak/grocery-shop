'use client';

import { useState } from 'react';
import { Food } from '@/generated/prisma/client';

const WEIGHT_OPTIONS = [1, 3, 5, 10] as const;
type Weight = (typeof WEIGHT_OPTIONS)[number];

export default function ProductDetails({ food }: { food: Food }) {
  const [selectedWeight, setSelectedWeight] = useState<Weight>(1);
  const totalPrice = food.priceBy1kg * selectedWeight;

  return (
    <div className="flex flex-col gap-6">
      {/* Category */}
      <span className="inline-block w-fit px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full bg-emerald-100 text-emerald-700 border border-emerald-200">
        {food.category}
      </span>

      {/* Name */}
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">{food.name}</h1>

      {/* Rating */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-0.5">
          {Array.from({ length: 5 }, (_, i) => (
            <svg
              key={`${food.id}-${i}-star`}
              className={`w-5 h-5 ${
                i < Math.round(food.rating) ? 'text-amber-400' : 'text-gray-200'
              }`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
        <span className="text-sm font-medium text-gray-600">
          {food.rating > 0 ? food.rating.toFixed(1) : 'No rating'}
        </span>
        <span className="text-sm text-gray-400">
          ({food.reviewsCount} {food.reviewsCount === 1 ? 'review' : 'reviews'})
        </span>
      </div>

      {/* Description */}
      <p className="text-gray-500 leading-relaxed text-base">{food.description}</p>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

      {/* Price per kg */}
      <div className="flex items-baseline gap-2">
        <span className="text-sm text-gray-400 font-medium">Price per kg:</span>
        <span className="text-lg font-semibold text-gray-700">${food.priceBy1kg.toFixed(2)}</span>
      </div>

      {/* Weight selector */}
      <div className="flex flex-col gap-3">
        <span className="text-sm font-medium text-gray-600">Select weight:</span>
        <div className="flex flex-wrap gap-2.5">
          {WEIGHT_OPTIONS.map((weight, index) => {
            const isSelected = selectedWeight === weight;
            return (
              <button
                key={`${food.id}-${index}-weight-${weight}`}
                onClick={() => setSelectedWeight(weight)}
                className={`
                  relative px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer
                  ${
                    isSelected
                      ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-200 scale-105'
                      : 'bg-white/60 text-gray-600 border border-gray-200 hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700'
                  }
                `}
              >
                {weight} kg
                {isSelected && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-white rounded-full flex items-center justify-center shadow">
                    <svg
                      className="w-2.5 h-2.5 text-emerald-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Total price */}
      <div className="flex items-baseline gap-3">
        <span className="text-3xl font-bold text-emerald-600">${totalPrice.toFixed(2)}</span>
        <span className="text-sm text-gray-400">for {selectedWeight} kg</span>
      </div>

      {/* Add to Cart */}
      <button className="group flex items-center justify-center gap-3 w-full sm:w-auto px-10 py-4 bg-emerald-500 hover:bg-emerald-600 text-white text-lg font-semibold rounded-full shadow-lg shadow-emerald-200 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer">
        <svg
          className="w-5 h-5 transition-transform duration-300 group-hover:scale-110"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.25 3h1.5l2.25 11.25a1.5 1.5 0 001.5 1.25h8.25a1.5 1.5 0 001.45-1.14l1.5-6.75H7.75"
          />
          <circle cx="8.2" cy="19.5" r="1.5" />
          <circle cx="16.45" cy="19.5" r="1.5" />
        </svg>
        Add to Cart — ${totalPrice.toFixed(2)}
      </button>
    </div>
  );
}
