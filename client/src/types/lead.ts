export type LeadStatus = "New" | "Contacted" | "Qualified" | "Lost";
export type LeadSource = "Website" | "Instagram" | "Referral";

export interface Lead {
  _id: string;
  name: string;
  email: string;
  phone: string;
  lastMessage?: string;
  companyName: string;
  companyDescription: string;
  interestLevel: number;
  status: LeadStatus;
  source: LeadSource;
  createdBy: {
    _id: string;
    name: string;
    email: string;
    role: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface CreateLeadData {
  name: string;
  email: string;
  phone: string;
  lastMessage?: string;
  companyName: string;
  companyDescription: string;
  interestLevel: number;
  status?: LeadStatus;
  source: LeadSource;
}

export interface UpdateLeadData {
  name?: string;
  email?: string;
  phone?: string;
  lastMessage?: string;
  companyName?: string;
  companyDescription?: string;
  interestLevel?: number;
  status?: LeadStatus;
  source?: LeadSource;
}

export interface LeadStats {
  total: number;
  new: number;
  contacted: number;
  qualified: number;
  lost: number;
}

export interface LeadFilters {
  status?: LeadStatus | "";
  source?: LeadSource | "";
  search?: string;
  sort?: "latest" | "oldest";
  page?: number;
  limit?: number;
}
