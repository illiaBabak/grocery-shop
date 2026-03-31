'use client';

import Link from 'next/link';
import { useContext, useEffect, useMemo, useState } from 'react';
import { CartContext } from '@/contexts/cart';
import { getImageUrl } from '@/lib/storage/getImageUrl';
import { useCreateCheckout } from '@/services/mutations';
import { getUser } from '@/lib/auth/getUser';
import { useRouter } from 'next/navigation';

export default function Cart() {
  const router = useRouter();

  const { cart, isOpen, toggleCart, removeFromCart, clearCart } = useContext(CartContext);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const total = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [cart]);

  const { mutateAsync: createCheckout, isPending } = useCreateCheckout();

  const doCheckout = async (guest: boolean) => {
    setShowAuthModal(false);
    const url = await createCheckout({ cart, guest });
    router.push(url);
  };

  const handleCheckout = async () => {
    const user = await getUser();

    if (user) await doCheckout(false);
    else setShowAuthModal(true);
  };

  useEffect(() => {
    if (!isOpen) setShowAuthModal(false);
  }, [isOpen]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={[
          'fixed inset-0 z-[60] transition-opacity',
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none',
        ].join(' ')}
        aria-hidden={!isOpen}
      >
        <button
          type="button"
          onClick={toggleCart}
          className="absolute inset-0 bg-black/35 backdrop-blur-[2px]"
          aria-label="Close cart"
        />
      </div>

      {/* Cart panel */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        className={[
          'fixed right-0 top-0 z-[70] h-dvh w-full sm:max-w-md',
          'bg-white shadow-2xl shadow-black/10 border-l border-emerald-100',
          'transition-transform duration-300 ease-out',
          isOpen ? 'translate-x-0' : 'translate-x-full',
        ].join(' ')}
      >
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="px-4 sm:px-5 py-4 border-b border-emerald-100 bg-gradient-to-b from-emerald-50/70 to-white">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Cart</h2>
                <p className="text-xs text-gray-500 mt-0.5">
                  {cart.length
                    ? `${cart.length} item${cart.length === 1 ? '' : 's'}`
                    : 'Your cart is empty'}
                </p>
              </div>

              <button
                type="button"
                onClick={toggleCart}
                className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-emerald-100 bg-white text-gray-600 hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
                aria-label="Close"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-auto px-4 sm:px-5 py-4">
            {!cart.length ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-10">
                <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-700">
                  <svg
                    viewBox="0 0 24 24"
                    className="w-7 h-7"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.8}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.25 3h1.5l2.25 11.25a1.5 1.5 0 001.5 1.25h8.25a1.5 1.5 0 001.45-1.14l1.5-6.75H7.75"
                    />
                    <circle cx="8.2" cy="19.5" r="1.5" />
                    <circle cx="16.45" cy="19.5" r="1.5" />
                  </svg>
                </div>
                <p className="mt-4 text-sm font-medium text-gray-900">Add some products</p>
                <p className="mt-1 text-xs text-gray-500 max-w-[22rem]">
                  Your cart will appear here. Browse products and tap &quot;Add to cart&quot;.
                </p>
                <Link
                  href="/main"
                  onClick={toggleCart}
                  className="mt-5 inline-flex items-center justify-center rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium px-5 py-2.5 shadow-sm shadow-emerald-200 transition-colors"
                >
                  Go to products
                </Link>
              </div>
            ) : (
              <ul className="space-y-3">
                {cart.map((item, index) => {
                  const lineTotal = item.price * item.quantity;

                  return (
                    <li
                      key={`${item.id}-${item.quantity}-${index}`}
                      className="group flex gap-3 rounded-2xl border border-emerald-100 bg-white p-3 hover:bg-emerald-50/30 transition-colors"
                    >
                      <div className="relative w-16 h-16 shrink-0 rounded-xl overflow-hidden bg-emerald-50 border border-emerald-100">
                        <img
                          src={getImageUrl(item.imageUrl)}
                          alt={item.name}
                          className="object-cover"
                        />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-gray-900 truncate">
                              {item.name}
                            </p>
                            <div className="mt-1 flex items-center gap-2 text-xs text-gray-500">
                              <span className="inline-flex items-center rounded-full bg-emerald-50 border border-emerald-100 px-2 py-0.5 text-emerald-700">
                                {item.quantity} kg
                              </span>
                              <span>${item.price.toFixed(2)}/kg</span>
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={() => removeFromCart(index)}
                            className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-transparent text-gray-500 hover:text-red-600 hover:bg-red-50 transition-colors"
                            aria-label="Remove item"
                          >
                            <svg
                              viewBox="0 0 24 24"
                              className="w-4.5 h-4.5"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth={2}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </button>
                        </div>

                        <div className="mt-2 flex items-end justify-between">
                          <p className="text-xs text-gray-500">
                            Subtotal:{' '}
                            <span className="font-medium text-gray-700">
                              ${lineTotal.toFixed(2)}
                            </span>
                          </p>
                          <p className="text-sm font-semibold text-gray-900">
                            ${lineTotal.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          {/* Footer */}
          <div className="px-4 sm:px-5 py-4 border-t border-emerald-100 bg-white">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600">Total</p>
              <p className="text-lg font-semibold text-gray-900">${total.toFixed(2)}</p>
            </div>

            <div className="mt-3 flex gap-2">
              <button
                type="button"
                onClick={clearCart}
                disabled={!cart.length}
                className="flex-1 rounded-full border border-emerald-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-emerald-50 disabled:opacity-50 disabled:hover:bg-white transition-colors"
              >
                Clear
              </button>
              <button
                type="button"
                disabled={!cart.length || isPending}
                onClick={handleCheckout}
                className="flex-1 rounded-full bg-emerald-600 hover:bg-emerald-700 px-4 py-2.5 text-sm font-medium text-white shadow-sm shadow-emerald-200 disabled:opacity-50 disabled:hover:bg-emerald-600 transition-colors"
              >
                {isPending ? 'Loading...' : 'Checkout'}
              </button>
            </div>

            <p className="mt-3 text-[11px] leading-4 text-gray-500">
              Taxes and shipping are calculated at checkout.
            </p>
          </div>
        </div>

        {/* Auth modal */}
        {showAuthModal && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/30 backdrop-blur-[2px]">
            <div className="mx-4 w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl border border-emerald-100">
              <h3 className="text-base font-semibold text-gray-900">You&apos;re not logged in</h3>
              <p className="mt-1.5 text-sm text-gray-500">
                Would you like to sign in for order tracking, or continue as a guest?
              </p>

              <div className="mt-5 flex flex-col gap-2.5">
                <Link
                  href="/login"
                  onClick={toggleCart}
                  className="inline-flex items-center justify-center rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium px-5 py-2.5 shadow-sm shadow-emerald-200 transition-colors text-center"
                >
                  Sign in
                </Link>
                <button
                  type="button"
                  onClick={() => doCheckout(true)}
                  className="inline-flex items-center justify-center rounded-full border border-emerald-200 bg-white hover:bg-emerald-50 text-sm font-medium text-gray-700 px-5 py-2.5 transition-colors"
                >
                  Continue as guest
                </button>
                <button
                  type="button"
                  onClick={() => setShowAuthModal(false)}
                  className="text-xs text-gray-400 hover:text-gray-600 transition-colors mt-1"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}
