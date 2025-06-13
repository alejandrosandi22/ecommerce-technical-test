'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useCartStore } from '@/store/useCartStore';
import type { CartItem } from '@/types/cart';
import { Minus, Package, Plus, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import CheckoutDialog from './checkoutDialog';

export default function CartComponent() {
  const {
    items,
    removeFromCart,
    incrementQuantity,
    decrementQuantity,
    totalPrice,
    totalItems,
  } = useCartStore();

  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const shippingCost = totalPrice > 50 ? 0 : 5.99;
  const tax = totalPrice * 0.08; // 8% tax
  const finalTotal = totalPrice + shippingCost + tax;

  const groupedItems = items.reduce((acc: CartItem[], item) => {
    if (!item.productId) return acc;

    const existing = acc.find((i) => i.productId === item.productId);
    if (existing) {
      existing.quantity += item.quantity;
    } else {
      acc.push({ ...item });
    }
    return acc;
  }, []);

  return (
    <div className='grid grid-cols-1 gap-8 lg:grid-cols-3'>
      {/* Cart Items */}
      <div className='space-y-4 lg:col-span-2'>
        <Card>
          <CardContent className='p-0'>
            {groupedItems.map((item) => (
              <div key={item.productId}>
                <div className='flex items-center gap-4 p-6'>
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.name}
                      className='h-20 w-20 rounded-lg object-cover'
                      width={80}
                      height={80}
                    />
                  ) : (
                    <div className='flex h-20 w-20 items-center justify-center rounded-lg bg-gray-100'>
                      <Package className='h-8 w-8 text-gray-400' />
                    </div>
                  )}

                  <div className='flex-1 space-y-1'>
                    <h3 className='text-lg font-semibold'>{item.name}</h3>
                    <p className='text-lg font-medium'>
                      {typeof item.price === 'number'
                        ? `$${item.price.toFixed(2)}`
                        : 'N/A'}
                    </p>
                  </div>

                  <div className='flex items-center gap-3'>
                    <div className='flex items-center gap-2 rounded-lg border'>
                      <Button
                        variant='ghost'
                        size='sm'
                        onClick={() => decrementQuantity(item.productId)}
                      >
                        <Minus className='h-4 w-4' />
                      </Button>
                      <span className='w-12 text-center font-medium'>
                        {item.quantity}
                      </span>
                      <Button
                        variant='ghost'
                        size='sm'
                        onClick={() => incrementQuantity(item.productId)}
                      >
                        <Plus className='h-4 w-4' />
                      </Button>
                    </div>

                    <Button
                      variant='ghost'
                      size='sm'
                      onClick={() => removeFromCart(item.productId)}
                      className='text-red-500 hover:bg-red-50 hover:text-red-700'
                    >
                      <Trash2 className='h-4 w-4' />
                    </Button>
                  </div>
                </div>
                <Separator />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Order Summary */}
      <div className='space-y-6'>
        <Card>
          <CardContent className='p-6'>
            <h2 className='mb-4 text-xl font-semibold'>Order Summary</h2>

            <div className='space-y-3'>
              <div className='flex justify-between text-sm'>
                <span>Items ({totalItems}):</span>
                <span>${(totalPrice ?? 0).toFixed(2)}</span>
              </div>

              <div className='flex justify-between text-sm'>
                <span>Shipping:</span>
                <span>
                  {shippingCost === 0 ? (
                    <span className='font-medium text-green-600'>FREE</span>
                  ) : (
                    `$${shippingCost.toFixed(2)}`
                  )}
                </span>
              </div>

              <div className='flex justify-between text-sm'>
                <span>Tax:</span>
                <span>${tax.toFixed(2)}</span>
              </div>

              <Separator />

              <div className='flex justify-between text-lg font-semibold'>
                <span>Total:</span>
                <span>${finalTotal.toFixed(2)}</span>
              </div>
            </div>

            {totalPrice < 50 && (
              <div className='mt-4 rounded-lg bg-blue-50 p-3'>
                <p className='text-sm text-blue-700'>
                  Add ${(50 - totalPrice).toFixed(2)} more for free shipping!
                </p>
              </div>
            )}

            <Button
              className='mt-6 w-full'
              size='lg'
              onClick={() => setIsCheckoutOpen(true)}
            >
              Proceed to Checkout
            </Button>
          </CardContent>
        </Card>

        {/* Shipping Info */}
        <Card>
          <CardContent className='p-6'>
            <h3 className='mb-2 font-semibold'>Shipping Information</h3>
            <ul className='space-y-1 text-sm text-gray-600'>
              <li>• Free shipping on orders over $50</li>
              <li>• Standard delivery: 3-5 business days</li>
              <li>• Express delivery available at checkout</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <CheckoutDialog
        open={isCheckoutOpen}
        onOpenChange={setIsCheckoutOpen}
        total={finalTotal}
      />
    </div>
  );
}
