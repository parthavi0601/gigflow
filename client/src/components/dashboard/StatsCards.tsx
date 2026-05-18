import { Users, TrendingUp, CheckCircle, XCircle } from "lucide-react";
import type { Lead } from "../../types/lead";

interface StatsCardsProps {
  leads: Lead[];
  total: number;
}

interface StatDef {
  label: string;
  value: number;
  icon: typeof Users;
  colorClass: string;
  iconClass: string;
}

export const StatsCards = ({ leads, total }: StatsCardsProps) => {
  const qualified = leads.filter((l) => l.status === "Qualified").length;
  const newLeads = leads.filter((l) => l.status === "New").length;
  const lost = leads.filter((l) => l.status === "Lost").length;

  const stats: StatDef[] = [
    { label: "Total Leads", value: total, icon: Users, colorClass: "stat-card-blue", iconClass: "stat-icon-blue" },
    { label: "New Leads", value: newLeads, icon: TrendingUp, colorClass: "stat-card-amber", iconClass: "stat-icon-amber" },
    { label: "Qualified", value: qualified, icon: CheckCircle, colorClass: "stat-card-green", iconClass: "stat-icon-green" },
    { label: "Lost", value: lost, icon: XCircle, colorClass: "stat-card-red", iconClass: "stat-icon-red" },
  ];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: 16,
        marginBottom: 24,
      }}
    >
      {stats.map(({ label, value, icon: Icon, colorClass, iconClass }) => (
        <div key={label} className={`stat-card ${colorClass}`}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span className="stat-label">{label}</span>
            <div className={`stat-icon ${iconClass}`}>
              <Icon size={20} />
            </div>
          </div>
          <div className="stat-value">{value}</div>
        </div>
      ))}
    </div>
  );
};
