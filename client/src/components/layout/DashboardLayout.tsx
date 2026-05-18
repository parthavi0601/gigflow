import type { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { Navbar } from "./Navbar";
import { useUiStore } from "../../store/uiStore";
import { cn } from "../../utils/cn";

interface DashboardLayoutProps {
  children: ReactNode;
  title?: string;
}

export const DashboardLayout = ({ children, title }: DashboardLayoutProps) => {
  const { sidebarOpen } = useUiStore();

  return (
    <div className="page-layout">
      <div className="mesh-bg" aria-hidden="true">
        <div className="mesh-orb mesh-orb-1" />
        <div className="mesh-orb mesh-orb-2" />
        <div className="mesh-orb mesh-orb-3" />
      </div>
      <Sidebar />
      <div className={cn("main-content", !sidebarOpen && "main-content-collapsed")}>
        <Navbar title={title} />
        <main className="page-content">{children}</main>
      </div>
    </div>
  );
};
