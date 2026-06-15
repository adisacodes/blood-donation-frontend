import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { authService } from '../services/authService';

export default function ProtectedRoute({ requiredRole }) {
  const isAuth = authService.isAuthenticated();
  const userRole = authService.getRole();

  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && userRole !== requiredRole) {
    if (userRole === 'admin') {
      return <Navigate to="/dashboard" replace />;
    } else if (userRole === 'hospital') {
      return <Navigate to="/requests" replace />;
    } else if (userRole === 'donor') {
      return <Navigate to="/donors" replace />;
    }
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}