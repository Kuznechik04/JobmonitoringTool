// src/components/Layout.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';

function Layout({ children }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Die AppBar (Kopfzeile) wird jetzt vom Theme in main.jsx gestylt */}
      <AppBar position="static" color="transparent">
        <Toolbar>
          {/* Titel links */}
          <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
            Job Monitoring Tool
          </Typography>

          {/* NEU: Links in der Mitte zentriert */}
          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
            <Button 
              color="inherit" 
              component={Link} 
              to="/" 
              sx={{ 
                fontWeight: 600,
                textTransform: 'none',
                fontSize: '1rem',
                '&:hover': { backgroundColor: 'rgba(0,0,0,0.04)' }
              }}
            >
              Dashboard
            </Button>
            <Button 
              color="inherit" 
              component={Link} 
              to="/favorites" 
              sx={{ 
                fontWeight: 600,
                textTransform: 'none',
                fontSize: '1rem',
                marginLeft: 2,
                '&:hover': { backgroundColor: 'rgba(0,0,0,0.04)' }
              }}
            >
              Favoriten
            </Button>
            <Button 
              color="inherit" 
              component={Link} 
              to="/settings" 
              sx={{ 
                fontWeight: 600,
                textTransform: 'none',
                fontSize: '1rem',
                marginLeft: 2,
                '&:hover': { backgroundColor: 'rgba(0,0,0,0.04)' }
              }}
            >
              Einstellungen
            </Button>
          </Box>

          {/* Optional: Platzhalter für ein Icon rechts, wie das 'P' im Screenshot */}
          {/* <Avatar sx={{ bgcolor: 'primary.main' }}>P</Avatar> */}

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
