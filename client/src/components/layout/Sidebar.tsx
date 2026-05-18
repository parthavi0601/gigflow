import { NavLink } from "react-router-dom";
import { LayoutDashboard, Users, ChevronLeft, ChevronRight, Zap } from "lucide-react";
import { ROUTES } from "../../constants/routes";
import { useUiStore } from "../../store/uiStore";
import { cn } from "../../utils/cn";

const NAV_ITEMS = [
  { to: ROUTES.DASHBOARD, icon: LayoutDashboard, label: "Dashboard" },
  { to: ROUTES.LEADS, icon: Users, label: "All Leads" },
];

export const Sidebar = () => {
  const { sidebarOpen, toggleSidebar } = useUiStore();

  return (
    <aside className={cn("sidebar", !sidebarOpen && "sidebar-collapsed")}>
      <div className="sidebar-brand">
        <div className="sidebar-logo">
          <Zap size={18} color="#fff" fill="#fff" />
        </div>
        {sidebarOpen && (
          <div>
            <p className="sidebar-name">GigFlow</p>
            <p className="sidebar-tag">Leads OS</p>
          </div>
        )}
      </div>

      <nav className="sidebar-nav">
        {sidebarOpen && <p className="sidebar-label">Menu</p>}
        {NAV_ITEMS.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === ROUTES.DASHBOARD}
            className={({ isActive }) => cn("nav-item", isActive && "active")}
            title={!sidebarOpen ? label : undefined}
          >
            <Icon size={18} />
            {sidebarOpen && <span>{label}</span>}
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <button
          type="button"
          className="nav-item sidebar-toggle"
          onClick={toggleSidebar}
          aria-label={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
        >
          {sidebarOpen ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
        </button>
      </div>
    </aside>
  );
};
