import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, User } from "lucide-react";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { authApi } from "../../api/authApi";
import { useAuthStore } from "../../store/authStore";
import { ROUTES } from "../../constants/routes";

const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(1, "Password is required"),
});

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email"),
  password: z
    .string()
    .min(8, "At least 8 characters")
    .regex(/[A-Z]/, "Must contain uppercase")
    .regex(/[0-9]/, "Must contain a number"),
});

type LoginValues = z.infer<typeof loginSchema>;
type RegisterValues = z.infer<typeof registerSchema>;

interface AuthFormProps {
  mode: "login" | "register";
}

export const AuthForm = ({ mode }: AuthFormProps) => {
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const isLogin = mode === "login";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginValues | RegisterValues>({
    resolver: zodResolver(isLogin ? loginSchema : registerSchema),
  });

  const onSubmit = async (data: LoginValues | RegisterValues) => {
    setIsLoading(true);
    setApiError(null);
    try {
      const res = isLogin
        ? await authApi.login(data as LoginValues)
        : await authApi.register(data as RegisterValues);
      login(res.data.data.token, res.data.data.user);
      navigate(ROUTES.DASHBOARD);
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      setApiError(error.response?.data?.message ?? "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      {!isLogin && (
        <Input
          id="auth-name"
          label="Full Name"
          placeholder="Your full name"
          icon={<User size={16} />}
          error={(errors as { name?: { message: string } }).name?.message}
          {...register("name")}
        />
      )}
      <Input
        id="auth-email"
        label="Email Address"
        type="email"
        placeholder="you@example.com"
        icon={<Mail size={16} />}
        error={errors.email?.message}
        {...register("email")}
      />
      <Input
        id="auth-password"
        label="Password"
        type="password"
        placeholder={isLogin ? "Your password" : "Min 8 chars, uppercase & number"}
        icon={<Lock size={16} />}
        error={errors.password?.message}
        {...register("password")}
      />
      {apiError && (
        <div
          style={{
            background: "rgba(239,68,68,0.08)",
            border: "1px solid rgba(239,68,68,0.25)",
            borderRadius: "var(--radius-sm)",
            padding: "10px 14px",
            fontSize: 13,
            color: "var(--error)",
          }}
        >
          {apiError}
        </div>
      )}

      <Button type="submit" variant="primary" size="lg" loading={isLoading} style={{ marginTop: 4 }}>
        {isLogin ? "Sign In" : "Create Account"}
      </Button>

      <p style={{ textAlign: "center", fontSize: 14, color: "var(--text-muted)" }}>
        {isLogin ? "Don't have an account? " : "Already have an account? "}
        <Link
          to={isLogin ? ROUTES.REGISTER : ROUTES.LOGIN}
          style={{ color: "var(--brand-500)", fontWeight: 600, textDecoration: "none" }}
        >
          {isLogin ? "Sign up" : "Sign in"}
        </Link>
      </p>
    </form>
  );
};
