import CartContent from '@/components/cart/cartContent';
import { requireAuth } from '@/lib/authServer';

export default async function CartPage() {
  await requireAuth();

  return (
    <div className='min-h-screen'>
      <CartContent />
    </div>
  );
}
