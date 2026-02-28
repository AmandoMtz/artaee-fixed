// src/context/CartContext.tsx
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { CartItem, Product } from '../types';

interface CartContextValue {
  items: CartItem[];
  addToCart: (product: Product, size?: string) => void;
  removeFromCart: (id: string | number, size?: string) => void;
  updateQty: (id: string | number, size: string | undefined, qty: number) => void;
  clearCart: () => void;
  total: number;
  count: number;
}

const CartContext = createContext<CartContextValue | null>(null);
const LS_KEY = 'artaee_cart';

function load(): CartItem[] {
  try { return JSON.parse(localStorage.getItem(LS_KEY) ?? '[]'); }
  catch { return []; }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(load);

  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(items));
  }, [items]);

  const addToCart = useCallback((product: Product, size = 'Único') => {
    setItems(prev => {
      const found = prev.find(p => p.id === product.id && p.size === size);
      if (found) return prev.map(p =>
        p.id === product.id && p.size === size ? { ...p, quantity: p.quantity + 1 } : p
      );
      return [...prev, { ...product, quantity: 1, size }];
    });
  }, []);

  const removeFromCart = useCallback((id: string | number, size?: string) => {
    setItems(prev => prev.filter(p => !(p.id === id && p.size === size)));
  }, []);

  const updateQty = useCallback((id: string | number, size: string | undefined, qty: number) => {
    if (qty <= 0) { removeFromCart(id, size); return; }
    setItems(prev => prev.map(p =>
      p.id === id && p.size === size ? { ...p, quantity: qty } : p
    ));
  }, [removeFromCart]);

  const clearCart = useCallback(() => setItems([]), []);

  const total = items.reduce((acc, it) => acc + it.price * it.quantity, 0);
  const count = items.reduce((acc, it) => acc + it.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQty, clearCart, total, count }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be inside CartProvider');
  return ctx;
}
