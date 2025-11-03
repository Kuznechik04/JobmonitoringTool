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
    // NEU: Definition einer Primärfarbe (Blau) für die Header
    primary: {
      main: '#3a5a9e', // Ein dunkles, sattes Blau ähnlich dem Beispiel
    },
    background: {
      // NEU: Helles Beige/Creme als globaler Hintergrund
      default: '#fefbf9', 
      // Kacheln, AppBars etc. bleiben weiß
      paper: '#ffffff',   
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
          // NEU: Dezenter Schatten statt einer harten Linie
          boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.06)',
          borderBottom: 'none', // Alte Linie entfernen
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          // NEU: Stärkere Abrundung, passt zum neuen Design
          borderRadius: '12px', 
        }
      }
    },
    // NEU: Globales Styling für alle Kacheln
    MuiCard: {
      styleOverrides: {
        root: {
          // KORREKTUR: Wir fügen den Hintergrund hier wieder hinzu
          backgroundColor: '#ffffff', 
          borderRadius: '12px',
          boxShadow: '0px 4px 12px rgba(0,0,0,0.05)',
          
          // Die Umrandung bleibt
          border: '1px solid #e0e0e0', // Eine hellgraue Umrandung
        }
      }
    }
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Das ThemeProvider umschließt alles */}
    <ThemeProvider theme={lightTheme}>
      <CssBaseline /> {/* Setzt den neuen hellen Hintergrund */}
      {/* Der BrowserRouter umschließt die App */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
);

