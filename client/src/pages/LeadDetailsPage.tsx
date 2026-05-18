import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  ArrowLeft,
  Mail,
  Calendar,
  Globe,
  Users,
  User,
  Pencil,
  Phone,
  MessageSquare,
  PhoneCall,
  Send,
} from "lucide-react";
import type { ElementType } from "react";
import { DashboardLayout } from "../components/layout/DashboardLayout";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Spinner } from "../components/ui/Spinner";
import { LeadFormModal } from "../components/leads/LeadFormModal";
import { leadsApi } from "../api/leadsApi";
import { STATUS_COLORS } from "../constants/lead";
import { formatDateTime } from "../utils/formatDate";
import { ROUTES } from "../constants/routes";
import type { Lead, LeadSource } from "../types/lead";

const SOURCE_ICON_MAP: Record<LeadSource, ElementType> = { Website: Globe, Instagram: Users, Referral: Users };

export const LeadDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [lead, setLead] = useState<Lead | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [editOpen, setEditOpen] = useState(false);

  useEffect(() => {
    if (!id) return;
    setIsLoading(true);
    leadsApi.getById(id).then((res) => {
      setLead(res.data.data);
      setIsLoading(false);
    }).catch(() => {
      navigate(ROUTES.NOT_FOUND, { replace: true });
    });
  }, [id, navigate]);

  if (isLoading) {
    return (
      <DashboardLayout title="Lead Details">
        <div style={{ display: "flex", justifyContent: "center", padding: 80 }}>
          <Spinner size="lg" style={{ color: "var(--brand-500)" }} />
        </div>
      </DashboardLayout>
    );
  }

  if (!lead) return null;

  const SourceIcon = SOURCE_ICON_MAP[lead.source];

  return (
    <DashboardLayout title="Lead Details">
      <div style={{ maxWidth: 1100 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
          <Link to={ROUTES.LEADS}>
            <Button variant="ghost" size="icon">
              <ArrowLeft size={18} />
            </Button>
          </Link>
          <h2 style={{ fontSize: 20, fontWeight: 800, color: "var(--text-primary)", flex: 1 }}>
            {lead.name}
          </h2>
          <Button variant="primary" size="sm" onClick={() => setEditOpen(true)}>
            <Pencil size={14} />
            Edit Lead
          </Button>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 24, alignItems: "start" }}>
          {/* Left Column */}
          <div style={{ display: "grid", gap: 16 }}>
            <Card>
              <div style={{ padding: 24 }}>
                <div
                  style={{
                    width: 72,
                    height: 72,
                    borderRadius: "var(--radius-md)",
                    background: "linear-gradient(135deg, var(--brand-500), var(--brand-700))",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 20,
                    boxShadow: "var(--shadow-brand)",
                  }}
                >
                  <User size={32} color="#fff" />
                </div>

                <h3 style={{ fontSize: 24, fontWeight: 800, color: "var(--text-primary)", marginBottom: 4 }}>
                  {lead.name}
                </h3>
                <p style={{ fontSize: 15, color: "var(--text-secondary)", marginBottom: 4 }}>
                  {lead.email}
                </p>
                {lead.phone && (
                  <p style={{ fontSize: 15, color: "var(--text-secondary)", marginBottom: 20 }}>
                    {lead.phone}
                  </p>
                )}

                <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: lead.phone ? 0 : 16 }}>
                  <span className={`status-badge ${STATUS_COLORS[lead.status]}`}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: "currentColor", display: "inline-block" }} />
                    {lead.status}
                  </span>
                  <span className="source-badge">
                    <SourceIcon size={12} />
                    {lead.source}
                  </span>
                </div>
              </div>
            </Card>

            {lead.lastMessage && (
              <Card>
                <div style={{ padding: 24, display: "grid", gap: 16 }}>
                  <h3 style={{ fontSize: 14, fontWeight: 700, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.06em", display: "flex", alignItems: "center", gap: 8 }}>
                    <MessageSquare size={16} />
                    Last Message
                  </h3>
                  <div style={{ padding: 16, background: "var(--surface-1)", borderRadius: "var(--radius-md)", border: "1px solid var(--surface-border)" }}>
                    <p style={{ fontSize: 15, color: "var(--text-primary)", lineHeight: 1.5, whiteSpace: "pre-wrap" }}>
                      {lead.lastMessage}
                    </p>
                  </div>
                </div>
              </Card>
            )}
          </div>

          {/* Right Column */}
          <div style={{ display: "grid", gap: 16 }}>
            <Card>
              <div style={{ padding: "20px 24px", borderBottom: "1px solid var(--surface-border)" }}>
                <h3 style={{ fontSize: 14, fontWeight: 700, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                  Quick Actions
                </h3>
              </div>
              <div style={{ padding: 24, display: "grid", gap: 12 }}>
                {lead.phone ? (
                  <a href={`tel:${lead.phone.replace(/[^0-9+]/g, '')}`} style={{ textDecoration: "none" }}>
                    <Button variant="secondary" style={{ width: "100%", justifyContent: "center" }}>
                      <PhoneCall size={15} />
                      Call {lead.phone}
                    </Button>
                  </a>
                ) : (
                  <Button variant="secondary" style={{ width: "100%", justifyContent: "center" }} disabled title="No phone number available">
                    <PhoneCall size={15} />
                    Log a Call
                  </Button>
                )}
                
                <a 
                  href={`https://mail.google.com/mail/?view=cm&fs=1&to=${lead.email}&su=${encodeURIComponent("Following up regarding your inquiry")}`} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  style={{ textDecoration: "none" }}
                >
                  <Button variant="secondary" style={{ width: "100%", justifyContent: "center" }}>
                    <Send size={15} />
                    Gmail {lead.email}
                  </Button>
                </a>
              </div>
            </Card>

            <Card>
              <div style={{ padding: "20px 24px", borderBottom: "1px solid var(--surface-border)" }}>
                <h3 style={{ fontSize: 14, fontWeight: 700, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                  Details
                </h3>
              </div>
              <div style={{ padding: 24, display: "grid", gap: 16 }}>
                {[
                  { icon: Mail, label: "Email", value: lead.email },
                  ...(lead.phone ? [{ icon: Phone, label: "Phone", value: lead.phone }] : []),
                  { icon: SourceIcon, label: "Source", value: lead.source },
                  { icon: User, label: "Added By", value: lead.createdBy?.name ?? "Unknown" },
                  { icon: Calendar, label: "Created", value: formatDateTime(lead.createdAt) },
                  { icon: Calendar, label: "Updated", value: formatDateTime(lead.updatedAt) },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: "var(--radius-sm)",
                        background: "var(--surface-2)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "var(--text-muted)",
                        flexShrink: 0,
                      }}
                    >
                      <Icon size={16} />
                    </div>
                    <div style={{ minWidth: 0 }}>
                      <p style={{ fontSize: 12, color: "var(--text-muted)", fontWeight: 500 }}>{label}</p>
                      <p style={{ fontSize: 14, color: "var(--text-primary)", fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>

      <LeadFormModal
        isOpen={editOpen}
        onClose={() => setEditOpen(false)}
        editLead={lead}
      />
    </DashboardLayout>
  );
};
