import React, { useState, useEffect } from 'react';
import { getPets, getPetsBySpecies } from '../services/petServices';
import { Pet } from '../types';
import { Box, TextField, Button, Grid, Card, CardContent, Typography } from '@mui/material';

const Pets: React.FC = () => {
  const [pets, setPets] = useState<Pet[]>([]);
  const [species, setSpecies] = useState('');

  const loadPets = async () => {
    const res = await getPets();
    setPets(res);
  };

  const handleFilterBySpecies = async () => {
    if (species.trim()) {
      const res = await getPetsBySpecies(species);
      setPets(res);
    } else {
      loadPets();
    }
  };

  useEffect(() => {
    loadPets();
  }, []);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Pets
      </Typography>
      <Box display="flex" gap={2} mb={4}>
        <TextField
          label="Filter by Species"
          value={species}
          onChange={(e) => setSpecies(e.target.value)}
        />
        <Button variant="contained" onClick={handleFilterBySpecies}>
          Filter
        </Button>
      </Box>
      <Grid container spacing={3} justifyContent="center">
        {pets.map((pet) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={pet.id}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {pet.name}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {pet.species} - {pet.breed}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Age: {pet.age}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Pets;