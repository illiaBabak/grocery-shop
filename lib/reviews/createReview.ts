import prisma from '../prisma';
import { recalculateRating } from './recalculateRating';

export const createReview = async (
  foodId: string,
  userId: string,
  stars: number,
  content: string
) => {
  const review = await prisma.review.create({
    data: { foodId, userId, stars, content },
  });

  await recalculateRating(foodId);

  return review;
};
