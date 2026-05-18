import { Users, TrendingUp, CheckCircle, XCircle } from "lucide-react";
import type { LeadStats } from "../../types/lead";

interface StatsCardsProps {
  stats: LeadStats;
}

interface StatDef {
  label: string;
  key: keyof LeadStats;
  icon: typeof Users;
  colorClass: string;
  iconClass: string;
}

const DEFS: StatDef[] = [
  { label: "Total Leads", key: "total", icon: Users, colorClass: "stat-card-blue", iconClass: "stat-icon-blue" },
  { label: "New Leads", key: "new", icon: TrendingUp, colorClass: "stat-card-amber", iconClass: "stat-icon-amber" },
  { label: "Qualified", key: "qualified", icon: CheckCircle, colorClass: "stat-card-green", iconClass: "stat-icon-green" },
  { label: "Lost", key: "lost", icon: XCircle, colorClass: "stat-card-red", iconClass: "stat-icon-red" },
];

export const StatsCards = ({ stats }: StatsCardsProps) => (
  <div className="stats-grid">
    {DEFS.map(({ label, key, icon: Icon, colorClass, iconClass }) => (
      <div key={label} className={`stat-card ${colorClass}`}>
        <div className="stat-card-header">
          <span className="stat-label">{label}</span>
          <div className={`stat-icon ${iconClass}`}>
            <Icon size={20} />
          </div>
        </div>
        <div className="stat-value">{stats[key]}</div>
      </div>
    ))}
  </div>
);
