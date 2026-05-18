import api from "./axios";
import type { ApiResponse } from "../types/api";
import type { Lead, LeadStats, CreateLeadData, UpdateLeadData, LeadFilters } from "../types/lead";

const buildParams = (filters: LeadFilters) => {
  const params: Record<string, string> = {};
  if (filters.status) params["status"] = filters.status;
  if (filters.source) params["source"] = filters.source;
  if (filters.search) params["search"] = filters.search;
  if (filters.sort) params["sort"] = filters.sort;
  if (filters.page) params["page"] = String(filters.page);
  if (filters.limit) params["limit"] = String(filters.limit);
  return params;
};

export const leadsApi = {
  getStats: () => api.get<ApiResponse<LeadStats>>("/leads/stats"),

  getAll: (filters: LeadFilters = {}) =>
    api.get<ApiResponse<Lead[]>>("/leads", { params: buildParams(filters) }),

  getById: (id: string) =>
    api.get<ApiResponse<Lead>>(`/leads/${id}`),

  create: (data: CreateLeadData) =>
    api.post<ApiResponse<Lead>>("/leads", data),

  update: (id: string, data: UpdateLeadData) =>
    api.patch<ApiResponse<Lead>>(`/leads/${id}`, data),

  delete: (id: string) =>
    api.delete<ApiResponse<null>>(`/leads/${id}`),

  exportCsv: (filters: LeadFilters = {}) =>
    api.get("/leads/export/csv", {
      params: buildParams(filters),
      responseType: "blob",
    }),
};
