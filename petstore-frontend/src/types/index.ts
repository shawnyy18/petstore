import { ReactNode } from 'react';

export interface Pet {
  age: ReactNode;
  id?: number; // Optional for new pets
  name: string;
  species: string;
  breed: string;
  gender: string;
  price: number;
  image: string;
}
