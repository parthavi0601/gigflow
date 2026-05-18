import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./routes/AppRoutes";
import { useTheme } from "./hooks/useTheme";
import { useAuthStore } from "./store/authStore";
import "./styles/index.css";

const ThemeProvider = () => {
  useTheme();
  return null;
};

const AuthBootstrap = () => {
  const { fetchMe, token } = useAuthStore();
  useEffect(() => {
    if (token) fetchMe();
  }, [token, fetchMe]);
  return null;
};

const App = () => (
  <BrowserRouter>
    <ThemeProvider />
    <AuthBootstrap />
    <AppRoutes />
  </BrowserRouter>
);

export default App;
