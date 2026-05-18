export const ROUTES = {
  LOGIN: "/login",
  REGISTER: "/register",
  DASHBOARD: "/",
  LEAD_DETAILS: (id: string) => `/leads/${id}`,
  LEAD_DETAILS_PATTERN: "/leads/:id",
  NOT_FOUND: "/404",
} as const;
