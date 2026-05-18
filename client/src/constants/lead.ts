import type { LeadStatus, LeadSource } from "../types/lead";
import type { SelectOption } from "../types/common";

export const LEAD_STATUSES: SelectOption[] = [
  { value: "New", label: "New" },
  { value: "Contacted", label: "Contacted" },
  { value: "Qualified", label: "Qualified" },
  { value: "Lost", label: "Lost" },
];

export const LEAD_SOURCES: SelectOption[] = [
  { value: "Website", label: "Website" },
  { value: "Instagram", label: "Instagram" },
  { value: "Referral", label: "Referral" },
];

export const STATUS_COLORS: Record<LeadStatus, string> = {
  New: "status-new",
  Contacted: "status-contacted",
  Qualified: "status-qualified",
  Lost: "status-lost",
};

export const SOURCE_ICONS: Record<LeadSource, string> = {
  Website: "Globe",
  Instagram: "Instagram",
  Referral: "Users",
};
