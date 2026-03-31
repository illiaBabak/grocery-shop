import { User } from '@/generated/prisma/client';
import prisma from '../prisma';

export const updateUser = async (userId: string, data: Partial<User>) => {
  const user = await prisma.user.update({
    where: { id: userId },
    data,
  });

  if (!user) {
    throw new Error('User not found');
  }

  return user;
};
