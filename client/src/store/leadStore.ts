import { create } from "zustand";
import { leadsApi } from "../api/leadsApi";
import type { Lead, CreateLeadData, UpdateLeadData, LeadFilters } from "../types/lead";
import type { Pagination } from "../types/api";

interface LeadState {
  leads: Lead[];
  pagination: Pagination;
  filters: LeadFilters;
  isLoading: boolean;
  error: string | null;
  setFilters: (filters: Partial<LeadFilters>) => void;
  fetchLeads: () => Promise<void>;
  createLead: (data: CreateLeadData) => Promise<void>;
  updateLead: (id: string, data: UpdateLeadData) => Promise<void>;
  deleteLead: (id: string) => Promise<void>;
}

const defaultPagination: Pagination = { page: 1, limit: 10, total: 0, pages: 0 };

export const useLeadStore = create<LeadState>((set, get) => ({
  leads: [],
  pagination: defaultPagination,
  filters: { sort: "latest", page: 1, limit: 10 },
  isLoading: false,
  error: null,

  setFilters: (filters) => {
    set((state) => ({
      filters: { ...state.filters, ...filters, page: filters.page ?? 1 },
    }));
    get().fetchLeads();
  },

  fetchLeads: async () => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await leadsApi.getAll(get().filters);
      set({
        leads: data.data,
        pagination: data.pagination ?? defaultPagination,
      });
    } catch {
      set({ error: "Failed to fetch leads" });
    } finally {
      set({ isLoading: false });
    }
  },

  createLead: async (data) => {
    await leadsApi.create(data);
    await get().fetchLeads();
  },

  updateLead: async (id, data) => {
    await leadsApi.update(id, data);
    await get().fetchLeads();
  },

  deleteLead: async (id) => {
    await leadsApi.delete(id);
    await get().fetchLeads();
  },
}));
