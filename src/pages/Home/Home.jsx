import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useProducts } from "../../contexts/ProductsContext";
import ProductCard from "../../components/ProductCard";

function SkeletonCard() {
  return (
    <div className="card h-100">
      <div className="placeholder-glow" style={{ aspectRatio: "4 / 3", background: "rgba(0,0,0,.05)" }}>
        <span className="placeholder col-12" style={{ height: "100%", display: "block" }}></span>
      </div>
      <div className="card-body">
        <h5 className="card-title placeholder-glow">
          <span className="placeholder col-8"></span>
        </h5>
        <p className="card-text placeholder-glow">
          <span className="placeholder col-12"></span>
          <span className="placeholder col-10"></span>
        </p>
      </div>
    </div>
  );
}

export default function Home() {
  const { products, loading, error } = useProducts();
  const featured = products.slice(0, 6);
  const revealRef = useRef([]);

  useEffect(() => { document.title = "My Phone | Home"; }, []);

  // Simple scroll reveal
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("show")),
      { threshold: 0.2 }
    );
    revealRef.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <>
      <style>{`
        .reveal { opacity: 0; transform: translateY(14px); transition: all .6s ease; }
        .reveal.show { opacity: 1; transform: none; }
        .carousel-overlay {
          position: absolute; inset: 0; background: linear-gradient(180deg, rgba(0,0,0,.45), rgba(0,0,0,.15));
        }
      `}</style>

      {/* HERO: Bootstrap Carousel */}
      <section className="mb-4">
        <div id="heroCarousel" className="carousel slide overflow-hidden rounded-3" data-bs-ride="carousel">
          <div className="carousel-indicators">
            <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="0" className="active" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
          </div>
          <div className="carousel-inner" style={{ maxHeight: 420 }}>
            <div className="carousel-item active" data-bs-interval="4500">
              <img src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1600&auto=format&fit=crop" className="d-block w-100" alt="Smartphones" />
              <div className="carousel-overlay"></div>
              <div className="carousel-caption text-start">
                <h1 className="fw-bold">Find your next smartphone</h1>
                <p>Top brands at great prices. Fast delivery across Egypt.</p>
                <p><Link className="btn btn-primary btn-lg" to="/products">Shop now</Link></p>
              </div>
            </div>
            <div className="carousel-item" data-bs-interval="4500">
              <img src="https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?q=80&w=1600&auto=format&fit=crop" className="d-block w-100" alt="Accessories" />
              <div className="carousel-overlay"></div>
              <div className="carousel-caption">
                <h1 className="fw-bold">Latest accessories</h1>
                <p>Cases, chargers, earbuds and more.</p>
              </div>
            </div>
            <div className="carousel-item" data-bs-interval="4500">
              <img src="https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=1600&auto=format&fit=crop" className="d-block w-100" alt="Deals" />
              <div className="carousel-overlay"></div>
              <div className="carousel-caption text-end">
                <h1 className="fw-bold">Weekly deals</h1>
                <p>Save more with exclusive offers.</p>
              </div>
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#heroCarousel" data-bs-slide="prev" aria-label="Previous">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#heroCarousel" data-bs-slide="next" aria-label="Next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
          </button>
        </div>
      </section>

      {/* FEATURED */}
      <section className="container px-0">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="fw-bold m-0">Featured</h2>
          <Link className="btn btn-outline-secondary btn-sm" to="/products">View all</Link>
        </div>

        {error && <div className="alert alert-danger">Failed to load products: {error}</div>}

        {loading ? (
          <div className="row g-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div className="col-12 col-sm-6 col-lg-4" key={i}><SkeletonCard /></div>
            ))}
          </div>
        ) : (
          <div className="row g-3">
            {featured.map((p, i) => (
              <div
                key={p.id}
                className="col-12 col-sm-6 col-lg-4 reveal"
                ref={(el) => (revealRef.current[i] = el)}
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* HIGHLIGHTS */}
      <section className="container px-0 my-5">
        <div className="row g-3">
          {[
            { title: "Fast shipping", text: "2–5 business days in Egypt." },
            { title: "Warranty", text: "Official vendor warranty on all devices." },
            { title: "Secure payment", text: "Cash on delivery or card payments." },
          ].map((b, i) => (
            <div
              key={b.title}
              className="col-md-4 reveal"
              ref={(el) => (revealRef.current[10 + i] = el)}
              style={{ transitionDelay: `${200 + i * 80}ms` }}
            >
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{b.title}</h5>
                  <p className="text-secondary mb-0">{b.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
