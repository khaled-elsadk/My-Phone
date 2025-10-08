import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useAuth } from "./AuthContext";

const CartCtx = createContext();

export function CartProvider({ children }) {
  const { currentUser } = useAuth();
  const storageKey = currentUser ? `cart:${currentUser.email}` : null;
  const [items, setItems] = useState([]);

  // Load cart for current user
  useEffect(() => {
    if (!storageKey) { setItems([]); return; }
    const saved = JSON.parse(localStorage.getItem(storageKey) || "[]");
    setItems(saved);
  }, [storageKey]);

  // Persist on change
  useEffect(() => {
    if (storageKey) localStorage.setItem(storageKey, JSON.stringify(items));
  }, [items, storageKey]);

  // Add item (guarded)
  function add(productId, qty = 1) {
    if (!currentUser) return { ok: false, error: "AUTH" };
    setItems(prev => {
      const i = prev.findIndex(x => x.productId === productId);
      if (i >= 0) {
        const copy = [...prev];
        copy[i] = { ...copy[i], qty: copy[i].qty + qty };
        return copy;
      }
      return [...prev, { productId, qty }];
    });
    return { ok: true };
  }

  const remove = (productId) => setItems(prev => prev.filter(x => x.productId !== productId));
  const clear = () => setItems([]);

  const value = useMemo(() => ({ items, add, remove, clear }), [items]);
  return <CartCtx.Provider value={value}>{children}</CartCtx.Provider>;
}

export function useCart() { return useContext(CartCtx); }
