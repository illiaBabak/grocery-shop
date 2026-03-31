'use client';

import { CartItem } from '@/types';
import { isCartItemArray } from '@/utils/guards';
import { createContext, useEffect, useState } from 'react';

const STORAGE_KEY = 'grocery-shop-cart';

type CartContextType = {
  cart: CartItem[];
  isOpen: boolean;
  toggleCart: () => void;
  addToCart: (item: CartItem) => void;
  removeFromCart: (index: number) => void;
  clearCart: () => void;
};

export const CartContext = createContext<CartContextType>({
  cart: [],
  isOpen: false,
  toggleCart: () => {},
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
});

const getCartFromStorage = () => {
  const cartStorageData = localStorage.getItem(STORAGE_KEY);
  const cartData: unknown = cartStorageData ? JSON.parse(cartStorageData) : null;

  const parsedCart = isCartItemArray(cartData) ? cartData : [];

  return parsedCart;
};

const setCartToStorage = (cart: CartItem[]) =>
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    if (hasHydrated) return;

    const storedCart = getCartFromStorage();

    setCart(storedCart);
    setHasHydrated(true);
  }, [hasHydrated, setCart, setHasHydrated]);

  const toggleCart = () => {
    setIsOpen((v) => !v);
  };

  const addToCart = (item: CartItem) => {
    setCart((prev) => [...prev, item]);
  };

  const removeFromCart = (index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const clearCart = () => {
    setCart([]);
  };

  useEffect(() => {
    setCartToStorage(cart);
  }, [cart]);

  return (
    <CartContext.Provider
      value={{ cart, isOpen, toggleCart, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
