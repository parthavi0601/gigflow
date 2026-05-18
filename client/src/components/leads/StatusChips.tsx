import { useLeadStore } from "../../store/leadStore";
import type { LeadStatus } from "../../types/lead";
import { cn } from "../../utils/cn";

const STATUSES: (LeadStatus | "")[] = ["", "New", "Contacted", "Qualified", "Lost"];

const CHIP_CLASS: Record<string, string> = {
  "": "chip-all",
  New: "chip-new",
  Contacted: "chip-contacted",
  Qualified: "chip-qualified",
  Lost: "chip-lost",
};

export const StatusChips = () => {
  const { filters, setFilters } = useLeadStore();
  const active = filters.status ?? "";

  return (
    <div className="status-chips">
      {STATUSES.map((status) => (
        <button
          key={status || "all"}
          type="button"
          className={cn("filter-chip", CHIP_CLASS[status], active === status && "active")}
          onClick={() => setFilters({ status: status || undefined, page: 1 })}
        >
          {status || "All"}
        </button>
      ))}
    </div>
  );
};
