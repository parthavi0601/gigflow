import { AuthShell } from "../components/auth/AuthShell";
import { AuthForm } from "../components/auth/AuthForm";

export const RegisterPage = () => (
  <AuthShell title="Create account" subtitle="Start managing leads in minutes">
    <AuthForm mode="register" />
  </AuthShell>
);
