'use client';

import { Button } from '@/components/ui/button';
import { showToast } from '@/lib/toast';
import { deleteProduct, getProducts } from '@/services/productService';
import { Product } from '@/types/product';
import { Plus, RefreshCw } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ConfirmDialog } from '../confirmDialog';
import ProductPagination from '../products/productPagination';
import { getColumns } from './columns';
import { DataTable } from './dataTable';

interface ProductsResponse {
  count: number;
  rows: Product[];
}

export default function ProductsContent() {
  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams.get('page') ?? '1', 10);
  const limit = 10; // items per page

  const [data, setData] = useState<ProductsResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<number | null>(null);

  const loadProducts = async () => {
    try {
      setIsLoading(true);
      const products = await getProducts({ page: currentPage, limit });
      setData(products);
    } catch (error) {
      console.error('Failed to load products:', error);
      showToast.error('Failed to load products');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, [currentPage]);

  const handleDeleteClick = (id: number) => {
    setProductToDelete(id);
    setIsDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (productToDelete === null) return;
    const toastId = showToast.loading('Deleting product...');

    try {
      await deleteProduct(productToDelete);
      setData((prev) =>
        prev
          ? {
              ...prev,
              count: prev.count - 1,
              rows: prev.rows.filter((p) => p.id !== productToDelete),
            }
          : prev,
      );
      showToast.success('Product deleted successfully');
    } catch (err) {
      console.error('Delete failed:', err);
      showToast.error('Failed to delete product');
    } finally {
      showToast.dismiss(toastId);
      setIsDialogOpen(false);
      setProductToDelete(null);
    }
  };

  if (isLoading) {
    return (
      <div className='flex min-h-[400px] items-center justify-center'>
        <div className='flex items-center space-x-2'>
          <RefreshCw className='h-4 w-4 animate-spin' />
          <span>Loading products...</span>
        </div>
      </div>
    );
  }

  const totalPages = data ? Math.max(1, Math.ceil(data.count / limit)) : 1;

  return (
    <>
      <div className='w-full space-y-6 py-8'>
        <div className='flex items-center justify-between'>
          <div>
            <h1 className='text-3xl font-bold tracking-tight'>Products</h1>
            <p className='text-muted-foreground'>
              Manage your product inventory
              {data && (
                <span className='ml-2'>
                  ({data.count} {data.count === 1 ? 'product' : 'products'})
                </span>
              )}
            </p>
          </div>

          <div className='flex items-center gap-2'>
            <Button variant='outline' onClick={loadProducts}>
              <RefreshCw className='mr-2 h-4 w-4' />
              Refresh
            </Button>
            <Button asChild>
              <Link href='/admin/product/create'>
                <Plus className='mr-2 h-4 w-4' />
                Add Product
              </Link>
            </Button>
          </div>
        </div>

        {data && (
          <DataTable
            columns={getColumns({ onDelete: handleDeleteClick })}
            data={data.rows}
          />
        )}

        {data && data.count > limit && (
          <div className='flex justify-center'>
            <ProductPagination totalPages={totalPages} />
          </div>
        )}
      </div>

      <ConfirmDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onConfirm={handleConfirmDelete}
        title='Delete Product'
        description='Are you sure you want to delete this product? This action cannot be undone and will permanently remove the product from your inventory.'
      />
    </>
  );
}
