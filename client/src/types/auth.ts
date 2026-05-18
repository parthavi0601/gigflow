export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: "admin" | "sales";
}

export interface AuthResponse {
  token: string;
  user: AuthUser;
}

export interface RegisterResponse {
  requiresVerification: boolean;
  email: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
  role?: "admin" | "sales";
}

export interface VerifyOtpCredentials {
  email: string;
  otp: string;
}
