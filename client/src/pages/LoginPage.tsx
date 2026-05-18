import { Zap } from "lucide-react";
import { AuthForm } from "../components/auth/AuthForm";

export const LoginPage = () => (
  <div className="auth-page">
    <div
      className="glow-orb"
      style={{
        width: 400,
        height: 400,
        background: "rgba(91, 120, 245, 0.15)",
        top: -100,
        left: -100,
      }}
    />
    <div
      className="glow-orb"
      style={{
        width: 300,
        height: 300,
        background: "rgba(167, 139, 250, 0.1)",
        bottom: -80,
        right: -80,
      }}
    />

    <div className="auth-card">
      <div style={{ textAlign: "center", marginBottom: 32 }}>
        <div
          style={{
            width: 52,
            height: 52,
            borderRadius: "var(--radius-md)",
            background: "linear-gradient(135deg, var(--brand-500), var(--brand-700))",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 16px",
            boxShadow: "var(--shadow-brand)",
          }}
        >
          <Zap size={24} color="#fff" fill="#fff" />
        </div>
        <h1 style={{ fontSize: 24, fontWeight: 800, color: "var(--text-primary)", marginBottom: 6 }}>
          Welcome back
        </h1>
        <p style={{ fontSize: 14, color: "var(--text-muted)" }}>
          Sign in to your GigFlow dashboard
        </p>
      </div>

      <div
        style={{
          background: "var(--surface-2)",
          borderRadius: "var(--radius-sm)",
          padding: "10px 16px",
          marginBottom: 24,
          fontSize: 13,
          color: "var(--text-secondary)",
          border: "1px solid var(--surface-border)",
        }}
      >
        <strong style={{ color: "var(--text-primary)" }}>Demo: </strong>
        admin@example.com / Admin@123
      </div>

      <AuthForm mode="login" />
    </div>
  </div>
);
