import { useEffect, useState } from "react";
import { Plus, Download } from "lucide-react";
import { DashboardLayout } from "../components/layout/DashboardLayout";
import { StatsCards } from "../components/dashboard/StatsCards";
import { SearchBar } from "../components/leads/SearchBar";
import { FilterBar } from "../components/leads/FilterBar";
import { LeadTable } from "../components/leads/LeadTable";
import { Pagination } from "../components/leads/Pagination";
import { LeadFormModal } from "../components/leads/LeadFormModal";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { useLeadStore } from "../store/leadStore";
import { useAuthStore } from "../store/authStore";
import { leadsApi } from "../api/leadsApi";
import { downloadFile } from "../utils/downloadFile";
import type { Lead } from "../types/lead";

export const DashboardPage = () => {
  const { leads, pagination, filters, fetchLeads } = useLeadStore();
  const { user } = useAuthStore();
  const [modalOpen, setModalOpen] = useState(false);
  const [editLead, setEditLead] = useState<Lead | null>(null);
  const [isExporting, setIsExporting] = useState(false);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  const handleEdit = (lead: Lead) => {
    setEditLead(lead);
    setModalOpen(true);
  };

  const handleAdd = () => {
    setEditLead(null);
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

  return (
    <DashboardLayout title="Dashboard">
      <StatsCards leads={leads} total={pagination.total} />

      <Card>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "20px 20px 16px",
            flexWrap: "wrap",
            gap: 12,
            borderBottom: "1px solid var(--surface-border)",
          }}
        >
          <div>
            <h2 style={{ fontSize: 16, fontWeight: 700, color: "var(--text-primary)" }}>
              All Leads
            </h2>
            <p style={{ fontSize: 13, color: "var(--text-muted)" }}>
              {pagination.total} total leads
            </p>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            {user?.role === "admin" && (
              <Button variant="secondary" size="sm" onClick={handleExport} loading={isExporting}>
                <Download size={15} />
                Export CSV
              </Button>
            )}
            <Button variant="primary" size="sm" onClick={handleAdd}>
              <Plus size={15} />
              Add Lead
            </Button>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "14px 20px",
            borderBottom: "1px solid var(--surface-border)",
            flexWrap: "wrap",
          }}
        >
          <SearchBar />
          <FilterBar />
        </div>

        <LeadTable onEdit={handleEdit} />
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
