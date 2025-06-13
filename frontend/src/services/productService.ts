import { PaginatedResponse } from '@/types/pagination';
import {
  CreateProductInput,
  Product,
  UpdateProductInput,
} from '@/types/product';
import { apiClient } from './apiClient';

export const getProducts = async (
  filters: {
    name?: string;
    page?: number;
    limit?: number;
    sortOrder?: 'asc' | 'desc';
  } = {},
): Promise<PaginatedResponse<Product>> => {
  const params = new URLSearchParams();

  if (filters.name) params.set('name', filters.name);
  if (filters.page) params.set('page', filters.page.toString());
  if (filters.limit) params.set('limit', filters.limit.toString());
  if (filters.sortOrder) params.set('sortOrder', filters.sortOrder);

  return await apiClient(`/products?${params.toString()}`, { method: 'GET' });
};

export const getProductById = async (id: number): Promise<Product> => {
  return await apiClient(`/products/${id}`, { method: 'GET' });
};

export const createProduct = async (
  data: CreateProductInput,
): Promise<Product> => {
  return await apiClient('/products', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};
export const updateProduct = async (id: number, data: UpdateProductInput) =>
  apiClient(`/products/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });

export const deleteProduct = async (id: number) =>
  apiClient(`/products/${id}`, {
    method: 'DELETE',
  });
