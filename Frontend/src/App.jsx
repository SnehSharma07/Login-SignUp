import { useAuth } from "./context/AuthContext";
import { useRouter } from "./router";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

export default function App() {
  const { token, email, logout } = useAuth();
  const { currentPath, navigate } = useRouter();

  // Simple routing switch
  let page;
  if (currentPath === "/") {
    page = <Home />;
  } else if (currentPath === "/login") {
    // If already logged in, redirect to dashboard
    if (token) {
      setTimeout(() => navigate("/dashboard"), 0);
      page = <div className="dashboard-panel"><p>Redirecting to dashboard...</p></div>;
    } else {
      page = <Login />;
    }
  } else if (currentPath === "/register") {
    // If already logged in, redirect to dashboard
    if (token) {
      setTimeout(() => navigate("/dashboard"), 0);
      page = <div className="dashboard-panel"><p>Redirecting to dashboard...</p></div>;
    } else {
      page = <Register />;
    }
  } else if (currentPath === "/dashboard") {
    // If not logged in, redirect to login
    if (!token) {
      setTimeout(() => navigate("/login"), 0);
      page = <div className="dashboard-panel"><p>Redirecting to login...</p></div>;
    } else {
      page = <Dashboard />;
    }
  } else {
    page = (
      <div style={{ textAlign: "center", padding: "40px" }}>
        <h1>404 Page Not Found</h1>
        <p>The page you are looking for does not exist.</p>
        <button type="button" className="primary-btn" onClick={() => navigate("/")}>Go Home</button>
      </div>
    );
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <a href="/" className="brand" onClick={(e) => { e.preventDefault(); navigate("/"); }}>
          <span className="brand-mark" aria-hidden="true" />
          Acharya Access
        </a>
        <nav className="topbar-links">
          {token ? (
            <>
              <span className="topbar-email">{email}</span>
              <button type="button" className="ghost-btn" onClick={logout}>Sign out</button>
            </>
          ) : (
            <>
              <a href="/login" onClick={(e) => { e.preventDefault(); navigate("/login"); }}>Sign in</a>
              <button type="button" className="ghost-btn" onClick={() => navigate("/register")}>Register</button>
            </>
          )}
        </nav>
      </header>
      <main className="app-main">
        {page}
      </main>
    </div>
  );
}
