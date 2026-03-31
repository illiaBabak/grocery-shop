import { Food } from '@/generated/prisma/client';
import { CartItem, OrderItemType } from '@/types';

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

export const isOrderItem = (value: unknown): value is OrderItemType =>
  isObject(value) &&
  'id' in value &&
  'quantity' in value &&
  isString(value.id) &&
  isNumber(value.quantity);

export const isOrderItemArray = (value: unknown): value is OrderItemType[] =>
  isArray(value) && value.every(isOrderItem);

export const isCheckoutResponse = (value: unknown): value is { url: string } =>
  isObject(value) && 'url' in value && isString(value.url);

export const isCartItem = (value: unknown): value is CartItem =>
  isObject(value) &&
  'id' in value &&
  'imageUrl' in value &&
  'name' in value &&
  'price' in value &&
  'quantity' in value &&
  isString(value.id) &&
  isString(value.imageUrl) &&
  isString(value.name) &&
  isNumber(value.price) &&
  isNumber(value.quantity) &&
  value.quantity > 0;

export const isCartItemArray = (value: unknown): value is CartItem[] =>
  isArray(value) && value.every(isCartItem);
