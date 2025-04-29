// src/services/petServices.ts
import axios from 'axios';
import { Pet } from '../types';

const API_URL = 'http://localhost:8080/guarin/pets';

export const getPets = async (): Promise<Pet[]> => {
  const res = await axios.get<Pet[]>(API_URL);
  return res.data;
};

export const addPet = async (pet: Pet): Promise<Pet> => {
  const res = await axios.post<Pet>(API_URL, pet);
  return res.data;
};

export const updatePet = async (id: number, pet: Pet): Promise<void> => {
  try {
    // Exclude `id` from the body payload
    const { id: _, ...payload } = pet;
    await axios.put(`${API_URL}/${id}`, payload);
  } catch (err: any) {
    // Rethrow so your UI can catch it and extract the message
    const message = err.response?.data?.message || err.message;
    throw new Error(message);
  }
};

export const deletePet = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};

export const getPetsBySpecies = async (species: string): Promise<Pet[]> => {
  const res = await axios.get<Pet[]>(`${API_URL}/species/${species}`);
  return res.data;
};

export const getPetsByBreed = async (breed: string): Promise<Pet[]> => {
  const res = await axios.get<Pet[]>(`${API_URL}/breed/${breed}`);
  return res.data;
};

export const getPetsByAge = async (age: number): Promise<Pet[]> => {
  const res = await axios.get<Pet[]>(`${API_URL}/age/${age}`);
  return res.data;
};
