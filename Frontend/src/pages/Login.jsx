import { useState } from "react";
import AuthCard from "../components/AuthCard";
import { useRouter } from "../router";
import { useAuth } from "../context/AuthContext";
import { api } from "../api/client";

export default function Login() {
  const { navigate } = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await api.post("/login", { email, password });
      login(data.token, email);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthCard
      eyebrow="Welcome back"
      title="Sign in to your account"
      subtitle="Enter your credentials to access the protected dashboard."
    >
      <form className="auth-form" onSubmit={handleSubmit}>
        <label htmlFor="email">Email Address</label>
        <input
          id="email"
          type="email"
          required
          placeholder="name@domain.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          required
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <div className="form-status is-error">{error}</div>}

        <button type="submit" className="primary-btn" disabled={loading}>
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </form>

      <p className="auth-foot">
        Don't have an account?{" "}
        <a href="/register" onClick={(e) => { e.preventDefault(); navigate("/register"); }}>
          Create one
        </a>
      </p>
    </AuthCard>
  );
}
