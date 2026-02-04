import { apiClient } from './api';

export type PetImage = { url: string; isPrimary: boolean };
export type Pet = {
  id: string;
  name: string;
  breed: string;
  ageMonths: number;
  price: number;
  location: string;
  featured: boolean;
  images?: PetImage[];
};

export async function listPets(params?: { featured?: boolean; breed?: string; location?: string; page?: number; limit?: number }): Promise<Pet[]> {
  const { data } = await apiClient.get('/pets', { params });
  return data;
}

export async function getPet(id: string): Promise<Pet> {
  const { data } = await apiClient.get(`/pets/${id}`);
  return data;
}
