// src/pages/FavoritesPage.jsx
import React, { useState, useEffect } from 'react';
import { Box, TextField, Typography, List, ListItem, ListItemText, IconButton, Paper, Dialog, DialogTitle, DialogContent, FormControl, InputLabel, Select, MenuItem, Button, DialogActions } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import SettingsIcon from '@mui/icons-material/Settings';

// SIMULATION: This list would normally come from the backend.
const allAvailableJobs = [
  { id: 1, name: "SAP Stammdaten Replikation" },
  { id: 2, name: "Umsatzberechnung Kette" },
  { id: 3, name: "Reporting DWH" },
  { id: 4, name: "Kunden-Segmentierung Job" },
  { id: 5, name: "Archivierungs-Job" },
  { id: 6, name: "Forecast-Berechnung" },
];

function FavoritesPage() {
  // --- This is the part that was missing ---
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem('jobFavorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  useEffect(() => {
    localStorage.setItem('jobFavorites', JSON.stringify(favorites));
  }, [favorites]);

  const handleSearchChange = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    if (term.trim() === '') {
      setSearchResults([]);
    } else {
      const filtered = allAvailableJobs.filter(job =>
        job.name.toLowerCase().includes(term.toLowerCase())
      );
      setSearchResults(filtered);
    }
  };

  const addFavorite = (job) => {
    if (!favorites.find(fav => fav.id === job.id)) {
      setFavorites([...favorites, job]);
    }
  };

  const removeFavorite = (jobId) => {
    setFavorites(favorites.filter(fav => fav.id !== jobId));
  };
  // --- End of missing part ---


  // States for the settings dialog
  const [openSettingsModal, setOpenSettingsModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [notificationStatus, setNotificationStatus] = useState('');
  const [notificationEmail, setNotificationEmail] = useState('');

  const handleOpenSettings = (job) => {
    setSelectedJob(job);
    setNotificationStatus('FEHLER');
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

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Favoriten verwalten
      </Typography>
      
      {/* Search Section */}
      <Paper sx={{ p: 2, mb: 4 }}>
        <Typography variant="h6">Jobs durchsuchen</Typography>
        <TextField
          fullWidth
          variant="outlined"
          label="Job-Namen eingeben..."
          value={searchTerm}
          onChange={handleSearchChange}
          sx={{ mt: 2 }}
        />
        {searchResults.length > 0 && (
          <List>
            {searchResults.map(job => (
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
      </Paper>

      {/* Favorites List Section */}
      <Typography variant="h5" gutterBottom>
        Meine Favoriten
      </Typography>
      <Paper sx={{ p: 2 }}>
        {favorites.length > 0 ? (
          <List>
            {favorites.map(fav => (
              <ListItem key={fav.id} secondaryAction={
                <>
                  <IconButton edge="end" aria-label="settings" onClick={() => handleOpenSettings(fav)}>
                    <SettingsIcon />
                  </IconButton>
                  <IconButton edge="end" aria-label="delete" onClick={() => removeFavorite(fav.id)}>
                    <DeleteIcon />
                  </IconButton>
                </>
              }>
                <ListItemText primary={fav.name} />
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography>Noch keine Favoriten hinzugefügt. Nutze die Suche oben!</Typography>
        )}
      </Paper>

      {/* Settings Dialog Window */}
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