// src/app/page.tsx
import { prisma } from '@/lib/prisma';
import { createSupabaseServerClient } from '@/utils/supabase/server';
import Header from '@/components/Header';
import CategorySection from '@/components/CategorySection';
import ProductCard from '@/components/ProductCard';
import Image from 'next/image';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

async function getProducts() {
  try {
    const supabase = await createSupabaseServerClient();
    const { data: { session } } = await supabase.auth.getSession();
    const userId = session?.user.id;

    // Ambil data produk secara sederhana dulu agar tidak crash
    const rawProducts = await prisma.product.findMany({
      take: 12,
      orderBy: { createdAt: 'desc' },
      include: {
        store: { select: { name: true } },
      },
    });

    if (!rawProducts) return [];

    return rawProducts.map((p) => ({
      id: p.id,
      name: p.name,
      price: p.price,
      imageUrl: p.imageUrl,
      storeName: p.store?.name || 'Uinique Store',
      isFavorite: false, // Kita matikan dulu fitur wishlist agar stabil
      createdAt: p.createdAt
    }));
  } catch (error) {
    console.error("DATABASE_ERROR:", error);
    return []; // Jika error, kembalikan list kosong agar web tidak crash
  }
}

export default async function HomePage() {
  const products = await getProducts();
  const bestSeller = products.slice(0, 6);

  return (
    <div className="bg-[#fcfcfc] min-h-screen pb-20 font-sans">
      <Header />
      <main className="max-w-7xl mx-auto px-4 mt-6 space-y-10">

        {/* Banner Section sesuai Home_Page.jpg */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-auto md:h-[320px]">
          <div className="md:col-span-2 relative rounded-[30px] overflow-hidden shadow-lg h-[220px] md:h-full">
            <Image src="/banner-uin.png" alt="UIN" fill className="object-cover" priority />
            <button className="absolute bottom-6 left-8 bg-white text-[#002b45] px-6 py-2 rounded-full text-xs font-bold hover:scale-105 transition-transform shadow-md">Buy Now</button>
          </div>
          <div className="relative rounded-[30px] overflow-hidden shadow-lg h-[220px] md:h-full">
            <Image src="/banner-skin.png" alt="Skin Care" fill className="object-cover" />
            <button className="absolute bottom-6 left-8 bg-white text-[#002b45] px-6 py-2 rounded-full text-xs font-bold shadow-md">Buy Now</button>
          </div>
        </div>

        <CategorySection />

        <section>
          <div className="flex justify-between items-center mb-6 px-2">
            <h2 className="text-xl font-black text-[#002b45] italic tracking-tight uppercase">Best Seller</h2>
            <Link href="/products" className="text-xs font-bold text-gray-400 hover:text-[#002b45]">See More &gt;</Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            {products.length > 0 ? (
              bestSeller.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <div className="col-span-full py-10 text-center bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                <p className="text-gray-400 text-sm">Belum ada produk. Pastikan database terhubung.</p>
              </div>
            )}
          </div>
        </section>

      </main>
    </div>
  );
}