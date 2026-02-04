import { apiClient } from './api';

export type AuthTokens = {
  accessToken: string;
  refreshToken: string;
};

export async function login(email: string, password: string): Promise<AuthTokens> {
  const { data } = await apiClient.post('/auth/login', { email, password });
  return { accessToken: data.accessToken, refreshToken: data.refreshToken };
}

export async function register(email: string, password: string, role: 'BUYER' | 'SELLER', phone?: string) {
  const { data } = await apiClient.post('/auth/register', { email, password, role, phone });
  return data;
}

export async function refresh(refreshToken: string): Promise<AuthTokens> {
  const { data } = await apiClient.post('/auth/refresh', { refreshToken });
  return { accessToken: data.accessToken, refreshToken: data.refreshToken };
}

export async function logout() {
  const { data } = await apiClient.post('/auth/logout');
  return data;
}
