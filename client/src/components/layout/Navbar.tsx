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
        <h1 className="navbar-title">{title}</h1>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <Button
          variant="ghost"
          size="icon"
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
          {isDark ? <Sun size={18} /> : <Moon size={18} />}
        </Button>

        <div className="navbar-user">
          <div className="navbar-avatar">
            <User size={14} color="#fff" />
          </div>
          <div>
            <p className="navbar-user-name">{user?.name}</p>
            <p className="navbar-user-role">{user?.role}</p>
          </div>
        </div>

        <Button variant="ghost" size="icon" onClick={logout} aria-label="Logout" title="Logout">
          <LogOut size={18} />
        </Button>
      </div>
    </header>
  );
};
