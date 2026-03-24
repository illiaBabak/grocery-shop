import { Filters } from '@/types';
import prisma from '../prisma';

export const getFood = async ({
  categories,
  stars,
  minPrice,
  maxPrice,
  sort,
  search,
}: Filters & { search?: string }) => {
  const food = await prisma.food.findMany({
    where: {
      ...(categories.length > 0 && {
        category: {
          in: categories,
        },
      }),

      ...(stars.length > 0 && {
        rating: {
          in: stars,
        },
      }),

      priceBy1kg: {
        gte: minPrice,
        lte: maxPrice,
      },

      ...(search?.trim() && {
        OR: [
          {
            name: {
              contains: search.trim(),
              mode: 'insensitive',
            },
            description: {
              contains: search.trim(),
              mode: 'insensitive',
            },
          },
        ],
      }),
    },

    orderBy:
      sort === 'price-asc'
        ? { priceBy1kg: 'asc' }
        : sort === 'price-desc'
        ? { priceBy1kg: 'desc' }
        : sort === 'rating-asc'
        ? { rating: 'asc' }
        : sort === 'rating-desc'
        ? { rating: 'desc' }
        : { createdAt: 'desc' },
  });

  if (!food) {
    throw new Error('Food not found');
  }

  return food;
};
