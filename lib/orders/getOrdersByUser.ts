import prisma from '../prisma';

export const getOrdersByUser = async (userId: string) => {
  const orders = await prisma.order.findMany({
    where: {
      userId,
    },
    include: {
      items: {
        include: { food: true },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  if (!orders) {
    throw new Error('Orders not found');
  }

  return orders;
};
