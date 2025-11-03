// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import FavoritesPage from './pages/FavoritesPage';
import SettingsPage from './pages/SettingsPage';
import UserManagementPage from './pages/UserManagementPage'; // NEU
import LoginPage from './pages/LoginPage'; // NEU
import Layout from './components/Layout'; 
import { AuthProvider } from './context/AuthContext'; // NEU: AuthProvider
import ProtectedRoute from './components/ProtectedRoute'; // NEU: ProtectedRoute

function App() {
  return (
    // 1. Die gesamte App mit dem AuthProvider umschließen
    <AuthProvider>
      <Layout>
        <Routes>
          {/* 2. Login-Seite ist die neue Startseite */}
          <Route path="/" element={<LoginPage />} />
          
          {/* 3. Alle internen Seiten sind geschützt */}
          <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
          <Route path="/favorites" element={<ProtectedRoute><FavoritesPage /></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
          <Route path="/users" element={<ProtectedRoute><UserManagementPage /></ProtectedRoute>} />
          
          {/* Fügen Sie hier später die JobKettePage hinzu */}
        </Routes>
      </Layout>
    </AuthProvider>
  );
}

export default App;