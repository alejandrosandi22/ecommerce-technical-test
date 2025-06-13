'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { showToast } from '@/lib/toast';
import { addToCart as addToCartRequest } from '@/services/cartService';
import { useCartStore } from '@/store/useCartStore';
import { ImageIcon, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

interface ProductCardProps {
  product: {
    id: number;
    name: string;
    description: string;
    price: number;
    image?: string;
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCartStore();
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await addToCartRequest(product.id);

      addToCart({
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        image: product.image,
      });

      showToast.success('Product added to cart');
    } catch (error) {
      console.error('Error adding to cart:', error);
      showToast.error('Could not add to cart');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className='group flex h-full flex-col overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-lg'>
      <CardHeader className='pb-2'>
        <CardTitle className='group-hover:text-primary line-clamp-2 text-lg font-semibold transition-colors'>
          {product.name}
        </CardTitle>
      </CardHeader>

      <CardContent className='flex-1 space-y-4'>
        <div className='bg-muted relative aspect-square overflow-hidden rounded-lg'>
          {product.image && !imageError ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              className='object-cover transition-transform duration-300 group-hover:scale-105'
              onError={() => setImageError(true)}
              sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
            />
          ) : (
            <div className='flex h-full items-center justify-center'>
              <ImageIcon className='text-muted-foreground h-12 w-12' />
            </div>
          )}
        </div>

        <div className='space-y-2'>
          <p className='text-muted-foreground line-clamp-2 text-sm'>
            {product.description}
          </p>
          <Badge variant='secondary' className='text-lg font-bold'>
            ${product.price.toFixed(2)}
          </Badge>
        </div>
      </CardContent>

      <CardFooter className='pt-4'>
        <Button
          variant='default'
          className='w-full gap-2 transition-all duration-200'
          onClick={handleAddToCart}
          disabled={isLoading}
        >
          <ShoppingCart className='h-4 w-4' />
          {isLoading ? 'Adding...' : 'Add to Cart'}
        </Button>
      </CardFooter>
    </Card>
  );
}
