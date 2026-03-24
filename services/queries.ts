import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { GET_FOOD_QUERY } from './constants';
import { Food } from '@/generated/prisma/client';
import { fetchWithParams } from '@/utils/fetchWithParams';
import { isFoodResponse } from '@/utils/guards';
import { Filters } from '@/types';

const getFood = async (filters: Filters): Promise<Food[]> => {
  const params = new URLSearchParams();

  filters.categories.forEach((category) => params.append('category', category));
  filters.stars.forEach((star) => params.append('star', star.toString()));
  params.append('minPrice', filters.minPrice.toString());
  params.append('maxPrice', filters.maxPrice.toString());
  params.append('sort', filters.sort);
  params.append('search', filters.search);

  const response = await fetchWithParams({
    url: 'food',
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'GET',
    urlParams: params,
  });

  if (!response.ok) {
    throw new Error('Failed to fetch food');
  }

  const data = await response.json();

  return isFoodResponse(data) ? data.food : [];
};

export const useGetFood = (filters: Filters): UseQueryResult<Food[], Error> => {
  return useQuery({
    queryKey: [GET_FOOD_QUERY, filters],
    queryFn: () => getFood(filters),
  });
};
