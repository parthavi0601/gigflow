import { AuthShell } from "../components/auth/AuthShell";
import { AuthForm } from "../components/auth/AuthForm";

export const LoginPage = () => (
  <AuthShell
    title="Welcome back"
    subtitle="Sign in to your GigFlow workspace"
    demo={
      <div className="auth-demo">
        <strong>Demo</strong> admin@example.com / Admin@123
      </div>
    }
  >
    <AuthForm mode="login" />
  </AuthShell>
);
