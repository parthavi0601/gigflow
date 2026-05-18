import type { ReactNode } from "react";
import { Button } from "./Button";

interface EmptyStateProps {
  icon: ReactNode;
  title: string;
  description?: string;
  action?: { label: string; onClick: () => void };
}

export const EmptyState = ({ icon, title, description, action }: EmptyStateProps) => (
  <div className="empty-state">
    <div className="empty-icon">{icon}</div>
    <div>
      <p style={{ fontWeight: 600, fontSize: 16, color: "var(--text-primary)", marginBottom: 4 }}>
        {title}
      </p>
      {description && (
        <p style={{ fontSize: 14, color: "var(--text-muted)" }}>{description}</p>
      )}
    </div>
    {action && (
      <Button variant="primary" size="sm" onClick={action.onClick}>
        {action.label}
      </Button>
    )}
  </div>
);
