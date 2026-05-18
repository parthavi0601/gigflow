import { NavLink } from "react-router-dom";
import { LayoutDashboard, Users, ChevronLeft, ChevronRight, Zap } from "lucide-react";
import { ROUTES } from "../../constants/routes";
import { useUiStore } from "../../store/uiStore";
import { cn } from "../../utils/cn";

const NAV_ITEMS = [
  { to: ROUTES.DASHBOARD, icon: LayoutDashboard, label: "Dashboard" },
  { to: "/leads", icon: Users, label: "All Leads" },
];

export const Sidebar = () => {
  const { sidebarOpen, toggleSidebar } = useUiStore();

  return (
    <aside className={cn("sidebar", !sidebarOpen && "sidebar-collapsed")}>
      <div
        style={{
          padding: "20px 16px",
          display: "flex",
          alignItems: "center",
          gap: 10,
          borderBottom: "1px solid var(--surface-border)",
          minHeight: 64,
        }}
      >
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: "var(--radius-sm)",
            background: "linear-gradient(135deg, var(--brand-500), var(--brand-700))",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            boxShadow: "var(--shadow-brand)",
          }}
        >
          <Zap size={18} color="#fff" fill="#fff" />
        </div>
        {sidebarOpen && (
          <div>
            <p style={{ fontWeight: 800, fontSize: 15, color: "var(--text-primary)" }}>GigFlow</p>
            <p style={{ fontSize: 11, color: "var(--text-muted)" }}>Smart Leads Dashboard</p>
          </div>
        )}
      </div>

      <nav style={{ flex: 1, padding: "12px 8px", overflowY: "auto" }}>
        <p
          style={{
            fontSize: 10,
            fontWeight: 600,
            color: "var(--text-muted)",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            padding: "8px 12px",
            display: sidebarOpen ? "block" : "none",
          }}
        >
          Navigation
        </p>
        {NAV_ITEMS.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === ROUTES.DASHBOARD}
            className={({ isActive }) => cn("nav-item", isActive && "active")}
            title={!sidebarOpen ? label : undefined}
          >
            <Icon size={18} style={{ flexShrink: 0 }} />
            {sidebarOpen && <span>{label}</span>}
          </NavLink>
        ))}
      </nav>

      <div style={{ padding: "12px 8px", borderTop: "1px solid var(--surface-border)" }}>
        <button
          className="nav-item"
          onClick={toggleSidebar}
          style={{ justifyContent: sidebarOpen ? "flex-end" : "center" }}
          aria-label={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
        >
          {sidebarOpen ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
        </button>
      </div>
    </aside>
  );
};
