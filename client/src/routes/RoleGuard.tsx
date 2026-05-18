import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { ROUTES } from "../constants/routes";

interface RoleGuardProps {
  allowedRoles: Array<"admin" | "sales">;
}

export const RoleGuard = ({ allowedRoles }: RoleGuardProps) => {
  const { user } = useAuthStore();
  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to={ROUTES.DASHBOARD} replace />;
  }
  return <Outlet />;
};
