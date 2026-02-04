import { apiClient } from './api';

export type MeResponse = {
  id: string;
  email: string;
  role: 'BUYER' | 'SELLER' | 'ADMIN';
  phone?: string;
};

export async function getMe(): Promise<MeResponse> {
  const { data } = await apiClient.get('/users/me');
  return data;
}
