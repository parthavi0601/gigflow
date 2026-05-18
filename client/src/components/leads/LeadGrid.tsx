import { useState } from "react";
import { Link } from "react-router-dom";
import { Pencil, Trash2, Eye, Globe, Users, Mail } from "lucide-react";
import type { Lead } from "../../types/lead";
import { useAuthStore } from "../../store/authStore";
import { useLeadStore } from "../../store/leadStore";
import { STATUS_COLORS } from "../../constants/lead";
import { Button } from "../ui/Button";
import { Spinner } from "../ui/Spinner";
import { EmptyState } from "../ui/EmptyState";
import { ConfirmDialog } from "../ui/ConfirmDialog";
import { formatDate } from "../../utils/formatDate";
import { ROUTES } from "../../constants/routes";

interface LeadGridProps {
  onEdit: (lead: Lead) => void;
}

const sourceIcon = (source: string) => {
  if (source === "Website") return <Globe size={13} />;
  if (source === "Referral") return <Users size={13} />;
  return <span className="ig-dot">IG</span>;
};

export const LeadGrid = ({ onEdit }: LeadGridProps) => {
  const { leads, isLoading, deleteLead } = useLeadStore();
  const { user } = useAuthStore();
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      await deleteLead(deleteTarget);
    } finally {
      setIsDeleting(false);
      setDeleteTarget(null);
    }
  };

  if (isLoading) {
    return (
      <div className="grid-loading">
        <Spinner size="lg" style={{ color: "var(--brand-500)" }} />
      </div>
    );
  }

  if (leads.length === 0) {
    return (
      <EmptyState
        icon={<Users size={28} />}
        title="No leads found"
        description="Try adjusting your filters or create a new lead."
      />
    );
  }

  return (
    <>
      <div className="lead-grid">
        {leads.map((lead, i) => (
          <article
            key={lead._id}
            className="lead-card"
            style={{ animationDelay: `${i * 40}ms` }}
          >
            <div className="lead-card-top">
              <span className={`status-badge ${STATUS_COLORS[lead.status]}`}>
                <span className="status-dot" />
                {lead.status}
              </span>
              <span className="source-badge">
                {sourceIcon(lead.source)}
                {lead.source}
              </span>
            </div>

            <Link to={ROUTES.LEAD_DETAILS(lead._id)} className="lead-card-name">
              {lead.name}
            </Link>

            <p className="lead-card-email">
              <Mail size={13} />
              {lead.email}
            </p>

            <div className="lead-card-meta">
              <span>{formatDate(lead.createdAt)}</span>
              <span>{lead.createdBy?.name ?? "—"}</span>
            </div>

            <div className="lead-card-actions">
              <Link to={ROUTES.LEAD_DETAILS(lead._id)}>
                <Button variant="ghost" size="icon" title="View">
                  <Eye size={15} />
                </Button>
              </Link>
              <Button variant="ghost" size="icon" onClick={() => onEdit(lead)} title="Edit">
                <Pencil size={15} />
              </Button>
              {user?.role === "admin" && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setDeleteTarget(lead._id)}
                  title="Delete"
                  style={{ color: "var(--error)" }}
                >
                  <Trash2 size={15} />
                </Button>
              )}
            </div>
          </article>
        ))}
      </div>

      <ConfirmDialog
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Delete Lead"
        message="Are you sure you want to permanently delete this lead? This action cannot be undone."
        confirmLabel="Delete Lead"
        isLoading={isDeleting}
      />
    </>
  );
};
