// src/app/page.tsx (Final Modification)

import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import Image from 'next/image';
import HeroSection from '@/components/HeroSection'; // <-- Import HeroSection

// Definisikan tipe untuk product (sudah ada)
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

// Fetching data di Server Component (sudah ada)
async function getProducts(): Promise<Product[]> {
  const products = await prisma.product.findMany({
    include: { store: true },
    orderBy: { createdAt: 'desc' },
  });
  return products;
}

export const dynamic = 'force-dynamic'
export const revalidate = 0
export default async function HomePage() {
  const products = await getProducts();

  return (
    // Wrap utama
    <div className="flex flex-col min-h-screen">

      {/* 1. HERO SECTION DENGAN BANNER DAN KATEGORI */}
      <HeroSection />

      {/* 2. AREA DAFTAR PRODUK */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-grow w-full">
        <h1 className="text-3xl font-extrabold mb-8 text-center text-darkgray">
          Produk Terbaru Untukmu
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product: Product) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="block bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
            >

              {/* Gambar Produk */}
              <div className="relative w-full h-48 bg-lightgray">
                <Image
                  src={product.imageUrl || '/placeholder.png'}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>

              {/* Detail Produk */}
              <div className="p-4">
                <h2 className="text-lg font-semibold truncate text-darkgray">{product.name}</h2>
                <p className="text-2xl font-bold text-red-600 mt-1">
                  Rp{product.price.toLocaleString('id-ID')}
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Toko: {product.store.name}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {products.length === 0 && (
          <p className="text-center text-gray-500 mt-10">Belum ada produk yang tersedia.</p>
        )}
      </div>
    </div>
  );
}