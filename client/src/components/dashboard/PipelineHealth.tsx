import { TrendingUp, Users } from "lucide-react";
import { Card } from "../ui/Card";
import type { LeadStats } from "../../types/lead";

interface PipelineHealthProps {
  stats: LeadStats;
}

export const PipelineHealth = ({ stats }: PipelineHealthProps) => {
  const activeLeads = stats.total - stats.lost;
  const conversionRate = stats.total > 0 ? Math.round((stats.qualified / stats.total) * 100) : 0;
  
  // Calculate percentages for the progress bar segments
  const newPct = stats.total > 0 ? (stats.new / stats.total) * 100 : 0;
  const contactedPct = stats.total > 0 ? (stats.contacted / stats.total) * 100 : 0;
  const qualifiedPct = stats.total > 0 ? (stats.qualified / stats.total) * 100 : 0;

  return (
    <div style={{ marginTop: 24 }}>
      <Card className="pipeline-health">
      <div style={{ padding: 24 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 24 }}>
          <div>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: "var(--text-primary)", marginBottom: 4 }}>
              Pipeline Health
            </h3>
            <p style={{ fontSize: 14, color: "var(--text-secondary)" }}>
              Overview of your current lead conversion funnel.
            </p>
          </div>
          <div style={{ textAlign: "right" }}>
            <span style={{ fontSize: 32, fontWeight: 800, color: "var(--brand-500)", lineHeight: 1 }}>
              {conversionRate}%
            </span>
            <p style={{ fontSize: 13, color: "var(--text-muted)", fontWeight: 500, marginTop: 4 }}>
              Win Rate
            </p>
          </div>
        </div>

        {/* Funnel Progress Bar */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, fontWeight: 600, color: "var(--text-secondary)", marginBottom: 8 }}>
            <span>New ({stats.new})</span>
            <span>Contacted ({stats.contacted})</span>
            <span>Qualified ({stats.qualified})</span>
          </div>
          <div 
            style={{ 
              height: 12, 
              borderRadius: 6, 
              background: "var(--surface-2)", 
              display: "flex", 
              overflow: "hidden",
              boxShadow: "inset 0 1px 3px rgba(0,0,0,0.05)"
            }}
          >
            <div style={{ width: `${newPct}%`, background: "var(--info)", transition: "width 1s ease-in-out" }} title={`New: ${stats.new}`} />
            <div style={{ width: `${contactedPct}%`, background: "var(--warning)", transition: "width 1s ease-in-out" }} title={`Contacted: ${stats.contacted}`} />
            <div style={{ width: `${qualifiedPct}%`, background: "var(--success)", transition: "width 1s ease-in-out" }} title={`Qualified: ${stats.qualified}`} />
          </div>
        </div>

        {/* Actionable Insights */}
        <div className="pipeline-insights-grid">
          <div style={{ display: "flex", gap: 12, padding: 16, background: "var(--surface-1)", borderRadius: "var(--radius-md)", border: "1px solid var(--surface-border)" }}>
            <div style={{ width: 40, height: 40, borderRadius: "50%", background: "var(--brand-50)", color: "var(--brand-500)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Users size={20} />
            </div>
            <div>
              <p style={{ fontSize: 13, color: "var(--text-muted)", fontWeight: 500 }}>Active Pipeline</p>
              <p style={{ fontSize: 16, fontWeight: 700, color: "var(--text-primary)" }}>{activeLeads} Leads</p>
            </div>
          </div>

          <div style={{ display: "flex", gap: 12, padding: 16, background: "var(--surface-1)", borderRadius: "var(--radius-md)", border: "1px solid var(--surface-border)" }}>
            <div style={{ width: 40, height: 40, borderRadius: "50%", background: "rgba(34, 197, 94, 0.1)", color: "var(--success)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <TrendingUp size={20} />
            </div>
            <div>
              <p style={{ fontSize: 13, color: "var(--text-muted)", fontWeight: 500 }}>Lost Opportunities</p>
              <p style={{ fontSize: 16, fontWeight: 700, color: "var(--text-primary)" }}>{stats.lost} Leads</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
    </div>
  );
};
