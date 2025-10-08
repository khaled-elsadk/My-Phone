import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export default function Register() {
  const { register } = useAuth();
  const nav = useNavigate();
  const loc = useLocation();

  const [values, setValues] = useState({ name: "", email: "", password: "", confirm: "" });
  const [error, setError] = useState("");
  const [ok, setOk] = useState("");

  const onChange = (e) => setValues(v => ({ ...v, [e.target.name]: e.target.value }));

  const onSubmit = (e) => {
    e.preventDefault();
    setError(""); setOk("");
    try {
      if (!values.name) throw new Error("Name is required");
      if (!values.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) throw new Error("Invalid email");
      if (values.password.length < 6) throw new Error("Password must be at least 6 characters");
      if (values.password !== values.confirm) throw new Error("Passwords do not match");
      register({ name: values.name, email: values.email, password: values.password });
      setOk("Account created successfully");
      const to = loc.state?.from?.pathname || "/products";
      setTimeout(() => nav(to, { replace: true }), 500);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="card p-4 shadow-sm" style={{maxWidth:520, margin:"0 auto"}}>
      <h3 className="fw-bold mb-3">Create account</h3>
      {ok && <div className="alert alert-success">{ok}</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={onSubmit} noValidate>
        <div className="mb-3">
          <label className="form-label" htmlFor="name">Name</label>
          <input id="name" name="name" className="form-control"
                 value={values.name} onChange={onChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="email">Email</label>
          <input id="email" name="email" type="email" className="form-control"
                 value={values.email} onChange={onChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="password">Password</label>
          <input id="password" name="password" type="password" className="form-control"
                 value={values.password} onChange={onChange} required minLength={6} />
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="confirm">Confirm Password</label>
          <input id="confirm" name="confirm" type="password" className="form-control"
                 value={values.confirm} onChange={onChange} required />
        </div>
        <button type="submit" className="btn btn-primary w-100">Register</button>
      </form>
      <p className="mt-3">Already have an account? <Link to="/login">Login</Link></p>
    </div>
  );
}
