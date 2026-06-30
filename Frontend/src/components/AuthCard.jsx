export default function AuthCard({ eyebrow, title, subtitle, children }) {
  return (
    <div className="auth-shell">
      <div className="auth-card">
        <div className="auth-mark" aria-hidden="true" />
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1>{title}</h1>
        {subtitle && <p className="auth-subtitle">{subtitle}</p>}
        {children}
      </div>
    </div>
  );
}
