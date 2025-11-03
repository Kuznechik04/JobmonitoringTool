// frontend/src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    // Leite nicht angemeldete Benutzer zur Login-Seite um
    return <Navigate to="/" replace />;
  }

  // Zeige die angefragte Komponente für angemeldete Benutzer
  return children;
};

export default ProtectedRoute;