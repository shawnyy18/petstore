// src/components/AddPetModal.tsx
import React, { useState } from 'react';
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
  onSave: (pet: Omit<Pet, 'id'>) => void;
}

const AddPetModal: React.FC<Props> = ({ open, onClose, onSave }) => {
  const [form, setForm] = useState<Omit<Pet, 'id'>>({
    name: '',
    species: '',
    breed: '',
    gender: '',
    price: 0,
    image: '',
    age: '', // Added the missing 'age' property
  });

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
      <DialogTitle>Add New Pet</DialogTitle>
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
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddPetModal;
