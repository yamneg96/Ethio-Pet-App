import axios from 'axios';
import { useAuthStore } from '../store/authStore';

const baseURL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:4000';

export const apiClient = axios.create({
  baseURL,
  timeout: 10000,
});

export const wsBaseURL = process.env.EXPO_PUBLIC_WS_URL || 'ws://localhost:4000/chat';

export function setAuthToken(token?: string) {
  if (token) {
    apiClient.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete apiClient.defaults.headers.common.Authorization;
  }
}

apiClient.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
