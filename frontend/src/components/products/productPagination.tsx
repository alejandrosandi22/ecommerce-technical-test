'use client';

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { usePathname, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

interface ProductPaginationProps {
  totalPages: number;
}

export default function ProductPagination({
  totalPages,
}: ProductPaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentPage = parseInt(searchParams.get('page') ?? '1', 10);

  const createPageURL = useCallback(
    (pageNumber: number | string) => {
      const params = new URLSearchParams(searchParams);
      params.set('page', pageNumber.toString());
      return `${pathname}?${params.toString()}`;
    },
    [searchParams, pathname],
  );

  /* Calculates an array of page numbers to show (up to 5 surrounding pages) */
  const getPageNumbers = () => {
    const pages: number[] = [];
    let start = Math.max(1, currentPage - 2);
    let end = Math.min(totalPages, currentPage + 2);

    if (end - start + 1 < 5) {
      if (currentPage <= 3) {
        end = Math.min(totalPages, 5);
      } else {
        start = Math.max(1, totalPages - 4);
        end = totalPages;
      }
    }

    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <Pagination>
      <PaginationContent>
        {/* Previous */}
        <PaginationItem>
          <PaginationPrevious
            href={currentPage > 1 ? createPageURL(currentPage - 1) : '#'}
            className={
              currentPage === 1 ? 'pointer-events-none opacity-50' : ''
            }
          />
        </PaginationItem>

        {/* First page shortcut */}
        {totalPages > 5 && currentPage > 3 && (
          <>
            <PaginationItem>
              <PaginationLink href={createPageURL(1)}>1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          </>
        )}

        {/* Dynamic page numbers */}
        {pageNumbers.map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              href={createPageURL(page)}
              isActive={page === currentPage}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}

        {/* Last page shortcut */}
        {totalPages > 5 && currentPage < totalPages - 1 && (
          <>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href={createPageURL(totalPages)}>
                {totalPages}
              </PaginationLink>
            </PaginationItem>
          </>
        )}

        {/* Next */}
        <PaginationItem>
          <PaginationNext
            href={
              currentPage < totalPages ? createPageURL(currentPage + 1) : '#'
            }
            className={
              currentPage === totalPages ? 'pointer-events-none opacity-50' : ''
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
