import { Food } from '@/generated/prisma/client';

export const isNumber = (value: unknown): value is number => typeof value === 'number';

export const isString = (value: unknown): value is string => typeof value === 'string';

export const isArray = (value: unknown): value is unknown[] => Array.isArray(value);

export const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

export const isDate = (data: unknown): data is Date => {
  if (isString(data)) return !isNaN(new Date(data).getTime());
  return data instanceof Date;
};

export const isFood = (value: unknown): value is Food =>
  isObject(value) &&
  'id' in value &&
  'name' in value &&
  'imageUrl' in value &&
  'priceBy1kg' in value &&
  'category' in value &&
  'description' in value &&
  'createdAt' in value &&
  isString(value.id) &&
  isString(value.name) &&
  isString(value.imageUrl) &&
  isNumber(value.priceBy1kg) &&
  isString(value.category) &&
  isString(value.description) &&
  isDate(value.createdAt);

export const isFoodArray = (value: unknown): value is Food[] =>
  isArray(value) && value.every(isFood);

export const isFoodResponse = (value: unknown): value is { food: Food[] } =>
  isObject(value) && 'food' in value && isFoodArray(value.food);
