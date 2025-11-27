// src/app/page.tsx

import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import Image from 'next/image';
import SidebarKategori from '@/components/SidebarKategori'; // <-- TAMBAH BARIS INI
import HeroSectionContent from '@/components/HeroSectionContent'; // <-- TAMBAHKAN BARIS INI
import ProductCard from '@/components/ProductCard'; // <-- TAMBAHKAN BARIS INI
import PromoBanners from '@/components/PromoBanners'; // <-- TAMBAHKAN BARIS INI

export const dynamic = 'force-dynamic'
export const revalidate = 0

// Definisikan tipe untuk product (dipertahankan)
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

// Fetching data di Server Component (dipertahankan)
async function getProducts(): Promise<Product[]> {
  const products = await prisma.product.findMany({
    include: { store: true },
    orderBy: { createdAt: 'desc' },
  });
  return products;
}


export default async function HomePage() {
  const products = await getProducts();

  return (
    // Kontainer Utama: Padding dan Lebar Maksimal
    <div className="bg-lightgray min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Konten Utama - Menggunakan Grid 3 Kolom Sesuai Referensi */}
        <div className="grid grid-cols-12 gap-6">

          {/* Kolom 1: Kategori Sidebar (3/12 lebar) */}
          <div className="col-span-12 lg:col-span-3 hidden lg:block">
            <aside className="sticky top-20">
              <h2 className="text-xl font-bold mb-4 text-darkgray border-b pb-2">Kategori</h2>
              {/* Ganti dengan komponen yang diimpor: */}
              <SidebarKategori /> {/* <-- GUNAKAN KOMPONEN BARU */}
            </aside>
          </div>

          {/* Kolom 2: Hero & Daftar Produk (9/12 lebar) */}
          <div className="col-span-12 lg:col-span-9">

            {/* Area 1.A: Hero Section (Akan dibuat di Langkah 3) */}
            <HeroSectionContent />

            {/* ⚠️ AREA BARU: Promo Banners (Tambahkan di sini) */}
            <PromoBanners />

            {/* Area 1.B: Daftar Produk Terbaru (KODE LAMA) */}
            <h2 className="text-2xl font-bold mt-10 mb-6 text-darkgray">Produk Terbaru Untukmu</h2>

            {/* Daftar Produk (Gaya Baru) */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {products.map((product: Product) => (
                // Panggil komponen ProductCard untuk setiap produk
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {products.length === 0 && (
              <p className="text-center text-gray-500 mt-10">Belum ada produk yang tersedia.</p>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

