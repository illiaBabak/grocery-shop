import { getFood } from '@/lib/food/getFood';
import { NextRequest } from 'next/server';
import { Filters } from '@/types';

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);

  const categories = searchParams.getAll('category') ?? [];
  const stars = searchParams.getAll('star').map(Number) ?? [];
  const minPrice = Number(searchParams.get('minPrice') ?? 1);
  const maxPrice = Number(searchParams.get('maxPrice') ?? 50);
  const sort = (searchParams.get('sort') as Filters['sort']) ?? 'default';
  const search = searchParams.get('search') ?? '';

  const food = await getFood({ categories, stars, minPrice, maxPrice, sort, search });

  if (!food) return Response.json({ error: 'Food not found' }, { status: 404 });

  return Response.json({ food }, { status: 200 });
};
