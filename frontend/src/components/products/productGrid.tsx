'use client';

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { Product } from '@/types/product';
import ProductCard from './productCard';

import { useSearchParams } from 'next/navigation';

interface ProductGridProps {
  products: Product[];
  page: number;
  count: number;
  limit?: number;
}

export const ProductGrid = ({
  products,
  page,
  count,
  limit = 12,
}: ProductGridProps) => {
  const totalPages = Math.ceil(count / limit);

  const searchParams = useSearchParams();

  const createPageLink = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', newPage.toString());
    return `?${params.toString()}`;
  };

  return (
    <div className='container mx-auto py-8'>
      <h2 className='sr-only'>Products</h2>

      <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <Pagination className='mt-8'>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href={page > 1 ? createPageLink(page - 1) : undefined}
              onClick={(e) => {
                if (page <= 1) e.preventDefault();
              }}
              className={page <= 1 ? 'pointer-events-none opacity-50' : ''}
            />
          </PaginationItem>

          {[...Array(totalPages)].map((_, i) => (
            <PaginationItem key={i + 1}>
              <PaginationLink
                href={createPageLink(i + 1)}
                isActive={i + 1 === page}
              >
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext
              href={page < totalPages ? createPageLink(page + 1) : undefined}
              onClick={(e) => {
                if (page >= totalPages) e.preventDefault();
              }}
              className={
                page >= totalPages ? 'pointer-events-none opacity-50' : ''
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};
