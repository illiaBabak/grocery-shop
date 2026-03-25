import prisma from '../prisma';

export const getFoodById = async (id: string) => {
  const food = await prisma.food.findUnique({
    where: { id },
  });

  if (!food) {
    throw new Error('Food not found');
  }

  return food;
};
