import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { GET_FOOD_QUERY } from './constants';
import { Food } from '@/generated/prisma/client';

const getFood = async () => {
  const response = await fetch('/api/food', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch food');
  }

  const data = await response.json();

  return data.food;
};

export const useGetFood = (): UseQueryResult<Food[], Error> => {
  return useQuery({
    queryKey: [GET_FOOD_QUERY],
    queryFn: getFood,
  });
};
