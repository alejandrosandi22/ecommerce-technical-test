import ProductInfo from '@/components/admin/productInfo';
import { requireAdmin } from '@/lib/authServer';
import { getProductById } from '@/services/productService';
import { notFound, redirect } from 'next/navigation';

interface PageProps {
  params: { id: string };
}

export default async function AdminProductPage({ params }: PageProps) {
  const user = await requireAdmin();
  if (user.role !== 'admin') redirect('/');

  const productId = parseInt(params.id, 10);
  if (isNaN(productId)) notFound();

  let product;
  try {
    product = await getProductById(productId);
    if (!product) notFound();
  } catch (error) {
    console.error('Failed to fetch product:', error);
    notFound();
  }

  return <ProductInfo product={product} />;
}
