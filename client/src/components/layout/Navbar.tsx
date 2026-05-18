import { Moon, Sun, LogOut, Menu, User } from "lucide-react";
import { Button } from "../ui/Button";
import { useAuthStore } from "../../store/authStore";
import { useUiStore } from "../../store/uiStore";
import { useTheme } from "../../hooks/useTheme";

interface NavbarProps {
  title?: string;
}

export const Navbar = ({ title = "Dashboard" }: NavbarProps) => {
  const { user, logout } = useAuthStore();
  const { toggleSidebar } = useUiStore();
  const { isDark, toggleTheme } = useTheme();

  return (
    <header className="navbar">
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <Button variant="ghost" size="icon" onClick={toggleSidebar} aria-label="Toggle sidebar">
          <Menu size={18} />
        </Button>
        <h1 style={{ fontSize: 16, fontWeight: 700, color: "var(--text-primary)" }}>{title}</h1>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
          {isDark ? <Sun size={18} /> : <Moon size={18} />}
        </Button>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "6px 12px",
            borderRadius: "var(--radius-sm)",
            background: "var(--surface-2)",
            border: "1px solid var(--surface-border)",
          }}
        >
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: "50%",
              background: "linear-gradient(135deg, var(--brand-500), var(--brand-700))",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <User size={14} color="#fff" />
          </div>
          <div>
            <p style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)", lineHeight: 1 }}>
              {user?.name}
            </p>
            <p style={{ fontSize: 11, color: "var(--text-muted)", lineHeight: 1.4, textTransform: "capitalize" }}>
              {user?.role}
            </p>
          </div>
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={logout}
          aria-label="Logout"
          title="Logout"
        >
          <LogOut size={18} />
        </Button>
      </div>
    </header>
  );
};
