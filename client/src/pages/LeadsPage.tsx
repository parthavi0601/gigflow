import { useEffect, useState } from "react";
import { Plus, Download, LayoutGrid, List, X } from "lucide-react";
import { DashboardLayout } from "../components/layout/DashboardLayout";
import { SearchBar } from "../components/leads/SearchBar";
import { FilterBar } from "../components/leads/FilterBar";
import { StatusChips } from "../components/leads/StatusChips";
import { LeadTable } from "../components/leads/LeadTable";
import { LeadGrid } from "../components/leads/LeadGrid";
import { Pagination } from "../components/leads/Pagination";
import { LeadFormModal } from "../components/leads/LeadFormModal";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { useLeadStore } from "../store/leadStore";
import { useAuthStore } from "../store/authStore";
import { leadsApi } from "../api/leadsApi";
import { downloadFile } from "../utils/downloadFile";
import { cn } from "../utils/cn";
import type { Lead } from "../types/lead";

type ViewMode = "table" | "grid";

export const LeadsPage = () => {
  const { pagination, filters, fetchLeads, setFilters } = useLeadStore();
  const { user } = useAuthStore();
  const [modalOpen, setModalOpen] = useState(false);
  const [editLead, setEditLead] = useState<Lead | null>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>("grid");

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  const handleEdit = (lead: Lead) => {
    setEditLead(lead);
    setModalOpen(true);
  };

  const handleExport = async () => {
    setIsExporting(true);
    try {
      const res = await leadsApi.exportCsv(filters);
      downloadFile(res.data as Blob, "gigflow-leads.csv");
    } finally {
      setIsExporting(false);
    }
  };

  const hasFilters = !!(filters.status || filters.source || filters.search);

  const clearFilters = () =>
    setFilters({ status: undefined, source: undefined, search: undefined, page: 1 });

  return (
    <DashboardLayout title="All Leads">
      <section className="page-hero">
        <div>
          <h2 className="page-hero-title font-display">
            Lead <span className="gradient-text">Pipeline</span>
          </h2>
          <p className="page-hero-sub">
            {pagination.total} leads · filter, search, and manage in one place
          </p>
        </div>
        <div className="page-hero-actions">
          {user?.role === "admin" && (
            <Button variant="secondary" size="sm" onClick={handleExport} loading={isExporting}>
              <Download size={15} />
              Export CSV
            </Button>
          )}
          <Button variant="primary" size="sm" onClick={() => { setEditLead(null); setModalOpen(true); }}>
            <Plus size={15} />
            Add Lead
          </Button>
        </div>
      </section>

      <Card className="leads-card">
        <div className="leads-toolbar">
          <SearchBar />
          <div className="view-toggle">
            <button
              type="button"
              className={cn("view-btn", viewMode === "grid" && "active")}
              onClick={() => setViewMode("grid")}
              aria-label="Grid view"
            >
              <LayoutGrid size={16} />
            </button>
            <button
              type="button"
              className={cn("view-btn", viewMode === "table" && "active")}
              onClick={() => setViewMode("table")}
              aria-label="Table view"
            >
              <List size={16} />
            </button>
          </div>
        </div>

        <div className="leads-filters-row">
          <StatusChips />
          <FilterBar />
        </div>

        {hasFilters && (
          <div className="active-filters">
            <span className="active-filters-label">Active:</span>
            {filters.status && <span className="active-tag">{filters.status}</span>}
            {filters.source && <span className="active-tag">{filters.source}</span>}
            {filters.search && <span className="active-tag">"{filters.search}"</span>}
            <button type="button" className="clear-filters" onClick={clearFilters}>
              <X size={13} />
              Clear all
            </button>
          </div>
        )}

        {viewMode === "grid" ? <LeadGrid onEdit={handleEdit} /> : <LeadTable onEdit={handleEdit} />}
        <Pagination />
      </Card>

      <LeadFormModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        editLead={editLead}
      />
    </DashboardLayout>
  );
};
