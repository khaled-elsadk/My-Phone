import React, { useMemo, useState } from "react";
import { useProducts } from "../../contexts/ProductsContext";
import ProductCard from "../../components/ProductCard";

const PAGE_SIZE = 9;
const fmt = new Intl.NumberFormat("en-EG");

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
        <div className="d-flex justify-content-between">
          <span className="placeholder col-3"></span>
          <span className="btn btn-sm btn-outline-secondary disabled placeholder col-4"></span>
        </div>
      </div>
    </div>
  );
}

export default function Products() {
  const { products, loading, error } = useProducts();

  // UI state
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("relevance"); // relevance | price-asc | price-desc
  const [page, setPage] = useState(1);

  // Derived data
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = !q
      ? products
      : products.filter(
          (p) =>
            p.name.toLowerCase().includes(q) ||
            (p.description || "").toLowerCase().includes(q)
        );

    if (sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);

    return list;
  }, [products, query, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * PAGE_SIZE;
  const visible = filtered.slice(start, start + PAGE_SIZE);

  // Handlers
  const onSearch = (e) => { setQuery(e.target.value); setPage(1); };
  const onSort = (e) => { setSort(e.target.value); setPage(1); };
  const go = (p) => {
    if (p < 1 || p > totalPages) return;
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // States
  if (error) return <div className="alert alert-danger">Failed to load products: {error}</div>;

  return (
    <section>
      {/* Toolbar */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-2 mb-3">
        <h2 className="fw-bold m-0">Products</h2>

        <div className="d-flex gap-2">
          <input
            type="search"
            className="form-control"
            placeholder="Search products…"
            value={query}
            onChange={onSearch}
            style={{ minWidth: 220 }}
            aria-label="Search products"
          />
          <select className="form-select" value={sort} onChange={onSort} aria-label="Sort products">
            <option value="relevance">Sort: Relevance</option>
            <option value="price-asc">Sort: Price (low → high)</option>
            <option value="price-desc">Sort: Price (high → low)</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="row g-3">
          {Array.from({ length: 9 }).map((_, i) => (
            <div className="col-12 col-sm-6 col-lg-4" key={i}><SkeletonCard /></div>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="alert alert.warning">No products found.</div>
      ) : (
        <>
          <div className="text-secondary small mb-2">
            Showing <strong>{visible.length}</strong> of <strong>{filtered.length}</strong> results
            {query && <> for "<span className="text-light">{query}</span>"</>}
            {sort !== "relevance" && <> • {sort.replace("-", " ")}</>}
          </div>

          <div className="row g-3">
            {visible.map((p) => (
              <div className="col-12 col-sm-6 col-lg-4" key={p.id}>
                <ProductCard product={{ ...p, price: fmt.format(p.price) }} />
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <nav className="mt-4" aria-label="Products pagination">
              <ul className="pagination justify-content-center">
                <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                  <button className="page-link" onClick={() => go(currentPage - 1)}>Prev</button>
                </li>

                {Array.from({ length: totalPages }).map((_, i) => {
                  const n = i + 1;
                  const active = n === currentPage ? "active" : "";
                  return (
                    <li key={n} className={`page-item ${active}`}>
                      <button className="page-link" onClick={() => go(n)}>{n}</button>
                    </li>
                  );
                })}

                <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                  <button className="page-link" onClick={() => go(currentPage + 1)}>Next</button>
                </li>
              </ul>
            </nav>
          )}
        </>
      )}
    </section>
  );
}
