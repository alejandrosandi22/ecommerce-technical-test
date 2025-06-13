'use client';

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { Product } from '@/types/product';

interface ProductInfoProps {
  product: Product;
  onDelete?: () => void;
}

export default function ProductInfo({ product, onDelete }: ProductInfoProps) {
  const router = useRouter();

  return (
    <div className='w-full max-w-xl space-y-6 rounded-md bg-white p-6 shadow'>
      <h1 className='text-2xl font-semibold'>{product.name}</h1>

      {product.image && (
        <div className='relative h-40 w-40 overflow-hidden rounded-md border'>
          <Image
            src={product.image}
            alt={product.name}
            fill
            style={{ objectFit: 'cover' }}
            sizes='160px'
          />
        </div>
      )}

      <div>
        <h2 className='text-lg font-medium'>Description</h2>
        <p className='whitespace-pre-wrap text-gray-700'>
          {product.description || 'No description'}
        </p>
      </div>

      <div>
        <h2 className='text-lg font-medium'>Price</h2>
        <p>${product.price.toFixed(2)}</p>
      </div>

      <div className='flex gap-4 pt-4'>
        <Button
          variant='outline'
          onClick={() => router.push(`/admin/product/${product.id}/edit`)}
        >
          Edit
        </Button>
        <Button variant='destructive' onClick={onDelete}>
          Delete
        </Button>
      </div>
    </div>
  );
}
