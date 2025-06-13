import type { CartItem } from '@/types/cart';
import { apiClient } from './apiClient';

export const getCart = async () => {
  return await apiClient<CartItem[]>('/cart', {
    method: 'GET',
  });
};

export const addToCart = async (productId: number) => {
  return await apiClient('/cart', {
    method: 'POST',
    body: JSON.stringify({ productId, quantity: 1 }),
  });
};

export const removeFromCart = async (productId: number) => {
  return await apiClient(`/cart/${productId}`, {
    method: 'DELETE',
  });
};

export const clearCartOnServer = async () => {
  return await apiClient('/cart', {
    method: 'DELETE',
  });
};
