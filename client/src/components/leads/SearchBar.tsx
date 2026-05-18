import { Search, X } from "lucide-react";
import { useCallback, useState } from "react";
import { useDebounce } from "../../hooks/useDebounce";
import { useLeadStore } from "../../store/leadStore";
import { useEffect } from "react";

export const SearchBar = () => {
  const { setFilters } = useLeadStore();
  const [value, setValue] = useState("");
  const debounced = useDebounce(value);

  useEffect(() => {
    setFilters({ search: debounced || undefined, page: 1 });
  }, [debounced, setFilters]);

  const clear = useCallback(() => setValue(""), []);

  return (
    <div style={{ position: "relative", flex: 1, minWidth: 200 }}>
      <Search
        size={16}
        style={{
          position: "absolute",
          left: 12,
          top: "50%",
          transform: "translateY(-50%)",
          color: "var(--text-muted)",
          pointerEvents: "none",
        }}
      />
      <input
        className="input-field"
        style={{ paddingLeft: 38, paddingRight: value ? 38 : 14 }}
        placeholder="Search by name or email..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        aria-label="Search leads"
      />
      {value && (
        <button
          onClick={clear}
          style={{
            position: "absolute",
            right: 10,
            top: "50%",
            transform: "translateY(-50%)",
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "var(--text-muted)",
            display: "flex",
            alignItems: "center",
          }}
          aria-label="Clear search"
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
};
