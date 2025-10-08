import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const USERS_KEY = "users";
const CURRENT_KEY = "currentUser";
const AuthCtx = createContext();

export function AuthProvider({ children }) {
  const [users, setUsers] = useState(() => JSON.parse(localStorage.getItem(USERS_KEY) || "[]"));
  const [currentUser, setCurrentUser] = useState(() => JSON.parse(localStorage.getItem(CURRENT_KEY) || "null"));

  useEffect(() => localStorage.setItem(USERS_KEY, JSON.stringify(users)), [users]);
  useEffect(() => localStorage.setItem(CURRENT_KEY, JSON.stringify(currentUser)), [currentUser]);

  function register({ name, email, password }) {
    if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
      throw new Error("Email already registered");
    }
    const id = (crypto?.randomUUID && crypto.randomUUID()) || String(Date.now());
    const newUser = { id, name, email, password }; // demo only
    setUsers(u => [...u, newUser]);
    setCurrentUser({ id, name, email });
  }

  function login({ email, password }) {
    const u = users.find(
      x => x.email.toLowerCase() === email.toLowerCase() && x.password === password
    );
    if (!u) throw new Error("Invalid credentials");
    setCurrentUser({ id: u.id, name: u.name, email: u.email });
  }

  function logout() { setCurrentUser(null); }

  const value = useMemo(() => ({ users, currentUser, register, login, logout }), [users, currentUser]);
  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}

export function useAuth() { return useContext(AuthCtx); }
