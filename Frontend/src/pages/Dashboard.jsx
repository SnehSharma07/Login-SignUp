import { useEffect, useState } from "react";
import { api } from "../api/client";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { email, logout } = useAuth();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    api
      .get("/dashboard")
      .then((data) => {
        if (active) setMessage(data?.msg || "");
      })
      .catch((err) => {
        if (!active) return;
        setError(err.message || "Could not load the dashboard. Please sign in again.");
        if (err.status === 401) logout();
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="dashboard">
      <p className="eyebrow">Protected route</p>
      <h1>Dashboard</h1>
      <p className="hero-copy">
        Signed in as <strong>{email}</strong>. This page only loads because the
        request carried a valid <code>Authorization: Bearer</code> token.
      </p>

      <div className="dashboard-stats">
        <div className="stat-card">
          <p className="stat-label">Account</p>
          <p className="stat-value">{email}</p>
        </div>
        <div className="stat-card">
          <p className="stat-label">Auth method</p>
          <p className="stat-value">JWT</p>
        </div>
        <div className="stat-card">
          <p className="stat-label">Session status</p>
          <p className="stat-value">{loading ? "Checking…" : error ? "Invalid" : "Active"}</p>
        </div>
      </div>

      <div className="dashboard-panel">
        {loading && <p>Checking your token…</p>}
        {!loading && message && <p className="form-status is-success">{message}</p>}
        {!loading && error && <p className="form-status is-error">{error}</p>}
      </div>
    </section>
  );
}
