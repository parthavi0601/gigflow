import { useLeadStore } from "../../store/leadStore";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const Pagination = () => {
  const { pagination, setFilters } = useLeadStore();
  const { page, pages, total, limit } = pagination;

  if (total === 0) return null;

  const from = (page - 1) * limit + 1;
  const to = Math.min(page * limit, total);

  const getPageNumbers = () => {
    const range: number[] = [];
    const delta = 1;
    for (let i = Math.max(1, page - delta); i <= Math.min(pages, page + delta); i++) {
      range.push(i);
    }
    return range;
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "14px 16px",
        borderTop: "1px solid var(--surface-border)",
        flexWrap: "wrap",
        gap: 12,
      }}
    >
      <span style={{ fontSize: 13, color: "var(--text-muted)" }}>
        Showing <strong style={{ color: "var(--text-primary)" }}>{from}–{to}</strong> of{" "}
        <strong style={{ color: "var(--text-primary)" }}>{total}</strong> leads
      </span>

      <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
        <button
          className="pagination-btn"
          disabled={page <= 1}
          onClick={() => setFilters({ page: page - 1 })}
          aria-label="Previous page"
        >
          <ChevronLeft size={14} />
        </button>

        {page > 2 && (
          <>
            <button className="pagination-btn" onClick={() => setFilters({ page: 1 })}>1</button>
            {page > 3 && <span style={{ color: "var(--text-muted)", padding: "0 4px" }}>…</span>}
          </>
        )}

        {getPageNumbers().map((p) => (
          <button
            key={p}
            className={`pagination-btn ${p === page ? "active" : ""}`}
            onClick={() => setFilters({ page: p })}
          >
            {p}
          </button>
        ))}

        {page < pages - 1 && (
          <>
            {page < pages - 2 && <span style={{ color: "var(--text-muted)", padding: "0 4px" }}>…</span>}
            <button className="pagination-btn" onClick={() => setFilters({ page: pages })}>
              {pages}
            </button>
          </>
        )}

        <button
          className="pagination-btn"
          disabled={page >= pages}
          onClick={() => setFilters({ page: page + 1 })}
          aria-label="Next page"
        >
          <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
};
