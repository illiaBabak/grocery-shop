import prisma from '../prisma';

export const getReviewByFoodId = async (foodId: string) => {
  const reviews = await prisma.review.findMany({
    where: { foodId },
    include: { user: true },
    orderBy: { createdAt: 'desc' },
  });

  return reviews;
};
