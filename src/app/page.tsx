// src/app/page.tsx/

import { prisma } from '@/lib/prisma';
import { createSupabaseServerClient } from '@/utils/supabase/server';
import Header from '@/components/Header';
import CategorySection from '@/components/CategorySection';
import ProductCard from '@/components/ProductCard';
import Image from 'next/image';
import Link from 'next/link';

// Agar data selalu fresh saat dibuka
export const dynamic = 'force-dynamic';
export const revalidate = 0;

// Fungsi untuk mengambil produk dari Database
async function getProducts() {
  const supabase = await createSupabaseServerClient();
  const { data: { session } } = await supabase.auth.getSession();
  const userId = session?.user.id;

  // Ambil produk terbaru (limit 12)
  const rawProducts = await prisma.product.findMany({
    take: 12,
    orderBy: { createdAt: 'desc' },
    include: {
      store: { select: { name: true } },
      // Cek apakah user yang login sudah melike produk ini
      wishlistItems: userId ? {
        where: { wishlist: { buyerId: userId } },
        select: { id: true }
      } : false
    },
  });

  // Format data agar sesuai dengan ProductCard
  return rawProducts.map(p => ({
    id: p.id,
    name: p.name,
    price: p.price,
    imageUrl: p.imageUrl,
    store: p.store,
    isFavorite: p.wishlistItems.length > 0,
    createdAt: p.createdAt
  }));
}

export default async function HomePage() {
  const products = await getProducts();

  // Pisahkan produk untuk "Best Seller" (misal: ambil 6 pertama)
  const bestSellerProducts = products.slice(0, 6);
  // Sisanya untuk bagian "Product"
  const recentProducts = products;

  return (
    <div className="bg-[#fcfcfc] min-h-screen pb-20 font-sans">

      {/* 1. HEADER NAVY BARU */}
      <Header />

      <main className="max-w-7xl mx-auto px-4 mt-6 space-y-10">

        {/* 2. HERO SECTION (BANNERS) */}
        {/* Grid: Kiri Besar (UIN), Kanan Kecil (Skincare) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-auto md:h-[320px]">

          {/* Banner Besar (UIN Jakarta) */}
          <div className="md:col-span-2 relative rounded-[30px] overflow-hidden shadow-lg h-[200px] md:h-full group">
            <Image
              src="/banner-uin.jpg" // ⚠️ Pastikan ada file ini di folder public/
              alt="UIN Syarif Hidayatullah"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              priority
            />
            {/* Overlay Gradient Halus */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

            <button className="absolute bottom-6 left-8 bg-white text-[#002b45] px-6 py-2 rounded-full text-xs font-bold shadow-md hover:bg-gray-100 transition-transform hover:scale-105">
              Buy Now
            </button>
          </div>

          {/* Banner Kecil (Skin Barrier/Promo Lain) */}
          <div className="relative rounded-[30px] overflow-hidden shadow-lg h-[200px] md:h-full group">
            <Image
              src="/banner-skin.jpg" // ⚠️ Pastikan ada file ini di folder public/
              alt="Skin Care Promo"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            <button className="absolute bottom-6 left-8 bg-white text-[#002b45] px-6 py-2 rounded-full text-xs font-bold shadow-md hover:bg-gray-100 transition-transform hover:scale-105">
              Buy Now
            </button>
          </div>
        </div>

        {/* 3. CATEGORIES SECTION */}
        <CategorySection />

        {/* 4. BEST SELLER SECTION */}
        <section>
          <div className="flex justify-between items-center mb-6 px-2">
            <h2 className="text-xl font-black text-[#002b45] tracking-tight">Best Seller</h2>
            <Link href="/best-seller" className="text-xs font-bold text-gray-400 hover:text-[#002b45] transition-colors">
              See More &gt;
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {bestSellerProducts.length > 0 ? (
              bestSellerProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <p className="col-span-full text-center text-gray-400 py-10 text-sm">Belum ada produk best seller.</p>
            )}
          </div>
        </section>

        {/* 5. ALL PRODUCTS SECTION */}
        <section>
          <div className="flex justify-between items-center mb-6 px-2">
            <h2 className="text-xl font-black text-[#002b45] tracking-tight">Product</h2>
            <Link href="/products" className="text-xs font-bold text-gray-400 hover:text-[#002b45] transition-colors">
              See More &gt;
            </Link>
          </div>

          {/* Scrolling Horizontal untuk Mobile, Grid untuk Desktop */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {recentProducts.length > 0 ? (
              recentProducts.map((product) => (
                <ProductCard key={`recent-${product.id}`} product={product} />
              ))
            ) : (
              <p className="col-span-full text-center text-gray-400 py-10 text-sm">Belum ada produk yang diupload.</p>
            )}
          </div>
        </section>

      </main>
    </div>
  );
}