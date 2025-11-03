// src/pages/FavoritesPage.jsx
import React, { useState, useEffect } from 'react';
import { Box, TextField, Typography, List, ListItem, ListItemText, IconButton, Paper, Dialog, DialogTitle, DialogContent, FormControl, InputLabel, Select, MenuItem, Button, DialogActions, Grid, Card, CardContent } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import SettingsIcon from '@mui/icons-material/Settings';
import { Link } from 'react-router-dom'; // Wichtig für die Kachel-Links

// SIMULATION: Mit Status erweitert, damit wir das Design nachbauen können
const allAvailableJobs = [
  { id: 1, name: "SAP Stammdaten Replikation", status: "ERFOLGREICH" },
  { id: 2, name: "Umsatzberechnung Kette", status: "FEHLER" },
  { id: 3, name: "Reporting DWH", status: "LÄUFT" },
  { id: 4, name: "Kunden-Segmentierung Job", status: "ERFOLGREICH" },
  { id: 5, name: "Archivierungs-Job", status: "ERFOLGREICH" },
  { id: 6, name: "Forecast-Berechnung", status: "LÄUFT" },
];

function FavoritesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  // const [searchResults, setSearchResults] = useState([]); // LOGIK-FIX: Entfernt
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem('jobFavorites');
    // Stellen sicher, dass die Favoriten den Status aus der Hauptliste haben
    const parsed = savedFavorites ? JSON.parse(savedFavorites) : [];
    return parsed.map(fav => {
      const fullJob = allAvailableJobs.find(j => j.id === fav.id);
      return fullJob || fav; // Fallback, falls Job nicht mehr existiert
    });
  });

  useEffect(() => {
    // Nur ID und Name speichern, Status wird beim Laden frisch geholt
    const savableFavorites = favorites.map(f => ({ id: f.id, name: f.name }));
    localStorage.setItem('jobFavorites', JSON.stringify(savableFavorites));
  }, [favorites]);

  // --- HIERHER KOPIERT VON DashboardPage.jsx ---
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
  // --- ENDE KOPIERTER TEIL ---

  const handleSearchChange = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    // LOGIK-FIX: Die Filterung passiert jetzt dynamisch beim Rendern
  };

  const addFavorite = (job) => {
    if (!favorites.find(fav => fav.id === job.id)) {
      setFavorites([...favorites, job]);
    }
    // LOGIK-FIX: `setSearchResults` wird nicht mehr benötigt
  };

  const removeFavorite = (e, jobId) => {
    e.preventDefault(); // Verhindert, dass der Link der Kachel ausgelöst wird
    e.stopPropagation(); // Verhindert Event-Bubbling
    setFavorites(favorites.filter(fav => fav.id !== jobId));
    // LOGIK-FIX: Die Suchergebnisse aktualisieren sich automatisch
  };

  // States for the settings dialog
  const [openSettingsModal, setOpenSettingsModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [notificationStatus, setNotificationStatus] = useState('');
  const [notificationEmail, setNotificationEmail] = useState('');

  const handleOpenSettings = (e, job) => {
    e.preventDefault(); // Verhindert, dass der Link der Kachel ausgelöst wird
    e.stopPropagation(); // Verhindert Event-Bubbling
    setSelectedJob(job);
    setNotificationStatus(job.status || 'FEHLER'); // Nimmt Job-Status oder Fallback
    setNotificationEmail('user@example.com');
    setOpenSettingsModal(true);
  };

  const handleCloseSettings = () => {
    setOpenSettingsModal(false);
  };

  const handleSaveSettings = () => {
    console.log(`Saving settings for Job ID ${selectedJob.id}: Notify on status ${notificationStatus} to ${notificationEmail}`);
    handleCloseSettings();
  };

  // LOGIK-FIX: Suchergebnisse dynamisch berechnen
  const availableForSearch = allAvailableJobs.filter(job => {
    // 1. Job ist nicht bereits ein Favorit
    const isFavorite = favorites.find(fav => fav.id === job.id);
    if (isFavorite) {
      return false;
    }
    
    // 2. Suchfeld ist leer -> nichts anzeigen
    if (searchTerm.trim() === '') {
      return false; 
    }

    // 3. Job passt zum Suchbegriff
    return job.name.toLowerCase().includes(searchTerm.toLowerCase());
  });


  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Favoriten verwalten
      </Typography>
      
      {/* Such-Sektion bleibt gleich (in einer Kachel) */}
      <Card sx={{ p: 2, mb: 4, overflow: 'visible' }}>
        <Typography variant="h6">Jobs durchsuchen</Typography>
        <TextField
          fullWidth
          variant="outlined"
          label="Job-Namen eingeben..."
          value={searchTerm}
          onChange={handleSearchChange}
          sx={{ mt: 2 }}
        />
        {/* LOGIK-FIX: `availableForSearch` statt `searchResults` verwenden */}
        {availableForSearch.length > 0 && (
          <List>
            {availableForSearch.map(job => (
              <ListItem key={job.id} secondaryAction={
                <IconButton edge="end" aria-label="add" onClick={() => addFavorite(job)}>
                  <AddCircleOutlineIcon />
                </IconButton>
              }>
                <ListItemText primary={job.name} />
              </ListItem>
            ))}
          </List>
        )}
      </Card>

      {/* Favorites List Section - NEU ALS GRID */}
      <Typography variant="h5" gutterBottom>
        Meine Favoriten
      </Typography>
      
      {favorites.length > 0 ? (
        <Grid container spacing={3}>
          {favorites.map(fav => {
            // Wir verwenden dieselbe Kachel-Logik wie im Dashboard
            return (
              <Grid item key={fav.id} xs={12} sm={6} md={4}>
                <Card 
                  component={Link}
                  to={`/jobkette/${fav.id}`} // Link zur Detailseite
                  sx={{
                    width: '100%',
                    height: '100%',
                    textDecoration: 'none',
                    color: 'inherit',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    p: 0, 
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    '&:hover': {
                      transform: 'scale(1.02)', 
                      boxShadow: '0px 6px 18px rgba(0,0,0,0.12)',
                    }
                  }}
                >
                  {/* Blauer Header mit Job-Name */}
                  <Box 
                    sx={{ 
                      backgroundColor: 'primary.main', 
                      p: 3,
                    }}
                  >
                    <Typography 
                      variant="h6" 
                      sx={{ color: 'white', fontWeight: 'bold' }} 
                    >
                      {fav.name}
                    </Typography>
                  </Box>

                  {/* Weißer Rumpf mit Status und Icons */}
                  <CardContent sx={{ 
                    p: 4,
                    // Wichtig, damit der Rumpf wächst und die Icons unten bleiben
                    flexGrow: 1, 
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}>
                    {/* Status Chip */}
                    {getStatusChip(fav.status)}
                    
                    {/* Icons (am Ende) */}
                    <Box sx={{ mt: 2, alignSelf: 'flex-end' }}>
                      <IconButton aria-label="settings" onClick={(e) => handleOpenSettings(e, fav)}>
                        <SettingsIcon />
                      </IconButton>
                      <IconButton aria-label="delete" onClick={(e) => removeFavorite(e, fav.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      ) : (
        // Fallback, wenn keine Favoriten da sind (jetzt auch in einer Kachel)
        <Card sx={{ p: 3 }}>
          <Typography>Noch keine Favoriten hinzugefügt. Nutze die Suche oben!</Typography>
        </Card>
      )}

      {/* Settings Dialog Window (bleibt unverändert) */}
      <Dialog open={openSettingsModal} onClose={handleCloseSettings}>
        <DialogTitle>Benachrichtigung für "{selectedJob?.name}"</DialogTitle>
        <DialogContent>
          <Typography sx={{ mt: 2 }}>Sende eine E-Mail, wenn der Job diesen Status erreicht:</Typography>
          <FormControl fullWidth sx={{ mt: 1 }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={notificationStatus}
              label="Status"
              onChange={(e) => setNotificationStatus(e.target.value)}
            >
              <MenuItem value={"ERFOLGREICH"}>ERFOLGREICH</MenuItem>
              <MenuItem value={"FEHLER"}>FEHLER</MenuItem>
            </Select>
          </FormControl>
          <TextField
            fullWidth
            label="An E-Mail-Adresse"
            value={notificationEmail}
            onChange={(e) => setNotificationEmail(e.target.value)}
            sx={{ mt: 3 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseSettings}>Abbrechen</Button>
          <Button onClick={handleSaveSettings} variant="contained">Speichern</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default FavoritesPage;

