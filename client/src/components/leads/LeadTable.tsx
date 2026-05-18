import { useState } from "react";
import { Link } from "react-router-dom";
import { Pencil, Trash2, Eye, Globe, Users } from "lucide-react";
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

interface LeadTableProps {
  onEdit: (lead: Lead) => void;
}

const getSourceIcon = (source: string) => {
  if (source === "Website") return <Globe size={12} />;
  if (source === "Referral") return <Users size={12} />;
  return <span style={{ fontSize: 10 }}>IG</span>;
};

export const LeadTable = ({ onEdit }: LeadTableProps) => {
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
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: 64 }}>
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
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Source</th>
              <th>Created</th>
              <th>Added By</th>
              <th style={{ textAlign: "right" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead, i) => (
              <tr key={lead._id} className="table-row-fade" style={{ animationDelay: `${i * 30}ms` }}>
                <td>
                  <Link
                    to={ROUTES.LEAD_DETAILS(lead._id)}
                    style={{
                      fontWeight: 600,
                      color: "var(--brand-500)",
                      textDecoration: "none",
                      fontSize: 14,
                    }}
                  >
                    {lead.name}
                  </Link>
                </td>
                <td style={{ color: "var(--text-secondary)" }}>{lead.email}</td>
                <td>
                  <span className={`status-badge ${STATUS_COLORS[lead.status]}`}>
                    <span
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        background: "currentColor",
                        display: "inline-block",
                      }}
                    />
                    {lead.status}
                  </span>
                </td>
                <td>
                  <span className="source-badge">
                    {getSourceIcon(lead.source)}
                    {lead.source}
                  </span>
                </td>
                <td style={{ color: "var(--text-secondary)" }}>{formatDate(lead.createdAt)}</td>
                <td style={{ color: "var(--text-secondary)" }}>{lead.createdBy?.name ?? "—"}</td>
                <td>
                  <div style={{ display: "flex", gap: 4, justifyContent: "flex-end" }}>
                    <Link to={ROUTES.LEAD_DETAILS(lead._id)}>
                      <Button variant="ghost" size="icon" title="View lead">
                        <Eye size={15} />
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onEdit(lead)}
                      title="Edit lead"
                    >
                      <Pencil size={15} />
                    </Button>
                    {user?.role === "admin" && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setDeleteTarget(lead._id)}
                        title="Delete lead"
                        style={{ color: "var(--error)" }}
                      >
                        <Trash2 size={15} />
                      </Button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
