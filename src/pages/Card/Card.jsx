// src/pages/Card/Card.jsx
import React from "react";
import { useCart } from "../../contexts/CartContext";
import { useProducts } from "../../contexts/ProductsContext";

export default function Card() { // (اسم الملف/المسار عندك "Card")
  const { items, remove, clear } = useCart();
  const { products } = useProducts();

  const rows = items.map((i) => {
    const p = products.find(x => x.id === i.productId);
    const price = p?.price || 0;
    return { ...i, name: p?.name || "Unknown", price, total: price * i.qty, image: p?.image };
  });

  const subtotal = rows.reduce((s, r) => s + r.total, 0);

  if (!rows.length) return <div className="alert alert-info">Your cart is empty.</div>;

  return (
    <section>
      <h2 className="fw-bold mb-3">Your Cart</h2>
      <div className="table-responsive">
        <table className="table align-middle">
          <thead>
            <tr>
              <th>Product</th>
              <th style={{width: 90}}>Qty</th>
              <th style={{width: 140}}>Price</th>
              <th style={{width: 140}}>Total</th>
              <th style={{width: 80}}></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.productId}>
                <td>
                  <div className="d-flex align-items-center gap-2">
                    <img src={r.image} alt={r.name} width="56" height="42" style={{objectFit:"cover", borderRadius:6}} />
                    <span>{r.name}</span>
                  </div>
                </td>
                <td>{r.qty}</td>
                <td>{r.price} EGP</td>
                <td className="fw-semibold">{r.total} EGP</td>
                <td>
                  <button className="btn btn-sm btn-outline-danger" onClick={() => remove(r.productId)}>
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={3} className="text-end fw-bold">Subtotal</td>
              <td className="fw-bold">{subtotal} EGP</td>
              <td></td>
            </tr>
          </tfoot>
        </table>
      </div>

      <div className="d-flex gap-2">
        <button className="btn btn-outline-secondary" onClick={clear}>Clear Cart</button>
        <button className="btn btn-primary" disabled>Checkout (demo)</button>
      </div>
    </section>
  );
}
