'use client';

import { Button } from '@/components/ui/button';
import { showToast } from '@/lib/toast';
import { ProductFormValues } from '@/schemas/productSchema';
import { createProduct } from '@/services/productService';
import { CreateProductInput } from '@/types/product';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ProductForm } from './productForm';

export default function NewProductContent() {
  const router = useRouter();

  const handleCreate = async (values: ProductFormValues) => {
    const loadingId = showToast.loading('Creating product...');

    try {
      const productData: CreateProductInput = {
        name: values.name,
        description: values.description || '',
        price: values.price,
        image: values.image || undefined,
      };

      await createProduct(productData);
      showToast.success('Product created successfully');
      router.push('/admin/product');
      router.refresh();
    } catch (error) {
      console.error('Failed to create product:', error);
      showToast.error('Failed to create product');
    } finally {
      showToast.dismiss(loadingId);
    }
  };

  return (
    <div className='container mx-auto py-8'>
      <div className='mb-6 flex items-center justify-between'>
        <h1 className='text-2xl font-bold'>New Product</h1>
        <Button asChild variant='outline'>
          <Link href='/admin/product'>Back to List</Link>
        </Button>
      </div>

      <ProductForm onSubmit={handleCreate} onCancel={() => router.back()} />
    </div>
  );
}
