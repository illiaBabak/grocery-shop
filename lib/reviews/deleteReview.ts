import prisma from '../prisma';
import { recalculateRating } from './recalculateRating';

export const deleteReview = async (reviewId: string) => {
  const review = await prisma.review.delete({
    where: { id: reviewId },
  });

  await recalculateRating(review.foodId);

  return review;
};
