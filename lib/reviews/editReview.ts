import prisma from '../prisma';
import { recalculateRating } from './recalculateRating';

export const editReview = async (reviewId: string, stars: number, content: string) => {
  const review = await prisma.review.update({
    where: { id: reviewId },
    data: { stars, content },
  });

  await recalculateRating(review.foodId);

  return review;
};
