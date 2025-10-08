import React, { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const nav = useNavigate();
  const loc = useLocation();

  const [values, setValues] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const from = loc.state?.from?.pathname || "/products";
  const note = loc.state?.message;

  const onChange = (e) => setValues(v => ({ ...v, [e.target.name]: e.target.value }));

  const onSubmit = (e) => {
    e.preventDefault();
    setError("");
    try {
      if (!values.email || !values.password) throw new Error("Email and password are required");
      login(values);
      nav(from, { replace: true });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="card p-4 shadow-sm" style={{maxWidth:520, margin:"0 auto"}}>
      <h3 className="fw-bold mb-3">Sign in</h3>
      {note && <div className="alert alert-info">{note}</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={onSubmit} noValidate>
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
        <button type="submit" className="btn btn-primary w-100">Login</button>
      </form>
      <p className="mt-3">No account? <Link to="/register">Register</Link></p>
    </div>
  );
}
