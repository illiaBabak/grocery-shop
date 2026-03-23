import { getFood } from '@/lib/food/getFood';

export const GET = async () => {
  const food = await getFood();

  if (!food) return Response.json({ error: 'Food not found' }, { status: 404 });

  return Response.json({ food }, { status: 200 });
};
