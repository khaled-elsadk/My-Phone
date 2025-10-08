// src/pages/About/About.jsx
import React, { useEffect } from "react";
import { Link } from "react-router-dom";

export default function About() {
  // Set page title
  useEffect(() => {
    document.title = "My Phone | About";
  }, []);

  return (
    <>
      {/* Local styles only for tiny visual touches */}
      <style>{`
        .about-hero {
          background: linear-gradient(135deg, rgba(13,110,253,.12), rgba(102,16,242,.12));
          border-radius: 1rem;
        }
        .avatar {
          width: 64px; height: 64px; object-fit: cover; border-radius: 50%;
        }
      `}</style>

      {/* HERO */}
      <section className="about-hero p-5 mb-4">
        <div className="container text-center">
          <h1 className="fw-bold mb-2">About My Phone</h1>
          <p className="lead text-secondary m-0">
            We help you find the right smartphone at the right price — fast delivery, secure payment, and trusted support.
          </p>
        </div>
      </section>

      <div className="container">
        {/* Story + Quick facts */}
        <div className="row g-4 align-items-start mb-4">
          <div className="col-lg-7">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h2 className="h4 fw-bold">Our story</h2>
                <p className="text-secondary">
                  My Phone started with a simple idea: make shopping for phones simple and enjoyable.
                  We curate top devices, keep prices fair, and deliver quickly across Egypt. Our team
                  is passionate about technology and customer happiness.
                </p>
                <h3 className="h5 fw-bold mt-3">Our mission</h3>
                <ul className="list-unstyled text-secondary m-0">
                  <li className="mb-1">• Offer a clean, fast shopping experience.</li>
                  <li className="mb-1">• Provide honest pricing and real warranty.</li>
                  <li className="mb-1">• Support customers before and after purchase.</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="col-lg-5">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h2 className="h5 fw-bold">Quick facts</h2>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    Devices shipped
                    <span className="badge text-bg-primary rounded-pill">25K+</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    Average delivery
                    <span className="badge text-bg-primary rounded-pill">2–5 days</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    Customer rating
                    <span className="badge text-bg-primary rounded-pill">4.8/5</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    Support hours
                    <span className="badge text-bg-primary rounded-pill">9am–9pm</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Why choose us */}
        <div className="row g-3 mb-4">
          {[
            { title: "Fast shipping", text: "Nationwide delivery with real-time updates." },
            { title: "Official warranty", text: "Every phone is covered by vendor warranty." },
            { title: "Secure payment", text: "Card payments or cash on delivery." },
          ].map((b) => (
            <div className="col-md-4" key={b.title}>
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h3 className="h6 fw-bold">{b.title}</h3>
                  <p className="text-secondary m-0">{b.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Team (placeholders) */}
        <div className="mb-4">
          <h2 className="h5 fw-bold mb-3">Meet the team</h2>
          <div className="row g-3">
            {[
              { n: "Omar", r: "Operations" },
              { n: "Sara", r: "Support" },
              { n: "Youssef", r: "Logistics" },
            ].map((p, i) => (
              <div className="col-12 col-sm-6 col-lg-4" key={p.n}>
                <div className="card h-100 shadow-sm">
                  <div className="card-body d-flex align-items-center gap-3">
                    <img
                      className="avatar"
                      src={`https://picsum.photos/seed/team-${i}/128/128`}
                      alt={`${p.n} avatar`}
                      loading="lazy"
                    />
                    <div>
                      <div className="fw-semibold">{p.n}</div>
                      <div className="text-secondary small">{p.r}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="row g-4 mb-4">
          <div className="col-lg-7">
            <h2 className="h5 fw-bold mb-3">FAQ</h2>
            <div className="accordion" id="aboutFaq">
              <div className="accordion-item">
                <h2 className="accordion-header" id="q1">
                  <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#a1" aria-expanded="true" aria-controls="a1">
                    How long does delivery take?
                  </button>
                </h2>
                <div id="a1" className="accordion-collapse collapse show" aria-labelledby="q1" data-bs-parent="#aboutFaq">
                  <div className="accordion-body text-secondary">
                    Standard delivery takes 2–5 business days depending on your city.
                  </div>
                </div>
              </div>

              <div className="accordion-item">
                <h2 className="accordion-header" id="q2">
                  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#a2" aria-expanded="false" aria-controls="a2">
                    Do you offer warranty?
                  </button>
                </h2>
                <div id="a2" className="accordion-collapse collapse" aria-labelledby="q2" data-bs-parent="#aboutFaq">
                  <div className="accordion-body text-secondary">
                    Yes, every device comes with official vendor warranty. Keep your invoice after purchase.
                  </div>
                </div>
              </div>

              <div className="accordion-item">
                <h2 className="accordion-header" id="q3">
                  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#a3" aria-expanded="false" aria-controls="a3">
                    What payment methods do you support?
                  </button>
                </h2>
                <div id="a3" className="accordion-collapse collapse" aria-labelledby="q3" data-bs-parent="#aboutFaq">
                  <div className="accordion-body text-secondary">
                    We support card payments and cash on delivery for most locations.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact card */}
          <div className="col-lg-5">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h2 className="h5 fw-bold">Contact us</h2>
                <p className="text-secondary">
                  Need help with an order? Our team is happy to assist.
                </p>
                <ul className="list-unstyled mb-3 text-secondary">
                  <li className="mb-1">Email: <a href="mailto:support@myphone.store">support@myphone.store</a></li>
                  <li className="mb-1">Phone: <a href="tel:+201000000000">+20 100 000 0000</a></li>
                  <li className="mb-1">Hours: 9am–9pm (all week)</li>
                </ul>
                <div className="d-flex gap-2">
                  <Link to="/contact" className="btn btn-outline-secondary">Send a message</Link>
                  <Link to="/products" className="btn btn-primary">Shop now</Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="text-center py-4">
          <p className="text-secondary mb-2">Looking for a specific device?</p>
          <Link to="/products" className="btn btn-primary">Browse products</Link>
        </div>
      </div>
    </>
  );
}
