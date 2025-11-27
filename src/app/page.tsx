// src/app/page.tsx

import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import Image from 'next/image';
import HeroSection from '@/components/HeroSection'; // <-- 1. IMPORT HERO SECTION

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
  // Ambil semua produk, termasuk nama toko (Store) yang menjualnya
  const products = await prisma.product.findMany({
    include: { store: true },
    orderBy: { createdAt: 'desc' }, // Tampilkan produk terbaru di atas
    // Anda bisa menambahkan 'take: 20' untuk membatasi jumlah di halaman awal
  });
  return products;
}

export const dynamic = 'force-dynamic'
export const revalidate = 0
export default async function HomePage() {
  const products = await getProducts();

  return (
    // 2. MODIFIKASI WRAPPER UTAMA
    <div className="flex flex-col min-h-screen">

      {/* 3. TAMBAHKAN HERO SECTION DI ATAS */}
      <HeroSection />

      {/* 4. WRAPPER UNTUK KONTEN PRODUK */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-grow w-full">
        <h1 className="text-3xl font-extrabold mb-8 text-center text-gray-800">
          Semua Produk Terbaru
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product: Product) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="block border rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
            >

              {/* Gambar Produk */}
              <div className="relative w-full h-48">
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
                <h2 className="text-lg font-semibold truncate">{product.name}</h2>
                <p className="text-xl font-bold text-green-700 mt-1">
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