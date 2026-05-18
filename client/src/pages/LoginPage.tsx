import { AuthShell } from "../components/auth/AuthShell";
import { AuthForm } from "../components/auth/AuthForm";

export const LoginPage = () => (
  <AuthShell
    title="Welcome back"
    subtitle="Sign in to your GigFlow workspace"
  >
    <AuthForm mode="login" />
  </AuthShell>
);
