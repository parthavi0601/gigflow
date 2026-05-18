import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, User, KeyRound, ArrowLeft } from "lucide-react";
import { Input } from "../ui/Input";
import { Select } from "../ui/Select";
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
  phone: z.string().min(5, "Required"),
  gender: z.enum(["Male", "Female", "Other", "Prefer not to say"]).default("Male"),
  age: z.number().min(1, "Invalid age"),
  location: z.string().min(2, "Required"),
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
  
  // OTP Verification State
  const [step, setStep] = useState<"form" | "otp">("form");
  const [registeredEmail, setRegisteredEmail] = useState("");
  const [otp, setOtp] = useState("");
  
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
      if (isLogin) {
        const res = await authApi.login(data as LoginValues);
        // We know login returns AuthResponse with token
        // We have to cast to any because TS thinks it might be RegisterResponse based on api type union
        const authData = (res.data as any).data;
        login(authData.token, authData.user);
        navigate(ROUTES.DASHBOARD);
      } else {
        const res = await authApi.register(data as RegisterValues);
        const regData = (res.data as any).data;
        if (regData.requiresVerification) {
          setRegisteredEmail(regData.email);
          setStep("otp");
        }
      }
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      setApiError(error.response?.data?.message ?? "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const onOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 6) {
      setApiError("OTP must be exactly 6 digits");
      return;
    }
    setIsLoading(true);
    setApiError(null);
    try {
      const res = await authApi.verifyOtp({ email: registeredEmail, otp });
      const authData = (res.data as any).data;
      login(authData.token, authData.user);
      navigate(ROUTES.DASHBOARD);
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      setApiError(error.response?.data?.message ?? "Invalid OTP code");
    } finally {
      setIsLoading(false);
    }
  };

  if (step === "otp") {
    return (
      <form onSubmit={onOtpSubmit} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        <div style={{ textAlign: "center", marginBottom: 8 }}>
          <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.5 }}>
            We sent a verification code to<br/>
            <strong style={{ color: "var(--text-primary)" }}>{registeredEmail}</strong>
          </p>
        </div>

        <Input
          id="auth-otp"
          label="Verification Code"
          type="text"
          placeholder="6-digit code"
          maxLength={6}
          icon={<KeyRound size={16} />}
          value={otp}
          onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
        />

        {apiError && (
          <div style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.25)", borderRadius: "var(--radius-sm)", padding: "10px 14px", fontSize: 13, color: "var(--error)" }}>
            {apiError}
          </div>
        )}

        <Button type="submit" variant="primary" size="lg" loading={isLoading} style={{ marginTop: 4 }}>
          Verify & Sign In
        </Button>

        <button 
          type="button" 
          onClick={() => setStep("form")} 
          style={{ background: "none", border: "none", color: "var(--text-muted)", fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center", gap: 6, cursor: "pointer", marginTop: 8 }}
        >
          <ArrowLeft size={14} /> Back to register
        </button>
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      {!isLogin && (
        <>
          <Input
            id="auth-name"
            label="Full Name"
            placeholder="Your full name"
            icon={<User size={16} />}
            error={(errors as any).name?.message}
            {...register("name")}
          />
          <Input
            id="auth-phone"
            label="Phone Number"
            type="tel"
            placeholder="e.g. +1 234 567 8900"
            error={(errors as any).phone?.message}
            {...register("phone")}
          />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <Select
              id="auth-gender"
              label="Gender"
              options={[
                { value: "Male", label: "Male" },
                { value: "Female", label: "Female" },
                { value: "Other", label: "Other" },
                { value: "Prefer not to say", label: "Prefer not to say" }
              ]}
              error={(errors as any).gender?.message}
              {...register("gender")}
            />
            <Input
              id="auth-age"
              label="Age"
              type="number"
              placeholder="e.g. 25"
              error={(errors as any).age?.message}
              {...register("age", { valueAsNumber: true })}
            />
          </div>
          <Input
            id="auth-location"
            label="Location"
            placeholder="e.g. New York, USA"
            error={(errors as any).location?.message}
            {...register("location")}
          />
        </>
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
        <div style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.25)", borderRadius: "var(--radius-sm)", padding: "10px 14px", fontSize: 13, color: "var(--error)" }}>
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
