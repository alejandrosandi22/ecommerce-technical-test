import { z } from 'zod';

export const productFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters long'),
  description: z.string().optional(),
  price: z.number().positive('Price must be greater than zero'),
  image: z.string().optional(),
});

export type ProductFormValues = z.infer<typeof productFormSchema>;
