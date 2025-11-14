// src/app/dashboard/seller/setup/products/page.tsx

import { prisma } from '@/lib/prisma';
import { createSupabaseServerClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import Image from 'next/image';
import { deleteProduct } from './actions'; // ✅ Import dari folder yang sama
import { CreateProductForm } from './components/CreateProductForm'; // ✅ Import dari folder yang sama

export const dynamic = 'force-dynamic';

interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string | null;
  description: string;
}

async function getProducts() {
  const supabase = await createSupabaseServerClient();
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) redirect('/login');

  const store = await prisma.store.findUnique({
    where: { profileId: session.user.id },
    select: {
      id: true,
      name: true,
      products: {
        orderBy: { createdAt: 'desc' }
      }
    },
  });

  if (!store) redirect('/dashboard/seller/setup');
  return store;
}

export default async function SellerProductsPage() {
  const store = await getProducts();

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Produk Toko: {store.name}</h1>
      <p className="mb-6">{store.products.length} Produk Ditemukan</p>

      <CreateProductForm />

      <div className="mt-8 space-y-4">
        {store.products.map((product: Product) => (
          <div key={product.id} className="p-4 border rounded flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="relative w-16 h-16">
                <Image
                  src={product.imageUrl || '/placeholder.png'}
                  alt={product.name}
                  fill
                  className="object-cover rounded"
                />
              </div>
              <div>
                <p className="font-semibold">{product.name}</p>
                <p className="text-sm">Rp{product.price.toLocaleString('id-ID')}</p>
              </div>
            </div>

            <form action={deleteProduct.bind(null, product.id)} className="space-x-2">
              <button
                type="submit"
                className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
              >
                Hapus
              </button>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
}