// src/app/page.tsx

import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import Image from 'next/image';
import HeroSection from '@/components/HeroSection';

// ====================
// TYPE PRODUCT
// ====================
interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string | null;
  store: {
    name: string;
  };
  createdAt: Date;
}

// ====================
// FETCH DATA (SERVER)
// ====================
async function getProducts(): Promise<Product[]> {
  return prisma.product.findMany({
    include: { store: true },
    orderBy: { createdAt: 'desc' },
  });
}

export const dynamic = 'force-dynamic';
export const revalidate = 0;

// ====================
// HOMEPAGE
// ====================
export default async function HomePage() {
  const products = await getProducts();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* HERO */}
      <HeroSection />

      {/* CONTENT */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-grow w-full">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">
          Produk UMKM Terbaru
        </h1>

        {/* PRODUCT GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="group bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
            >
              {/* IMAGE */}
              <div className="relative w-full h-48">
                <Image
                  src={product.imageUrl || '/placeholder.png'}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* INFO */}
              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-800 truncate">
                  {product.name}
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  {product.store.name}
                </p>

                <p className="text-blue-600 font-bold text-lg mt-2">
                  Rp {product.price.toLocaleString('id-ID')}
                </p>

                <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition">
                  Lihat Detail
                </button>
              </div>
            </Link>
          ))}
        </div>

        {/* EMPTY STATE */}
        {products.length === 0 && (
          <p className="text-center text-gray-500 mt-12">
            Belum ada produk yang tersedia.
          </p>
        )}
      </main>
    </div>
  );
}