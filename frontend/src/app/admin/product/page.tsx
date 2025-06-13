import ProductsContent from '@/components/admin/ProductsContent';
import { requireAdmin } from '@/lib/authServer';

export default async function AdminProductsPage() {
  await requireAdmin();

  return (
    <div className='container mx-auto flex min-h-svh flex-col items-center justify-center p-6 md:p-10'>
      <ProductsContent />
    </div>
  );
}
