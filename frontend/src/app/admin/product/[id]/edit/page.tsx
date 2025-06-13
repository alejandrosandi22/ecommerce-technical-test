import EditProductContent from '@/components/admin/editProductContent';
import { requireAdmin } from '@/lib/authServer';

export default async function AdminEditProductPage({
  params,
}: {
  params: { id: string };
}) {
  await requireAdmin();

  const productId = parseInt(params.id, 10);
  if (isNaN(productId)) return <p>Invalid product ID</p>;

  return (
    <div className='container mx-auto flex min-h-svh flex-col items-center justify-center p-6 md:p-10'>
      <EditProductContent productId={productId} />
    </div>
  );
}
