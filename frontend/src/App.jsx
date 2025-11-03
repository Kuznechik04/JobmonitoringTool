// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import FavoritesPage from './pages/FavoritesPage';
import SettingsPage from './pages/SettingsPage';
import Layout from './components/Layout'; // Layout importieren

// KORREKTUR: Alle ThemeProvider, CssBaseline und BrowserRouter entfernt.
function App() {
  return (
    // Das Layout umschließt alle Seiten
    <Layout>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        {/* <Route path="/jobkette/:id" element={<JobKettePage />} /> */}
      </Routes>
    </Layout>
  );
}

export default App;