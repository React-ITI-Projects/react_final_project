import { isTokenExpire } from "@/api";
import { useAuthStore } from "@/store/auth";
import React, { useEffect } from "react"; // Added useEffect
import { Navigate, Outlet, useLocation } from "react-router-dom";

const AuthGurdRoute = () => {
  const { pathname } = useLocation();
  const { token, clear, refreshToken } = useAuthStore();

  useEffect(() => {
    if (!token || isTokenExpire(refreshToken)) {
      clear();
    }
  }, [token, refreshToken, clear]); // Dependencies to trigger effect

  if (!token || isTokenExpire(refreshToken)) {
    return <Navigate to={`/login?redirectTo=${pathname}`} />;
  }

  return <Outlet />;
};

export default AuthGurdRoute;
