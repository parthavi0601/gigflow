import { Zap } from "lucide-react";
import { AuthForm } from "../components/auth/AuthForm";

export const RegisterPage = () => (
  <div className="auth-page">
    <div
      className="glow-orb"
      style={{
        width: 350,
        height: 350,
        background: "rgba(91, 120, 245, 0.12)",
        top: -80,
        right: -80,
      }}
    />
    <div
      className="glow-orb"
      style={{
        width: 300,
        height: 300,
        background: "rgba(167, 139, 250, 0.1)",
        bottom: -60,
        left: -60,
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
          Create account
        </h1>
        <p style={{ fontSize: 14, color: "var(--text-muted)" }}>
          Join GigFlow and manage your leads
        </p>
      </div>

      <AuthForm mode="register" />
    </div>
  </div>
);
