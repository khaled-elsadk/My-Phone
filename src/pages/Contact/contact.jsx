// src/pages/Contact/contact.jsx
import React, { useEffect, useMemo, useState } from "react";
import { useToast } from "../../contexts/ToastContext";
import { useAuth } from "../../contexts/AuthContext";

const MESSAGES_KEY = "contact_messages";

export default function Contact() {
  const { notify } = useToast();
  const { currentUser } = useAuth();

  // Prefill name/email if user is logged in
  const initial = useMemo(
    () => ({
      name: currentUser?.name || "",
      email: currentUser?.email || "",
      phone: "",
      subject: "",
      message: "",
    }),
    [currentUser]
  );

  const [values, setValues] = useState(initial);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    document.title = "My Phone | Contact";
  }, []);

  useEffect(() => {
    // update form if user logs in/out
    setValues(initial);
  }, [initial]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
  };

  function validate(v) {
    const errs = {};
    if (!v.name.trim() || v.name.trim().length < 2) errs.name = "Please enter your full name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) errs.email = "Please enter a valid email.";
    if (v.phone && !/^\+?[0-9\s-]{7,15}$/.test(v.phone)) errs.phone = "Phone must be digits (optional).";
    if (!v.subject.trim()) errs.subject = "Subject is required.";
    if (!v.message.trim() || v.message.trim().length < 10) errs.message = "Please provide more details (min 10 chars).";
    return errs;
    }

  const onSubmit = (e) => {
    e.preventDefault();
    const errs = validate(values);
    setErrors(errs);
    if (Object.keys(errs).length) return;

    setSubmitting(true);
    // Simulate async send + persist to localStorage
    setTimeout(() => {
      const all = JSON.parse(localStorage.getItem(MESSAGES_KEY) || "[]");
      all.push({
        id: (crypto?.randomUUID && crypto.randomUUID()) || String(Date.now()),
        ...values,
        createdAt: new Date().toISOString(),
      });
      localStorage.setItem(MESSAGES_KEY, JSON.stringify(all));
      setSubmitting(false);
      notify({ title: "Message sent", message: "We will get back to you soon.", variant: "success" });
      // Reset message fields (keep name/email/phone)
      setValues((v) => ({ ...v, subject: "", message: "" }));
    }, 600);
  };

  return (
    <>
      <style>{`
        .contact-hero { background: linear-gradient(135deg, rgba(13,110,253,.12), rgba(102,16,242,.12)); border-radius: 1rem; }
      `}</style>

      {/* HERO */}
      <section className="contact-hero p-5 mb-4">
        <div className="container text-center">
          <h1 className="fw-bold mb-2">Contact us</h1>
          <p className="lead text-secondary m-0">
            Have a question about an order or a product? Send us a message and we’ll reply as soon as possible.
          </p>
        </div>
      </section>

      <div className="container">
        <div className="row g-4">
          {/* Contact info */}
          <div className="col-lg-5">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h2 className="h5 fw-bold">Support</h2>
                <p className="text-secondary">
                  We’re available every day from <strong>9am to 9pm</strong>.
                </p>
                <ul className="list-unstyled text-secondary mb-3">
                  <li className="mb-1">Email: <a href="mailto:support@myphone.store">support@myphone.store</a></li>
                  <li className="mb-1">Phone: <a href="tel:+201000000000">+20 100 000 0000</a></li>
                  <li className="mb-1">Location: Cairo, Egypt</li>
                </ul>

                <h3 className="h6 fw-bold mt-4">FAQs</h3>
                <ul className="text-secondary m-0">
                  <li className="mb-1">Delivery time: 2–5 business days.</li>
                  <li className="mb-1">Payment: Card or cash on delivery.</li>
                  <li className="mb-1">Warranty: Official vendor warranty.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="col-lg-7">
            <div className="card shadow-sm">
              <div className="card-body">
                <h2 className="h5 fw-bold mb-3">Send a message</h2>

                <form noValidate onSubmit={onSubmit}>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label htmlFor="name" className="form-label">Full name</label>
                      <input
                        id="name"
                        name="name"
                        className={`form-control ${errors.name ? "is-invalid" : ""}`}
                        value={values.name}
                        onChange={onChange}
                        required
                      />
                      {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                    </div>

                    <div className="col-md-6">
                      <label htmlFor="email" className="form-label">Email</label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        className={`form-control ${errors.email ? "is-invalid" : ""}`}
                        value={values.email}
                        onChange={onChange}
                        required
                      />
                      {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                    </div>

                    <div className="col-md-6">
                      <label htmlFor="phone" className="form-label">Phone (optional)</label>
                      <input
                        id="phone"
                        name="phone"
                        className={`form-control ${errors.phone ? "is-invalid" : ""}`}
                        value={values.phone}
                        onChange={onChange}
                        placeholder="+20 1xx xxx xxxx"
                      />
                      {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
                    </div>

                    <div className="col-md-6">
                      <label htmlFor="subject" className="form-label">Subject</label>
                      <input
                        id="subject"
                        name="subject"
                        className={`form-control ${errors.subject ? "is-invalid" : ""}`}
                        value={values.subject}
                        onChange={onChange}
                        required
                      />
                      {errors.subject && <div className="invalid-feedback">{errors.subject}</div>}
                    </div>

                    <div className="col-12">
                      <label htmlFor="message" className="form-label">Message</label>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        className={`form-control ${errors.message ? "is-invalid" : ""}`}
                        value={values.message}
                        onChange={onChange}
                        placeholder="How can we help you?"
                        required
                      />
                      {errors.message && <div className="invalid-feedback">{errors.message}</div>}
                    </div>
                  </div>

                  <button type="submit" className="btn btn-primary mt-3 w-100" disabled={submitting}>
                    {submitting ? "Sending…" : "Send message"}
                  </button>
                </form>

                <div className="text-secondary small mt-3">
                  By sending this message you agree to be contacted about your request.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center py-4">
          <p className="text-secondary mb-2">Looking for a specific device?</p>
          <a href="/products" className="btn btn-outline-secondary">Browse products</a>
        </div>
      </div>
    </>
  );
}
