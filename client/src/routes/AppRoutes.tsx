import { Routes, Route, Navigate } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import { LoginPage } from "../pages/LoginPage";
import { RegisterPage } from "../pages/RegisterPage";
import { DashboardPage } from "../pages/DashboardPage";
import { LeadDetailsPage } from "../pages/LeadDetailsPage";
import { NotFoundPage } from "../pages/NotFoundPage";
import { ROUTES } from "../constants/routes";

export const AppRoutes = () => (
  <Routes>
    <Route path={ROUTES.LOGIN} element={<LoginPage />} />
    <Route path={ROUTES.REGISTER} element={<RegisterPage />} />

    <Route element={<ProtectedRoute />}>
      <Route path={ROUTES.DASHBOARD} element={<DashboardPage />} />
      <Route path={ROUTES.LEAD_DETAILS_PATTERN} element={<LeadDetailsPage />} />
    </Route>

    <Route path={ROUTES.NOT_FOUND} element={<NotFoundPage />} />
    <Route path="*" element={<Navigate to={ROUTES.NOT_FOUND} replace />} />
  </Routes>
);
