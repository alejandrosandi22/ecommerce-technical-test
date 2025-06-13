export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image?: string;
  createdAt: string;
  updatedAt: string;
}

export type UpdateProductInput = Partial<
  Omit<Product, 'id' | 'createdAt' | 'updatedAt'>
>;

export type CreateProductInput = Omit<
  Product,
  'id' | 'createdAt' | 'updatedAt'
>;

export interface UpdateProductInput {
  name: string;
  description?: string;
  price: number;
  image?: string;
}
