// src/components/PetFormModal.tsx
import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Button,
  TextField,
  Stack,
} from '@mui/material';
import { Pet } from '../types';

interface Props {
  open: boolean;
  onClose: () => void;
  onSave: (pet: Pet) => void;
  initialData?: Pet | null;
}

const PetFormModal: React.FC<Props> = ({ open, onClose, onSave, initialData }) => {
  const [form, setForm] = useState<Pet>({
    id: 0,
    name: '',
    species: '',
    breed: '',
    gender: '',
    price: 0,
    image: '',
    age: null, // Add the age property with an initial value
  });

  useEffect(() => {
    if (initialData) {
      setForm(initialData);
    } else {
      setForm({
        id: 0,
        name: '',
        species: '',
        breed: '',
        gender: '',
        price: 0,
        image: '',
        age: null, // Add the age property with an initial value
      });
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: name === 'price' ? parseFloat(value) || 0 : value,
    }));
  };

  const handleSubmit = () => {
    const isValid =
      form.name.trim() &&
      form.species.trim() &&
      form.breed.trim() &&
      form.gender.trim() &&
      form.price > 0 &&
      form.image.trim();

    if (!isValid) {
      alert('Please fill all fields correctly.');
      return;
    }

    onSave(form);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{initialData ? 'Edit Pet' : 'Add Pet'}</DialogTitle>
      <DialogContent>
        <Stack spacing={2} mt={1}>
          <TextField name="name" label="Name" value={form.name} onChange={handleChange} fullWidth />
          <TextField name="species" label="Species" value={form.species} onChange={handleChange} fullWidth />
          <TextField name="breed" label="Breed" value={form.breed} onChange={handleChange} fullWidth />
          <TextField name="gender" label="Gender" value={form.gender} onChange={handleChange} fullWidth />
          <TextField
            name="price"
            label="Price"
            type="number"
            value={form.price || 0}
            onChange={handleChange}
            fullWidth
          />
          <TextField name="image" label="Image URL" value={form.image} onChange={handleChange} fullWidth />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PetFormModal;
