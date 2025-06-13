import NewProductContent from '@/components/admin/newProductContent';
import { requireAdmin } from '@/lib/authServer';

export default async function AdminNewProductPage() {
  await requireAdmin();

  return (
    <div className='container mx-auto flex min-h-svh flex-col items-center justify-center p-6 md:p-10'>
      <NewProductContent />
    </div>
  );
}
