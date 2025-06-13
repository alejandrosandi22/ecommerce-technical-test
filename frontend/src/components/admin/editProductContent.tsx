'use client';

import { Button } from '@/components/ui/button';
import { showToast } from '@/lib/toast';
import { getProductById, updateProduct } from '@/services/productService';
import { Product, UpdateProductInput } from '@/types/product';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ProductForm } from './productForm';

interface EditProductContentProps {
  productId: number;
}

export default function EditProductContent({
  productId,
}: EditProductContentProps) {
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const data = await getProductById(productId);
        setProduct(data);
      } catch (error: unknown) {
        console.error('Error loading product:', error);
        showToast.error('Could not load product');
      } finally {
        setLoading(false);
      }
    };

    if (!isNaN(productId)) {
      loadProduct();
    } else {
      showToast.error('Invalid product ID');
      router.push('/admin/product');
    }
  }, [productId, router]);

  const handleUpdate = async (values: UpdateProductInput) => {
    const loadingId = showToast.loading('Updating product...');
    try {
      await updateProduct(productId, values);
      showToast.success('Product updated successfully');
      router.push('/admin/product');
    } catch (error: unknown) {
      console.error('Failed to update product:', error);
      showToast.error('Failed to update product');
    } finally {
      showToast.dismiss(loadingId);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!product) return <p>Product not found</p>;

  return (
    <div className='container mx-auto py-8'>
      <div className='mb-6 flex items-center justify-between'>
        <h1 className='text-2xl font-bold'>Edit Product</h1>
        <Button asChild variant='outline'>
          <Link href='/admin/product'>Back to List</Link>
        </Button>
      </div>

      <ProductForm
        defaultValues={{
          name: product.name,
          description: product.description,
          price: product.price,
          image: product.image || undefined,
        }}
        onSubmit={handleUpdate}
        onCancel={() => router.back()}
      />
    </div>
  );
}
