// src/components/Navbar.jsx  (استبدل محتوى الملف الموجود)
import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useCart } from "../contexts/CartContext";

export default function Navbar() {
  const { currentUser, logout } = useAuth();
  const { items } = useCart();
  const count = items.reduce((s, i) => s + i.qty, 0);

  const navLinkClass = ({ isActive }) => `nav-link${isActive ? " active" : ""}`;

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">My Phone</Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#mainNav" aria-controls="mainNav" aria-expanded="false"
                aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="mainNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item"><NavLink end to="/" className={navLinkClass}>Home</NavLink></li>
            <li className="nav-item"><NavLink to="/products" className={navLinkClass}>Products</NavLink></li>
            <li className="nav-item"><NavLink to="/about" className={navLinkClass}>About</NavLink></li>
            <li className="nav-item"><NavLink to="/contact" className={navLinkClass}>Contact</NavLink></li>
          </ul>

          <ul className="navbar-nav ms-auto align-items-lg-center">
            <li className="nav-item me-lg-3">
              <Link to="/card" className="btn btn-outline-light position-relative">
                Cart
                {count > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {count}
                  </span>
                )}
              </Link>
            </li>

            {currentUser ? (
              <>
                <li className="nav-item text-light me-lg-2">Hi, {currentUser.name}</li>
                <li className="nav-item">
                  <button className="btn btn-outline-light" onClick={logout}>Logout</button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink to="/login" className={navLinkClass}>Login</NavLink>
                </li>
                <li className="nav-item ms-lg-2">
                  <Link to="/register" className="btn btn-primary">Register</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
