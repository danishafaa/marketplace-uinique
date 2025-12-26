// src/app/page.tsx
import { prisma } from '@/lib/prisma';
import { createSupabaseServerClient } from '@/utils/supabase/server';
import CategorySection from '@/components/CategorySection';
import ProductCard from '@/components/ProductCard';
import Image from 'next/image';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

// Definisi Tipe Data agar tidak ada error TypeScript 'any'
interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string | null;
  storeName: string;
  isFavorite: boolean;
}

async function getProducts(): Promise<Product[]> {
  try {
    const supabase = await createSupabaseServerClient();
    // Memastikan koneksi supabase
    await supabase.auth.getSession();

    const rawProducts = await prisma.product.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        store: { select: { name: true } },
      },
    });

    return rawProducts.map((p) => ({
      id: p.id,
      name: p.name,
      price: p.price,
      imageUrl: p.imageUrl,
      storeName: p.store?.name || 'Uinique Store',
      isFavorite: false,
    }));
  } catch (error) {
    console.error("Database Error:", error);
    return [];
  }
}

export default async function HomePage() {
  const products = await getProducts();
  const bestSeller = products.slice(0, 6);

  return (
    // Background biru muda agar kontainer putih terlihat menonjol
    <div className="bg-[#f2f7fa] min-h-screen pb-20 font-sans">

      {/* Header TIDAK dipasang di sini agar tidak dobel */}

      <main className="max-w-7xl mx-auto px-4 pt-6 space-y-10">

        {/* --- 1. BANNER SECTION (Diperbaiki agar gambar muncul) --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-auto md:h-[320px]">
          {/* Banner Besar: UIN */}
          <div className="md:col-span-2 relative rounded-[40px] overflow-hidden shadow-sm h-[220px] md:h-full">
            <Image
              src="/banner-uin.png"
              alt="UIN"
              fill
              className="object-cover hover:scale-105 transition-transform duration-700"
              priority
            />
            <button className="absolute bottom-8 left-10 bg-white text-[#002b45] px-6 py-2 rounded-full text-[10px] font-bold shadow-md hover:scale-110 transition-transform">
              Buy Now
            </button>
          </div>

          {/* Banner Kecil: Skin Care */}
          <div className="relative rounded-[40px] overflow-hidden shadow-sm h-[220px] md:h-full">
            <Image
              src="/banner-skin.png"
              alt="Skin Care"
              fill
              className="object-cover hover:scale-105 transition-transform duration-700"
            />
            <button className="absolute bottom-8 left-10 bg-white text-[#002b45] px-6 py-2 rounded-full text-[10px] font-bold shadow-md hover:scale-110 transition-transform">
              Buy Now
            </button>
          </div>
        </div>

        {/* --- 2. CATEGORY SECTION --- */}
        <CategorySection />

        {/* --- 3. BEST SELLER SECTION (Dalam Kotak Putih Bulat) --- */}
        <section className="bg-white rounded-[40px] p-8 md:p-12 shadow-sm border border-gray-50">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-xl font-black text-[#002b45] italic uppercase tracking-tighter">
              Best Seller
            </h2>
            <Link href="/products" className="text-xs font-bold text-gray-400 hover:text-[#002b45]">
              See More &gt;
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-6 gap-6">
            {bestSeller.map((product) => (
              <ProductCard key={`best-${product.id}`} product={product} />
            ))}
          </div>
        </section>

        {/* --- 4. PRODUCT SECTION (Dalam Kotak Putih Bulat) --- */}
        <section className="bg-white rounded-[40px] p-8 md:p-12 shadow-sm border border-gray-50">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-xl font-black text-[#002b45] italic uppercase tracking-tighter">
              Product
            </h2>
            <Link href="/products" className="text-xs font-bold text-gray-400 hover:text-[#002b45]">
              See More &gt;
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-6 gap-6">
            {products.map((product) => (
              <ProductCard key={`prod-${product.id}`} product={product} />
            ))}
          </div>
        </section>

      </main>
    </div>
  );
}