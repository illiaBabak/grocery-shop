import prisma from '../prisma';

export const getFood = async () => {
  const food = await prisma.food.findMany();

  if (!food) {
    throw new Error('Food not found');
  }

  return food;
};
