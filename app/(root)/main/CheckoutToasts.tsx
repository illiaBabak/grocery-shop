'use client';

import { CartContext } from '@/contexts/cart';
import { useRouter, useSearchParams } from 'next/navigation';
import { useContext, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';

export function CheckoutToasts() {
  const searchParams = useSearchParams();
  const router = useRouter();
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

      handled.current = true;
      clearCart();
      toast.success('Payment successful. Your order is being confirmed.');
      router.replace('/main');
    } else if (canceled) {
      handled.current = true;
      toast.info('Checkout canceled. Your cart is unchanged.');
      router.replace('/main');
    }
  }, [searchParams, router, clearCart]);

  return null;
}
