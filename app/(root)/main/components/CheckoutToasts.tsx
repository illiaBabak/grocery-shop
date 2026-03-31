'use client';

import { CartContext } from '@/contexts/cart';
import { useRouter, useSearchParams } from 'next/navigation';
import { useContext, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';

export function CheckoutToasts() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { clearCart } = useContext(CartContext);

  const handled = useRef(false);

  useEffect(() => {
    if (handled.current) return;

    const sessionId = searchParams.get('session_id');
    const canceled = searchParams.get('checkout') === 'canceled';

    if (sessionId) {
      const dedupeKey = `checkout-success:${sessionId}`;

      if (sessionStorage.getItem(dedupeKey)) return;

      sessionStorage.setItem(dedupeKey, '1');

      clearCart();
      toast.success('Payment successful. Your order is being confirmed.');
    } else if (canceled) {
      toast.info('Checkout canceled. Your cart is unchanged.');
    }

    handled.current = true;
    router.replace('/main');
  }, [searchParams, router, clearCart]);

  return null;
}
