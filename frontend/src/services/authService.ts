import { apiClient } from './apiClient';

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData extends LoginData {
  username: string;
}

export const login = (data: LoginData) =>
  apiClient<{
    accessToken: string;
    id: number;
    username: string;
    email: string;
    role: string;
  }>('/auth/signin', {
    method: 'POST',
    body: JSON.stringify(data),
  });

export const register = (data: RegisterData) =>
  apiClient('/auth/signup', {
    method: 'POST',
    body: JSON.stringify(data),
  });

export const getProfile = () =>
  apiClient<{ username: string; email: string }>('/user/me');

export const logout = async (): Promise<void> => {
  await apiClient('/auth/logout', {
    method: 'POST',
  });
};
