// src/pages/DashboardPage.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Grid, Card, CardContent } from '@mui/material';
import '../App.css';

const mockJobChains = [
  { id: 1, name: "SAP Datenversorgung", status: "ERFOLGREICH" },
  { id: 2, name: "Umsatzberechnung Kette", status: "FEHLER" },
  { id: 3, name: "Reporting DWH", status: "LÄUFT" },
  { id: 4, name: "Test", status: "FEHLER" },
  { id: 5, name: "Test2", status: "LÄUFT" }
];

function DashboardPage() {
  const [jobChains, setJobChains] = useState(mockJobChains);

  // Die getStatusChip-Funktion ist in Ordnung...
  const getStatusChip = (status) => {
    let color;
    let backgroundColor;
    if (status === "ERFOLGREICH") {
      color = '#4caf50';
      backgroundColor = 'rgba(76, 175, 80, 0.1)';
    } else if (status === "FEHLER") {
      color = '#f44336';
      backgroundColor = 'rgba(244, 67, 54, 0.1)';
    } else if (status === "LÄUFT") {
      color = '#ff9800';
      backgroundColor = 'rgba(255, 152, 0, 0.1)';
    } else {
      color = '#9e9e9e';
      backgroundColor = 'rgba(211, 189, 189, 0.1)';
    }
    return (
      <Box 
        component="span"
        sx={{ 
          display: 'inline-block',
          px: 1.5,
          py: 0.5,
          borderRadius: '12px',
          color: color,
          backgroundColor: backgroundColor,
          fontWeight: 'bold',
          fontSize: '0.8rem'
        }}
      >
        {status}
      </Box>
    );
  };

  // Die Sortier-Funktion ist auch in Ordnung...
  const sortedChains = [...jobChains].sort((a, b) => {
    const statusPriority = { "FEHLER": 0, "LÄUFT": 1, "ERFOLGREICH": 2 };
    const priorityA = statusPriority[a.status] ?? 99;
    const priorityB = statusPriority[b.status] ?? 99;
    return priorityA - priorityB;
  });

  return (
    // Das p: 3 (padding) kommt jetzt von Layout.jsx, hier nicht mehr nötig
    <Box>
      <Typography variant="h4" gutterBottom>
        Gruppen-Dashboard
      </Typography>
      
      {/* Das Grid-System (bleibt gleich) */}
      <Grid container spacing={3}>
        {sortedChains.map(chain => {
          
          // KORREKTUR: Vereinfachte Logik.
          // Jede Kachel ist 'background.paper' (weiß).
          const cardBgColor = 'background.paper';

          return (
            <Grid item key={chain.id} xs={12} sm={6} md={4}>
              {/* Die Card-Komponente ist das "Viereck", das du wolltest. */}
              <Card 
                component={Link}
                to={`/jobkette/${chain.id}`}
                sx={{
                  width: '100%',
                  height: '100%',
                  textDecoration: 'none',
                  color: 'inherit',
                  // Transition für den Hover-Effekt
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  
                  // Styling für Light-Mode
                  backgroundColor: cardBgColor, // Weiß
                  boxShadow: '0px 4px 12px rgba(0,0,0,0.05)', // Dezenter Schatten
                  
                  // DEIN GEWÜNSCHTER HOVER-EFFEKT
                  '&:hover': {
                    transform: 'scale(1.02)', // Macht die Kachel größer
                    boxShadow: '0px 6px 18px rgba(0,0,0,0.12)', // Stärkerer Schatten
                  }
                }}
              >
                {/* Dein Inhalt (Schrift + Status) kommt IN die Kachel */}
                <CardContent sx={{ p: 3 }}>
                  <Typography 
                    variant="h6" 
                    gutterBottom 
                    sx={{ color: 'text.primary' }}
                  >
                    {chain.name}
                  </Typography>
                  {getStatusChip(chain.status)}
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}

export default DashboardPage;