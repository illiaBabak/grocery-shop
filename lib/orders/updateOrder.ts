import { Order } from '@/generated/prisma/client';
import prisma from '../prisma';

export const updateOrder = async (orderId: string, data: Partial<Order>) => {
  const order = await prisma.order.update({
    where: { id: orderId },
    data,
  });

  if (!order) {
    throw new Error('Failed to update order');
  }

  return order;
};
