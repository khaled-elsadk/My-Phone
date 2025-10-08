import React from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useProducts } from "../../contexts/ProductsContext";
import { useCart } from "../../contexts/CartContext";
import { useToast } from "../../contexts/ToastContext";

export default function ProductDetails() {
  const { id } = useParams();
  const { getById } = useProducts();
  const product = getById(id);

  const { add } = useCart();
  const { notify } = useToast();
  const nav = useNavigate();
  const loc = useLocation();

  if (!product) return <div className="alert alert-warning">Product not found.</div>;

  const onAdd = () => {
    const res = add(product.id, 1);
    if (!res.ok) {
      notify({ title: "Sign in required", message: "Please login to add items.", variant: "info" });
      nav("/login", { state: { from: loc, message: "Please sign in to add products to your cart." } });
    } else {
      notify({ title: "Added to cart", message: product.name, variant: "success" });
    }
  };

  return (
    <div className="row g-4">
      <div className="col-md-6">
        <img src={product.image} alt={product.name} className="img-fluid rounded" />
      </div>
      <div className="col-md-6">
        <h3 className="fw-bold">{product.name}</h3>
        <p className="text-secondary">{product.description}</p>
        <p className="h5">{product.price} EGP</p>
        <button onClick={onAdd} className="btn btn-primary mt-3">Add to Cart</button>
      </div>
    </div>
  );
}
