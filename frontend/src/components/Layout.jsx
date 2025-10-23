// src/components/Layout.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';

function Layout({ children }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            Job Monitoring Tool
          </Typography>

          <Button color="inherit" component={Link} to="/" sx={{ '&:hover': { backgroundColor: 'rgba(255,255,255,0.08)' }}}>
            Dashboard
          </Button>
          {/* Den Favoriten-Link hinzufügen/aktivieren */}
          <Button color="inherit" component={Link} to="/favorites" sx={{ '&:hover': { backgroundColor: 'rgba(255,255,255,0.08)' }}}>
            Favoriten
          </Button>
        </Toolbar>
      </AppBar>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {children}
      </Box>
    </Box>
  );
}

export default Layout;