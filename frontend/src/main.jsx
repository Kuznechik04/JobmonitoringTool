// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// KORREKTUR: Wir definieren hier EIN helles Theme.
const lightTheme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: '#f4f6f8', // Hellgrauer Seitenhintergrund
      paper: '#ffffff',   // Weißer Kachelhintergrund
    },
    text: {
      primary: '#212121',
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff', // Weiße AppBar
          color: '#212121',
          boxShadow: 'none',
          borderBottom: '1px solid #e0e0e0',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
        }
      }
    }
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Das ThemeProvider umschließt alles */}
    <ThemeProvider theme={lightTheme}>
      <CssBaseline /> {/* Setzt den hellgrauen Hintergrund */}
      {/* Der BrowserRouter umschließt die App */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
);