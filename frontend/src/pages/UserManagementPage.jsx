// frontend/src/pages/UserManagementPage.jsx
import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  IconButton,
  Alert,
  CircularProgress
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

// Basis-URL für das Backend (Stelle sicher, dass der Port 8081 stimmt)
const API_URL = 'http://localhost:8081/api/users';

function UserManagementPage() {
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // 1. Benutzer beim Laden der Seite abrufen
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error('Fehler beim Abrufen der Benutzer');
      }
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // 2. Neuen Benutzer erstellen
  const handleCreateUser = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (username.trim() === '' || email.trim() === '') {
      setError('Bitte Benutzernamen und E-Mail eingeben.');
      return;
    }

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email }),
      });

      if (!response.ok) {
        throw new Error('Fehler beim Erstellen des Benutzers. Möglicherweise existiert der Benutzer bereits.');
      }

      const newUser = await response.json();
      setUsers([...users, newUser]);
      setUsername('');
      setEmail('');
      setSuccess(`Benutzer '${newUser.username}' erfolgreich erstellt.`);
    } catch (err) {
      setError(err.message);
    }
  };

  // 3. Benutzer löschen
  const handleDeleteUser = async (id, name) => {
    setError('');
    setSuccess('');
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Fehler beim Löschen des Benutzers.');
      }

      setUsers(users.filter(user => user.id !== id));
      setSuccess(`Benutzer '${name}' erfolgreich gelöscht.`);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Benutzerverwaltung
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

      {/* Benutzer erstellen Formular */}
      <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>Neuen Benutzer erstellen</Typography>
        <Box component="form" onSubmit={handleCreateUser} sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <TextField
            label="Benutzername"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            size="small"
            sx={{ flexGrow: 1 }}
          />
          <TextField
            label="E-Mail"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            size="small"
            sx={{ flexGrow: 1 }}
          />
          <Button 
            type="submit" 
            variant="contained" 
            color="primary" 
            startIcon={<PersonAddIcon />}
          >
            Erstellen
          </Button>
        </Box>
      </Paper>

      {/* Benutzerliste anzeigen */}
      <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
        Aktuelle Benutzer
      </Typography>
      
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer component={Paper} elevation={2}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>ID</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Benutzername</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>E-Mail</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Aktionen</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id} hover>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <IconButton 
                      aria-label="delete" 
                      onClick={() => handleDeleteUser(user.id, user.username)}
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {users.length === 0 && (
            <Box sx={{ p: 2, textAlign: 'center' }}>
              <Typography color="textSecondary">Keine Benutzer gefunden.</Typography>
            </Box>
          )}
        </TableContainer>
      )}
    </Box>
  );
}

export default UserManagementPage;