import { Button, Card, CardContent, Typography, Stack } from '@mui/material';
import { Pet } from '../types';

interface Props {
  pet: Pet;
  onEdit: (pet: Pet) => void;
  onDelete: (id: number) => void;
}

export default function PetCard({ pet, onEdit, onDelete }: Props) {
  const fallbackImage = 'https://via.placeholder.com/345x200?text=No+Image';

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderRadius: 3,
        boxShadow: 3,
        width: 345,  // Standard width
        height: 480, // Fixed height for all cards
        
      }}
    >
      {/* Image Section */}
      <div style={{ width: '100%', height: 200, overflow: 'hidden' }}>
        <img
          src={pet.image || fallbackImage}
          alt={pet.name || 'Pet Image'}
          style={{
            width: '100%',
            maxWidth: 345,
            height: '100%',
            objectFit: 'cover', // Ensures the image covers the area without distorting
            objectPosition: 'center',
            display: 'block',
          }}
        />
      </div>

      {/* Info Section */}
      <CardContent
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <Typography variant="h6" fontWeight="bold">
            {pet.name || 'Unknown Name'}
          </Typography>
          <Typography variant="body2">Species: {pet.species || 'Unknown'}</Typography>
          <Typography variant="body2">Breed: {pet.breed || 'Unknown'}</Typography>
          <Typography variant="body2">Gender: {pet.gender || 'Unknown'}</Typography>
          <Typography variant="subtitle1" fontWeight="bold" color="green" mt={1}>
            ${pet.price?.toFixed(2) || '0.00'}
          </Typography>
        </div>

        <Stack direction="row" spacing={2} mt={3} justifyContent="center">
          <Button
            variant="outlined"
            onClick={() => onEdit(pet)}
            sx={{ fontWeight: 'bold', width: 120 }}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => pet.id !== undefined && onDelete(pet.id)}
            sx={{ fontWeight: 'bold', width: 120 }}
          >
            Delete
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}
