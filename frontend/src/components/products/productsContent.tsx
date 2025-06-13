'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useDebounce } from '@/hooks/useDebounce';
import { getProducts } from '@/services/productService';
import { PaginatedResponse } from '@/types/pagination';
import { Product } from '@/types/product';
import { Filter, Package, RefreshCw, Search } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { ProductGrid } from './productGrid';

interface Filters {
  name?: string;
  sortOrder?: 'asc' | 'desc';
}

export default function ProductList() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = parseInt(searchParams.get('page') || '1');
  const initialName = searchParams.get('name') || '';
  const initialSortOrder =
    (searchParams.get('sortOrder') as 'asc' | 'desc') || undefined;

  const [filters, setFilters] = useState<Filters>({
    name: initialName,
    sortOrder: initialSortOrder,
  });

  const [data, setData] = useState<PaginatedResponse<Product> | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const debouncedFilters = useDebounce(filters, 500);

  const loadProducts = async (currentFilters: Filters, currentPage: number) => {
    try {
      setIsLoading(true);
      const result = await getProducts({
        ...currentFilters,
        page: currentPage,
        limit: 12,
      });
      setData(result);
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadProducts(debouncedFilters, page);
  }, [debouncedFilters, page]);

  const handleFilterChange = (
    key: keyof Filters,
    value: string | undefined,
  ) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value?.trim() || undefined,
    }));

    const params = new URLSearchParams(searchParams.toString());
    if (value?.trim()) {
      params.set(key, value.trim());
    } else {
      params.delete(key);
    }
    params.set('page', '1');
    router.push(`/products?${params.toString()}`);
  };

  const clearFilters = () => {
    setFilters({});
    router.push('/');
  };

  const hasActiveFilters = useMemo(() => {
    return Object.values(filters).some((value) => value && value.trim());
  }, [filters]);

  return (
    <div className='container mx-auto space-y-8 px-4 py-8'>
      {/* Header */}
      <div className='space-y-2 text-center'>
        <h1 className='text-4xl font-bold tracking-tight'>Our Products</h1>
        <p className='text-muted-foreground text-lg'>
          Discover our amazing collection of products
        </p>
      </div>

      {/* Filters Section */}
      <Card>
        <CardContent className='p-6'>
          <div className='space-y-4'>
            <div className='flex items-center gap-2'>
              <Filter className='text-muted-foreground h-5 w-5' />
              <h3 className='text-lg font-semibold'>Filters</h3>
              {hasActiveFilters && (
                <Button
                  variant='ghost'
                  size='sm'
                  onClick={clearFilters}
                  className='ml-auto'
                >
                  Clear All
                </Button>
              )}
            </div>

            <div className='grid gap-4 md:grid-cols-2'>
              {/* Search by Name */}
              <div className='relative'>
                <Search className='text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2' />
                <Input
                  type='text'
                  placeholder='Search by product name...'
                  className='pl-10'
                  value={filters.name || ''}
                  onChange={(e) => handleFilterChange('name', e.target.value)}
                />
              </div>

              {/* Sort Order */}
              <div>
                <Select
                  value={filters.sortOrder || ''}
                  onValueChange={(value) =>
                    handleFilterChange('sortOrder', value as 'asc' | 'desc')
                  }
                >
                  <SelectTrigger className='w-full'>
                    <SelectValue placeholder='Select order' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='desc'>Most Recent</SelectItem>
                    <SelectItem value='asc'>Oldest</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Loading State */}
      {isLoading && (
        <div className='flex items-center justify-center py-12'>
          <div className='flex items-center space-x-2'>
            <RefreshCw className='h-6 w-6 animate-spin' />
            <span className='text-lg'>Loading products...</span>
          </div>
        </div>
      )}

      {/* Products Grid */}
      {!isLoading && data && (
        <>
          {/* Results Info */}
          <div className='flex items-center justify-between'>
            <p className='text-muted-foreground'>
              {data.count === 0 ? (
                'No products found'
              ) : (
                <>
                  Showing {data.rows.length} of {data.count} products
                  {hasActiveFilters && ' (filtered)'}
                </>
              )}
            </p>
          </div>

          {data.count === 0 ? (
            <Card className='p-12 text-center'>
              <CardContent className='space-y-4'>
                <Package className='text-muted-foreground mx-auto h-16 w-16' />
                <h3 className='text-xl font-semibold'>No Products Found</h3>
                <p className='text-muted-foreground mx-auto max-w-md'>
                  {hasActiveFilters
                    ? 'Try adjusting your search criteria or clear the filters to see all products.'
                    : 'There are no products available at the moment.'}
                </p>
                {hasActiveFilters && (
                  <Button onClick={clearFilters}>Clear Filters</Button>
                )}
              </CardContent>
            </Card>
          ) : (
            <ProductGrid
              products={data.rows}
              count={data.count}
              page={page}
              limit={12}
            />
          )}
        </>
      )}
    </div>
  );
}
