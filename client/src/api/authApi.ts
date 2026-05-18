import api from "./axios";
import type { ApiResponse } from "../types/api";
import type { AuthResponse, AuthUser, LoginCredentials, RegisterCredentials } from "../types/auth";

export const authApi = {
  login: (data: LoginCredentials) =>
    api.post<ApiResponse<AuthResponse>>("/auth/login", data),

  register: (data: RegisterCredentials) =>
    api.post<ApiResponse<AuthResponse>>("/auth/register", data),

  getMe: () =>
    api.get<ApiResponse<AuthUser>>("/auth/me"),
};
