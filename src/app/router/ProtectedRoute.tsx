import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "@/app/store/auth.store";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const token =
    useAuthStore((state) => state.token) ?? localStorage.getItem("token");

  return token ? <>{children}</> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
