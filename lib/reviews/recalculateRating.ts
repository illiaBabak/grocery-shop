import prisma from '../prisma';

export const recalculateRating = async (foodId: string) => {
  const { _avg, _count } = await prisma.review.aggregate({
    where: { foodId },
    _avg: { stars: true },
    _count: { stars: true },
  });

  await prisma.food.update({
    where: { id: foodId },
    data: {
      rating: _avg.stars ?? 0,
      reviewsCount: _count.stars,
    },
  });
};
