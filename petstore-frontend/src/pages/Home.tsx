// src/pages/Home.tsx
import { useState, useEffect } from 'react';
import { Box, Grid, Fab, Tooltip, Typography } from '@mui/material'; // ✨ Added Typography
import AddIcon from '@mui/icons-material/Add';
import PetCard from '../components/PetCard';
import PetFormModal from '../components/PetFormModal';
import AddPetModal from '../components/AddPetModal';
import { Pet } from '../types';
import { getPets, addPet, updatePet, deletePet } from '../services/petServices';

export default function Home() {
  const [pets, setPets] = useState<Pet[]>([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [editingPet, setEditingPet] = useState<Pet | null>(null);

  useEffect(() => {
    (async () => {
      try {
        setPets(await getPets());
      } catch (e) {
        console.error('Fetch error:', e);
      }
    })();
  }, []);

  const handleSaveEdit = async (pet: Pet) => {
    try {
      const cleaned: Pet = {
        ...pet,
        id: Number(pet.id),
        name: pet.name.trim(),
        species: pet.species.trim(),
        breed: pet.breed.trim(),
        gender: pet.gender.trim(),
        image: pet.image.trim(),
        price: parseFloat(String(pet.price)) || 0,
      };

      console.log('→ PUT payload:', JSON.stringify(cleaned, null, 2));

      if (cleaned.id !== undefined) {
        await updatePet(cleaned.id, cleaned);
      } else {
        throw new Error('Pet ID is undefined.');
      }
      setPets(prev => prev.map(x => x.id === cleaned.id ? cleaned : x));

      setModalOpen(false);
      setEditingPet(null);
    } catch (err: any) {
      const serverMsg = typeof err.response?.data === 'string'
        ? err.response.data
        : err.response?.data?.message;
      alert(serverMsg || 'Failed to update pet. Please try again.');
    }
  };

  const handleSaveAdd = async (pet: Omit<Pet, 'id'>) => {
    try {
      const cleaned = {
        name: pet.name.trim(),
        species: pet.species.trim(),
        breed: pet.breed.trim(),
        gender: pet.gender.trim(),
        image: pet.image.trim(),
        price: parseFloat(String(pet.price)) || 0,
      };

      console.log('→ POST payload:', JSON.stringify(cleaned, null, 2));

      const newPet = await addPet(cleaned as Pet);
      setPets(prev => [...prev, newPet]);

      setAddModalOpen(false);
    } catch (err: any) {
      const serverMsg = typeof err.response?.data === 'string'
        ? err.response.data
        : err.response?.data?.message;
      alert(serverMsg || 'Failed to add pet. Please try again.');
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deletePet(id);
      setPets(prev => prev.filter(pet => pet.id !== id));
    } catch (err: any) {
      console.error('✗ Error deleting pet:', err);
      alert('Failed to delete pet. Please try again.');
    }
  };

  return (
    <Box sx={{ px: 4, py: 4, width: '100%' }}>
      {pets.length === 0 ? (
        <Box
          sx={{
            height: '60vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography variant="h5" color="text.secondary">
            No pets available
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={3} alignItems="stretch" justifyContent="center">
          {pets.map(pet => (
            <Grid key={pet.id} sx={{ display: 'flex', justifyContent: 'center' }}>
              <PetCard
                pet={pet}
                onEdit={() => { setEditingPet(pet); setModalOpen(true); }}
                onDelete={() => pet.id !== undefined && handleDelete(pet.id)}
              />
            </Grid>
          ))}
        </Grid>
      )}

      <Tooltip title="Add Pet">
        <Fab
          color="primary"
          sx={{ position: 'fixed', bottom: 16, right: 16 }}
          onClick={() => setAddModalOpen(true)}
        >
          <AddIcon />
        </Fab>
      </Tooltip>

      <PetFormModal
        open={isModalOpen}
        onClose={() => { setModalOpen(false); setEditingPet(null); }}
        onSave={handleSaveEdit}
        initialData={editingPet}
      />

      <AddPetModal
        open={isAddModalOpen}
        onClose={() => setAddModalOpen(false)}
        onSave={handleSaveAdd}
      />
    </Box>
  );
}
