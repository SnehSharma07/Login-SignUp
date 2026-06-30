import { useState } from "react";
import AuthCard from "../components/AuthCard";
import { useRouter } from "../router";
import { useAuth } from "../context/AuthContext";
import { api } from "../api/client";

export default function Register() {
  const { navigate } = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const data = await api.post("/register", { email, password });
      login(data.token, email);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthCard
      eyebrow="Get started"
      title="Create your account"
      subtitle="Register below to obtain your session token."
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
          placeholder="•••••••• (Min. 6 characters)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          id="confirmPassword"
          type="password"
          required
          placeholder="••••••••"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        {error && <div className="form-status is-error">{error}</div>}

        <button type="submit" className="primary-btn" disabled={loading}>
          {loading ? "Creating account..." : "Register"}
        </button>
      </form>

      <p className="auth-foot">
        Already have an account?{" "}
        <a href="/login" onClick={(e) => { e.preventDefault(); navigate("/login"); }}>
          Sign in
        </a>
      </p>
    </AuthCard>
  );
}
