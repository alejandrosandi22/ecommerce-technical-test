'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, ShoppingBag } from 'lucide-react';
import Link from 'next/link';

export default function EmptyCart() {
  return (
    <Card className='mx-auto max-w-md'>
      <CardContent className='p-8 text-center'>
        <div className='mb-4 flex justify-center'>
          <ShoppingBag className='h-16 w-16 text-gray-300' />
        </div>
        <h2 className='mb-2 text-xl font-semibold'>Your cart is empty</h2>
        <p className='mb-6 text-gray-600'>
          Looks like you haven&apos;t added any items to your cart yet.
        </p>
        <Button asChild className='w-full'>
          <Link href='/'>
            <ArrowLeft className='mr-2 h-4 w-4' />
            Continue Shopping
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
