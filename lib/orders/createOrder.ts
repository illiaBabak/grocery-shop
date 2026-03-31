import { Prisma } from '@/generated/prisma/client';
import prisma from '../prisma';

export const createOrder = async (data: Prisma.OrderCreateInput) => {
  const order = await prisma.order.create({
    data: {
      ...data,
    },
  });

  if (!order) {
    throw new Error('Failed to create order');
  }

  return order;
};
