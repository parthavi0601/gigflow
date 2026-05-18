import { Link } from "react-router-dom";
import { Home, Zap } from "lucide-react";
import { ROUTES } from "../constants/routes";
import { Button } from "../components/ui/Button";

export const NotFoundPage = () => (
  <div
    style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      background: "var(--surface-1)",
      gap: 24,
      textAlign: "center",
      padding: 24,
    }}
  >
    <div
      style={{
        width: 80,
        height: 80,
        borderRadius: "var(--radius-xl)",
        background: "linear-gradient(135deg, var(--brand-500), var(--brand-700))",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "var(--shadow-brand)",
      }}
    >
      <Zap size={36} color="#fff" fill="#fff" />
    </div>

    <div>
      <p
        style={{
          fontSize: 96,
          fontWeight: 800,
          lineHeight: 1,
          background: "linear-gradient(135deg, var(--brand-500), #a78bfa)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        404
      </p>
      <h1 style={{ fontSize: 24, fontWeight: 700, color: "var(--text-primary)", marginBottom: 8 }}>
        Page not found
      </h1>
      <p style={{ fontSize: 15, color: "var(--text-muted)" }}>
        The page you're looking for doesn't exist.
      </p>
    </div>

    <Link to={ROUTES.DASHBOARD}>
      <Button variant="primary">
        <Home size={16} />
        Back to Dashboard
      </Button>
    </Link>
  </div>
);
