import React from 'react';
import { Navigate } from 'react-router-dom';

function AdminProtectedRoute({ children }) {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  const userRole = localStorage.getItem('userRole');
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  if (userRole !== 'admin') {
    return <Navigate to="/" />;
  }
  
  return children;
}

export default AdminProtectedRoute;