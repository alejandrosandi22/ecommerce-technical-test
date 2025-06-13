'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useCartStore } from '@/store/useCartStore';
import { CreditCard, Lock } from 'lucide-react';
import { useState } from 'react';

interface CheckoutDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  total: number;
}

export default function CheckoutDialog({
  open,
  onOpenChange,
  total,
}: CheckoutDialogProps) {
  const { clearCart } = useCartStore();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCheckout = async () => {
    setIsProcessing(true);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    clearCart();
    setIsProcessing(false);
    onOpenChange(false);

    alert('Order placed successfully!');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle className='flex items-center gap-2'>
            <CreditCard className='h-5 w-5' />
            Checkout
          </DialogTitle>
          <DialogDescription>Complete your purchase securely</DialogDescription>
        </DialogHeader>

        <div className='space-y-4'>
          <div className='space-y-2'>
            <Label htmlFor='email'>Email</Label>
            <Input id='email' type='email' placeholder='your@email.com' />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='card'>Card Number</Label>
            <Input id='card' placeholder='1234 5678 9012 3456' />
          </div>

          <div className='grid grid-cols-2 gap-4'>
            <div className='space-y-2'>
              <Label htmlFor='expiry'>Expiry</Label>
              <Input id='expiry' placeholder='MM/YY' />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='cvc'>CVC</Label>
              <Input id='cvc' placeholder='123' />
            </div>
          </div>

          <Separator />

          <div className='flex justify-between font-semibold'>
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>

        <DialogFooter>
          <div className='flex w-full flex-col space-y-2'>
            <Button
              onClick={handleCheckout}
              className='w-full'
              disabled={isProcessing}
            >
              <Lock className='mr-2 h-4 w-4' />
              {isProcessing ? 'Processing...' : `Pay $${total.toFixed(2)}`}
            </Button>
            <p className='text-center text-xs text-gray-500'>
              Your payment information is secure and encrypted
            </p>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
