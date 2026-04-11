import prisma from '../prisma';

export const getOrdersCreatedSince = async (since: Date) => {
  return prisma.order.findMany({
    where: {
      createdAt: { gte: since },
    },
    include: {
      items: {
        include: { food: true },
      },
      user: true,
    },
    orderBy: { createdAt: 'desc' },
  });
};
