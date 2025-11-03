//import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Grid, Card, CardContent } from '@mui/material';
//import { Link } from 'react-router-dom'; // Wichtig für die Kachel-Links


function SettingsPage() {

    return (
        <Box sx = {{ minHeight: '100vh', position: 'relative'}}>
            <Typography variant="h4" gutterBottom>
                Einstellungen
            </Typography>
            <Typography variant="body1">
                Hier können Benutzereinstellungen konfiguriert werden. (Inhalt noch zu implementieren)
                Test
                <p></p>
                <Grid container spacing={2}>
                    <Card
                    component={Link} 
                    to={`/dashboard`}
                    sx={{
                        position: 'fixed',
                        bottom: 20,
                        left: 20,

                        width: '250px',
                        height: '40px',
                        color: 'inherit',
                        transition: 'transform 0.2s, box-shadow 0.2s',
                        p: 1.5,
                        zIndex: 1000,
                        overflow: 'hidden',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        '&:hover': {
                            transform: 'scale(1.02)', 
                            boxShadow: '0px 6px 18px rgba(0,0,0,0.12)',
                        }
                  }}>


                    Zurück zu Dashboard
                    </Card>
                </Grid>
            </Typography>
        </Box>
    );
}

export default SettingsPage;