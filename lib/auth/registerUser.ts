import prisma from '../prisma';
import { hashPassword } from '../auth';

export const registerUser = async (name: string, email: string, password: string) => {
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new Error('User already exists');
  }

  const hashedPassword = await hashPassword(password);

  const user = await prisma.user.create({
    data: { name, email, passwordHash: hashedPassword },
  });

  return user;
};
