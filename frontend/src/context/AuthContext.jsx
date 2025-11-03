// frontend/src/context/AuthContext.jsx
import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

// Basis-URL für das Backend
const API_URL = 'http://localhost:8081/api/auth'; 

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  // Lokalen Speicher prüfen, um den Anmeldestatus nach Neuladen zu erhalten
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => localStorage.getItem('isAuthenticated') === 'true'
  );
  const [user, setUser] = useState(localStorage.getItem('username') || null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Login-Funktion
  const login = async (username, password) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
        credentials: 'include', // Wichtig für Cookies
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage || "Login fehlgeschlagen.");
      }

      // Bei Erfolg: Status setzen
      setIsAuthenticated(true);
      setUser(username);
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('username', username);
      
    } catch (err) {
      setError(err.message);
      setIsAuthenticated(false);
      setUser(null);
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('username');
      throw err; // Fehler weitergeben
    } finally {
      setIsLoading(false);
    }
  };

  // Logout-Funktion
  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('username');
    // ACHTUNG: In einer echten App müssten wir hier auch das Backend informieren (z.B. Session invalidieren)
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, error, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};