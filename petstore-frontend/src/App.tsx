import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Pets from './pages/Pets'; // Import the new Pets page

export default function App() {
  return (
    <Box sx={{ width: '100%', maxWidth: '1900px', overflowX: 'hidden', backgroundColor: '#f9f9f9' }}>
      {/* AppBar now spans the full width */}
      <AppBar position="sticky" sx={{ width: '100%' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Pet Store
          </Typography>
          <Box>
            <Button color="inherit" component={Link} to="/">
              Home
            </Button>
            <Button color="inherit" component={Link} to="/pets">
              Pets
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Main content area takes the rest of the screen height */}
      <Box sx={{ px: 4, py: 4, width: '100%', minHeight: 'calc(100vh - 64px)' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pets" element={<Pets />} /> {/* Add route for Pets page */}
        </Routes>
      </Box>
    </Box>
  );
}