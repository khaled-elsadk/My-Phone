// src/contexts/ToastContext.js
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
// 👇 import Toast explicitly from bootstrap (ESM)
import { Toast as BsToast } from "bootstrap";

const ToastCtx = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const refs = useRef({}); // id -> element

  const notify = useCallback(({ title = "Notice", message = "", variant = "success", delay = 3500 }) => {
    const id = (crypto?.randomUUID && crypto.randomUUID()) || String(Date.now() + Math.random());
    setToasts((t) => [...t, { id, title, message, variant, delay }]);
    return id;
  }, []);

  useEffect(() => {
    toasts.forEach((t) => {
      const el = refs.current[t.id];
      if (!el || el.dataset.bsShown) return;
      el.dataset.bsShown = "1";

      // 👇 Use the imported BsToast instead of window.bootstrap.Toast
      const toast = new BsToast(el, { delay: t.delay, autohide: true });

      el.addEventListener("hidden.bs.toast", () => {
        setToasts((list) => list.filter((x) => x.id !== t.id));
      });
      toast.show();
    });
  }, [toasts]);

  return (
    <ToastCtx.Provider value={{ notify }}>
      {children}

      {/* container */}
      <div className="position-fixed bottom-0 end-0 p-3" style={{ zIndex: 1080 }}>
        {toasts.map((t) => (
          <div
            key={t.id}
            className="toast align-items-center text-bg-dark border-0 mb-2"
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
            ref={(el) => (refs.current[t.id] = el)}
          >
            <div className="toast-header">
              <span className={`badge bg-${t.variant} me-2`} style={{ width: 10, height: 10 }} aria-hidden="true" />
              <strong className="me-auto">{t.title}</strong>
              <small>now</small>
              <button type="button" className="btn-close ms-2" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            {t.message && <div className="toast-body">{t.message}</div>}
          </div>
        ))}
      </div>
    </ToastCtx.Provider>
  );
}

export function useToast() {
  return useContext(ToastCtx);
}
