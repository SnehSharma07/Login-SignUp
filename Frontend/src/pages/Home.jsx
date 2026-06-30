import { useEffect, useState } from "react";
import { api } from "../api/client";
import { useRouter } from "../router";

const FEATURES = [
  {
    icon: "🔐",
    title: "Hashed passwords",
    desc: "Credentials are never stored in plain text on the server.",
  },
  {
    icon: "🪪",
    title: "JWT sessions",
    desc: "Every protected request carries a signed access token.",
  },
  {
    icon: "⚡",
    title: "Instant access",
    desc: "Register once and land straight on your dashboard.",
  },
];

export default function Home() {
  const [message, setMessage] = useState("");
  const { navigate } = useRouter();

  useEffect(() => {
    api
      .get("/home")
      .then((data) => setMessage(data?.message || ""))
      .catch(() => setMessage(""));
  }, []);

  return (
    <section className="hero">
      <p className="eyebrow">Acharya access platform</p>
      <h1>
        A vault for your <span className="accent">account</span>, not your secrets.
      </h1>
      <p className="hero-copy">
        Register once, sign in with a hashed password, and reach protected pages
        with a JSON web token issued by the backend.
      </p>
      {message && <p className="hero-pong">Backend says: "{message}"</p>}

      <div className="hero-actions">
        <button type="button" className="primary-btn" onClick={() => navigate("/register")}>
          Create account
        </button>
        <button type="button" className="ghost-btn" onClick={() => navigate("/login")}>
          Sign in
        </button>
      </div>

      <div className="feature-grid">
        {FEATURES.map((f) => (
          <div className="feature-card" key={f.title}>
            <div className="feature-card-icon">{f.icon}</div>
            <h3>{f.title}</h3>
            <p>{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
