import { CHECKOUT_MUTATION, CREATE_CHECKOUT } from './constants';
import { CartItem } from '@/types';
import { isCheckoutResponse } from '@/utils/guards';
import { useMutation, UseMutationResult } from '@tanstack/react-query';

type CheckoutParams = { cart: CartItem[]; guest?: boolean };

const createCheckout = async ({ cart, guest }: CheckoutParams) => {
  const response = await fetch('/api/checkout', {
    method: 'POST',
    body: JSON.stringify({
      items: cart.map((item) => ({
        id: item.id,
        quantity: item.quantity,
      })),
      guest,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to create checkout');
  }

  const data = await response.json();

  if (!isCheckoutResponse(data)) {
    throw new Error('Invalid response');
  }

  return data.url;
};

export const useCreateCheckout = (): UseMutationResult<string, Error, CheckoutParams> => {
  return useMutation({
    mutationKey: [CHECKOUT_MUTATION, CREATE_CHECKOUT],
    mutationFn: createCheckout,
  });
};
