// src/contexts/ProductsContext.js
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  useCallback,
} from "react";
import { fetchPhones } from "../Services/productsApi";

const STORAGE_KEY = "products";
const ProductsCtx = createContext();

export function ProductsProvider({ children }) {
  // 1) Load cached products from localStorage on first render
  const [products, setProducts] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    } catch {
      return [];
    }
  });
  const [loading, setLoading] = useState(products.length === 0);
  const [error, setError] = useState(null);

  // 2) If no cache, fetch from DummyJSON, then cache
  useEffect(() => {
    if (products.length) return;
    (async () => {
      try {
        setLoading(true);
        const list = await fetchPhones();
        setProducts(list);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
      } catch (e) {
        setError(e.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    })();
  }, [products.length]);

  // 3) Helper to get a product by id (stable reference)
  const getById = useCallback(
    (id) => products.find((p) => p.id === id),
    [products]
  );

  // 4) Exposed value (memoized)
  const value = useMemo(
    () => ({ products, loading, error, getById, setProducts }),
    [products, loading, error, getById]
  );

  return <ProductsCtx.Provider value={value}>{children}</ProductsCtx.Provider>;
}

export function useProducts() {
  return useContext(ProductsCtx);
}
