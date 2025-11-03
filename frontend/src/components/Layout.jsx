// src/components/Layout.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // NEU: useNavigate
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Tooltip } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout'; // NEU: Logout-Icon
import { useAuth } from '../context/AuthContext'; // NEU: useAuth

function Layout({ children }) {
  const { isAuthenticated, logout, user } = useAuth(); // Auth-Daten
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/'); // Nach Logout zur Login-Seite navigieren
  };

  if (!isAuthenticated) {
    // Wenn nicht angemeldet, zeige das Layout nicht an (LoginPage hat eigenes Design)
    return <Box component="main" sx={{ flexGrow: 1 }}>{children}</Box>;
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="static" color="transparent">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
            Job Monitoring Tool
          </Typography>

          {/* Links in der Mitte zentriert */}
          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
            {/*... Dashboard Button ...*/}
            <Button color="inherit" component={Link} to="/dashboard" /* KORREKTUR */
              sx={{ fontWeight: 600, textTransform: 'none', fontSize: '1rem', '&:hover': { backgroundColor: 'rgba(0,0,0,0.04)' } }}>
              Dashboard
            </Button>
            {/*... Favoriten Button ...*/}
            <Button color="inherit" component={Link} to="/favorites" 
              sx={{ fontWeight: 600, textTransform: 'none', fontSize: '1rem', marginLeft: 2, '&:hover': { backgroundColor: 'rgba(0,0,0,0.04)' } }}>
              Favoriten
            </Button>
            {/*... Benutzer Button ...*/}
            <Button color="inherit" component={Link} to="/users" 
              sx={{ fontWeight: 600, textTransform: 'none', fontSize: '1rem', marginLeft: 2, '&:hover': { backgroundColor: 'rgba(0,0,0,0.04)' } }}>
              Benutzer
            </Button>
            {/*... Einstellungen Button ...*/}
            <Button color="inherit" component={Link} to="/settings" 
              sx={{ fontWeight: 600, textTransform: 'none', fontSize: '1rem', marginLeft: 2, '&:hover': { backgroundColor: 'rgba(0,0,0,0.04)' } }}>
              Einstellungen
            </Button>
          </Box>

          {/* Rechts: Benutzername und Logout */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="subtitle1" sx={{ mr: 1, fontWeight: 'bold' }}>
              Hallo, {user || 'User'}
            </Typography>
            <Tooltip title="Abmelden">
              <IconButton color="inherit" onClick={handleLogout}>
                <LogoutIcon />
              </IconButton>
            </Tooltip>
          </Box>

        </Toolbar>
      </AppBar>

      {/* Der Hauptinhalt mit Padding */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {children}
      </Box>
    </Box>
  );
}

export default Layout;