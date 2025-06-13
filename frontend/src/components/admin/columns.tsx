import { Button } from '@/components/ui/button';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, Edit, Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { Product } from '@/types/product';
import { Badge } from '../ui/badge';

interface Props {
  onDelete: (id: number) => void;
}

export const getColumns = ({ onDelete }: Props): ColumnDef<Product>[] => [
  {
    accessorKey: 'id',
    header: ({ column }) => (
      <Button
        variant='ghost'
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        className='h-8 px-2 lg:px-3'
      >
        ID
        <ArrowUpDown className='ml-2 h-4 w-4' />
      </Button>
    ),
    cell: ({ row }) => (
      <div className='text-muted-foreground font-medium'>
        #{row.getValue('id')}
      </div>
    ),
    size: 80,
  },
  {
    accessorKey: 'image',
    header: 'Image',
    cell: ({ row }) => {
      const image = row.getValue('image') as string;
      return (
        <div className='flex items-center justify-center'>
          {image ? (
            <div className='relative h-12 w-12 overflow-hidden rounded-md border'>
              <Image
                src={image}
                alt={row.getValue('name') as string}
                fill
                className='object-cover'
              />
            </div>
          ) : (
            <div className='bg-muted flex h-12 w-12 items-center justify-center rounded-md border'>
              <span className='text-muted-foreground text-xs'>No image</span>
            </div>
          )}
        </div>
      );
    },
    size: 100,
    enableSorting: false,
  },
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <Button
        variant='ghost'
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        className='h-8 px-2 lg:px-3'
      >
        Product Name
        <ArrowUpDown className='ml-2 h-4 w-4' />
      </Button>
    ),
    cell: ({ row }) => (
      <div className='max-w-[200px]'>
        <div className='truncate font-medium'>{row.getValue('name')}</div>
        <div className='text-muted-foreground truncate text-sm'>
          {row.original.description}
        </div>
      </div>
    ),
  },
  {
    accessorKey: 'price',
    header: ({ column }) => (
      <Button
        variant='ghost'
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        className='h-8 px-2 lg:px-3'
      >
        Price
        <ArrowUpDown className='ml-2 h-4 w-4' />
      </Button>
    ),
    cell: ({ row }) => {
      const price = parseFloat(row.getValue('price'));
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(price);

      return (
        <Badge variant='secondary' className='font-mono'>
          {formatted}
        </Badge>
      );
    },
    size: 120,
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => (
      <Button
        variant='ghost'
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        className='h-8 px-2 lg:px-3'
      >
        Created
        <ArrowUpDown className='ml-2 h-4 w-4' />
      </Button>
    ),
    cell: ({ row }) => {
      const date = new Date(row.getValue('createdAt'));
      return (
        <div className='text-muted-foreground text-sm'>
          {date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })}
        </div>
      );
    },
    size: 120,
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => (
      <div className='flex items-center gap-2'>
        <Button variant='outline' size='sm' asChild>
          <Link href={`/admin/product/${row.original.id}/edit`}>
            <Edit className='mr-1 h-3 w-3' />
            Edit
          </Link>
        </Button>
        <Button
          variant='destructive'
          size='sm'
          onClick={() => onDelete(row.original.id)}
        >
          <Trash2 className='mr-1 h-3 w-3' />
          Delete
        </Button>
      </div>
    ),
    size: 150,
    enableSorting: false,
  },
];
