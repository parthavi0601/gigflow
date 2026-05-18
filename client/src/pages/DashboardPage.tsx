import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Plus, Sparkles } from "lucide-react";
import { DashboardLayout } from "../components/layout/DashboardLayout";
import { StatsCards } from "../components/dashboard/StatsCards";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Spinner } from "../components/ui/Spinner";
import { useAuthStore } from "../store/authStore";
import { leadsApi } from "../api/leadsApi";
import { ROUTES } from "../constants/routes";
import { STATUS_COLORS } from "../constants/lead";
import type { Lead, LeadStats } from "../types/lead";

export const DashboardPage = () => {
  const { user } = useAuthStore();
  const [stats, setStats] = useState<LeadStats | null>(null);
  const [recent, setRecent] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const [statsRes, leadsRes] = await Promise.all([
          leadsApi.getStats(),
          leadsApi.getAll({ sort: "latest", page: 1, limit: 5 }),
        ]);
        setStats(statsRes.data.data);
        setRecent(leadsRes.data.data);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <DashboardLayout title="Dashboard">
      <div className="dashboard-grid">
        <div className="dashboard-main">
          <section className="welcome-banner">
            <div className="welcome-text">
              <p className="welcome-greeting">
                <Sparkles size={14} />
                {greeting}
              </p>
              <h2 className="welcome-title font-display">
                Hey, <span className="gradient-text">{user?.name?.split(" ")[0]}</span>
              </h2>
              <p className="welcome-sub">Your pipeline at a glance — stay ahead of every deal.</p>
            </div>
            <Link to={ROUTES.LEADS}>
              <Button variant="primary" size="sm">
                <Plus size={15} />
                New Lead
              </Button>
            </Link>
          </section>

          {loading ? (
            <div className="dashboard-loading">
              <Spinner size="lg" style={{ color: "var(--brand-500)" }} />
            </div>
          ) : stats ? (
            <StatsCards stats={stats} />
          ) : null}
        </div>

        <Card className="recent-card">
          <div className="recent-header">
            <div>
              <h3 className="recent-title font-display">Recent Leads</h3>
              <p className="recent-sub">Latest additions</p>
            </div>
            <Link to={ROUTES.LEADS} className="view-all-link">
              View all
              <ArrowRight size={14} />
            </Link>
          </div>

          {loading ? (
            <div className="recent-loading">
              <Spinner size="md" style={{ color: "var(--brand-500)" }} />
            </div>
          ) : recent.length === 0 ? (
            <p className="recent-empty">No leads yet. Create your first one!</p>
          ) : (
            <ul className="recent-list">
              {recent.map((lead, i) => (
                <li key={lead._id} className="recent-item" style={{ animationDelay: `${i * 60}ms` }}>
                  <Link to={ROUTES.LEAD_DETAILS(lead._id)} className="recent-item-link">
                    <span className="recent-avatar">{lead.name.charAt(0).toUpperCase()}</span>
                    <div className="recent-info">
                      <span className="recent-name">{lead.name}</span>
                      <span className="recent-email">{lead.email}</span>
                    </div>
                    <span className={`status-badge ${STATUS_COLORS[lead.status]}`}>
                      {lead.status}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>
    </DashboardLayout>
  );
};
