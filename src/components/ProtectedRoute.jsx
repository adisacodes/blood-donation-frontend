import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { authService } from '../services/authService';

export default function ProtectedRoute() {
  // Check token status in LocalStorage via the auth service wrapper
  const isAuth = authService.isAuthenticated();

  // If authenticated, render the matched child route layout via <Outlet />
  // If not, instantly kick the user back to the login screen securely
  return isAuth ? <Outlet /> : <Navigate to="/login" replace />;
}