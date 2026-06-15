import React from 'react';
import { Navigate } from 'react-router-dom';

interface RoleRouteProps {
  role: string;
  allowedRoles: string[];
  children: React.ReactNode;
}

const RoleRoute = ({ role, allowedRoles, children }: RoleRouteProps) => {
  return allowedRoles.includes(role) ? <>{children}</> : <Navigate to="/" />;
};

export default RoleRoute;
