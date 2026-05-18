import { useLeadStore } from "../../store/leadStore";
import { LEAD_SOURCES } from "../../constants/lead";
import { Select } from "../ui/Select";
import type { LeadSource } from "../../types/lead";

const SORT_OPTIONS = [
  { value: "latest", label: "Latest First" },
  { value: "oldest", label: "Oldest First" },
];

export const FilterBar = () => {
  const { filters, setFilters } = useLeadStore();

  return (
    <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
      <Select
        options={LEAD_SOURCES}
        placeholder="All Sources"
        value={filters.source ?? ""}
        onChange={(e) =>
          setFilters({ source: (e.target.value as LeadSource) || undefined, page: 1 })
        }
        aria-label="Filter by source"
        style={{ minWidth: 140 }}
      />
      <Select
        options={SORT_OPTIONS}
        value={filters.sort ?? "latest"}
        onChange={(e) =>
          setFilters({ sort: e.target.value as "latest" | "oldest", page: 1 })
        }
        aria-label="Sort leads"
        style={{ minWidth: 140 }}
      />
    </div>
  );
};
