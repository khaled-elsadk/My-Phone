import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  const year = new Date().getFullYear();
  const toTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="bg-dark text-light mt-auto border-top" role="contentinfo">
      <div className="container py-5">
        <div className="row gy-4">
          {/* Brand & tagline */}
          <div className="col-12 col-lg-4">
            <div className="fs-5 fw-bold">My Phone</div>
            <p className="text-secondary mb-3">
              Best phones and accessories at great prices.
            </p>
            <button
              type="button"
              className="btn btn-outline-light btn-sm"
              onClick={toTop}
              aria-label="Back to top"
              title="Back to top"
            >
              ↑ Back to top
            </button>
          </div>

          {/* Links */}
          <nav className="col-6 col-lg-3" aria-label="Footer navigation">
            <div className="text-uppercase text-secondary fw-semibold small mb-3">Links</div>
            <ul className="nav flex-column gap-2">
              <li className="nav-item"><Link className="nav-link p-0 link-light" to="/">Home</Link></li>
              <li className="nav-item"><Link className="nav-link p-0 link-light" to="/products">Products</Link></li>
              <li className="nav-item"><Link className="nav-link p-0 link-light" to="/about">About</Link></li>
              <li className="nav-item"><Link className="nav-link p-0 link-light" to="/contact">Contact</Link></li>
              <li className="nav-item"><Link className="nav-link p-0 link-light" to="/cart">Cart</Link></li>
              {/* لو مسارك اسمه Card مش Cart خلّيه مطابق للي عندك */}
            </ul>
          </nav>

          {/* Contact & socials */}
          <div className="col-6 col-lg-5">
            <div className="text-uppercase text-secondary fw-semibold small mb-3">Contact</div>
            <ul className="list-unstyled mb-3">
              <li className="mb-2">
                <a className="link-light text-decoration-none" href="mailto:support@myphone.store" aria-label="Email">
                  <span className="me-2" aria-hidden="true">📧</span>support@myphone.store
                </a>
              </li>
              <li className="mb-2">
                <a className="link-light text-decoration-none" href="tel:+201000000000" aria-label="Phone">
                  <span className="me-2" aria-hidden="true">📞</span>+20 100 000 0000
                </a>
              </li>
              <li className="text-secondary">Port Said, Egypt</li>
            </ul>

            <div className="d-flex gap-3">
              <a className="link-light" href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook" title="Facebook">
                {/* SVG icon */}
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" role="img" aria-hidden="true">
                  <path d="M22 12a10 10 0 1 0-11.6 9.9v-7h-2.5V12h2.5V9.4c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.4H15c-1.2 0-1.6.8-1.6 1.6V12h2.7l-.4 2.9h-2.3v7A10 10 0 0 0 22 12z" />
                </svg>
              </a>
              <a className="link-light" href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram" title="Instagram">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" role="img" aria-hidden="true">
                  <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm10 2H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3zm-5 3.5A5.5 5.5 0 1 1 6.5 13 5.51 5.51 0 0 1 12 7.5zm0 2A3.5 3.5 0 1 0 15.5 13 3.5 3.5 0 0 0 12 9.5zM17.8 7a1 1 0 1 1-1-1 1 1 0 0 1 1 1z" />
                </svg>
              </a>
              <a className="link-light" href="https://x.com" target="_blank" rel="noreferrer" aria-label="X" title="X">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" role="img" aria-hidden="true">
                  <path d="M18 2h3l-7.5 8.6L22 22h-7.3l-5.7-7L2.6 22H0l8.1-9.2L2 2h7.3l5.2 6.5L18 2z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <hr className="border-secondary opacity-25 my-4" />

        {/* Bottom bar */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-2">
          <small className="text-secondary">© {year} My Phone — All rights reserved.</small>
          <div className="d-flex gap-3">
            <Link to="/privacy" className="link-light text-decoration-none">Privacy</Link>
            <Link to="/terms" className="link-light text-decoration-none">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
