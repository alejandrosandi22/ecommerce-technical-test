'use client';

import { useCartStore } from '@/store/useCartStore';
import { ShoppingCart } from 'lucide-react';
import CartComponent from './cartComponent';
import EmptyCart from './emptyCart';

export default function CartContent() {
  const { items } = useCartStore();

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='mb-8 flex items-center gap-3'>
        <ShoppingCart className='h-8 w-8' />
        <h1 className='text-3xl font-bold'>Shopping Cart</h1>
      </div>

      {items.length === 0 ? <EmptyCart /> : <CartComponent />}
    </div>
  );
}
