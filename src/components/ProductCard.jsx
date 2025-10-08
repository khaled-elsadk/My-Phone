// src/components/ProductCard.jsx
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { useToast } from "../contexts/ToastContext";
import SafeImage from "./SafeImage";

export default function ProductCard({ product }) {
  const { add } = useCart();
  const { notify } = useToast();
  const nav = useNavigate();
  const loc = useLocation();

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
    <div
      className="card h-100 shadow-sm"
      style={{ transition: "transform .2s ease, box-shadow .2s ease" }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = "0 1rem 2rem rgba(0,0,0,.15)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "";
        e.currentTarget.style.boxShadow = "";
      }}
    >
      <div className="position-relative">
        <SafeImage
          src={product.image}
          alt={product.name}
          className="card-img-top"
          style={{ aspectRatio: "4 / 3", objectFit: "cover" }}
          loading="lazy"
        />
        <span className="badge text-bg-primary position-absolute top-0 start-0 m-2">
          {product.price} EGP
        </span>
        <span className="badge text-bg-dark position-absolute top-0 end-0 m-2">
          {product.brand}
        </span>
      </div>

      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text text-secondary" style={{ minHeight: 44 }}>
          {product.description}
        </p>
        <div className="mt-auto d-flex justify-content-between align-items-center">
          <div className="btn-group">
            <Link to={`/products/${product.id}`} className="btn btn-outline-secondary btn-sm">
              Details
            </Link>
            <button onClick={onAdd} className="btn btn-primary btn-sm">
              Add
            </button>
          </div>
          <button
            type="button"
            className="btn btn-outline-secondary btn-sm"
            title="Save for later"
            aria-label="Save for later"
            onClick={() => notify({ title: "Saved", message: "Added to wishlist (demo).", variant: "success" })}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12.1 21.3 4 13.6a5.5 5.5 0 0 1 7.8-7.8l.3.3.3-.3a5.5 5.5 0 1 1 7.8 7.8l-8.1 7.7a1 1 0 0 1-1.3 0z"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
