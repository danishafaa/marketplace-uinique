// src/components/BestSellerSection.tsx
import Link from 'next/link';
import ProductCard from './ProductCard';
import { prisma } from '@/lib/prisma';

export default async function BestSellerSection() {
    // Ambil data langsung dari server component
    const products = await prisma.product.findMany({
        take: 6,
        orderBy: { createdAt: 'desc' },
        include: { store: { select: { name: true } } },
    });

    const formattedProducts = products.map((p) => ({
        id: p.id,
        name: p.name,
        price: p.price,
        imageUrl: p.imageUrl,
        storeName: p.store?.name || 'Uinique Store',
        isFavorite: false,
        badge: "Best Seller"
    }));

    return (
        <section className="bg-white rounded-[40px] p-8 md:p-12 shadow-sm border border-gray-50">
            <div className="flex justify-between items-center mb-10">
                <h2 className="text-xl font-black text-[#002b45] italic uppercase tracking-tighter">
                    Best Seller
                </h2>
                <Link href="/best-seller" className="text-xs font-bold text-gray-400 hover:text-[#002b45]">
                    See More &gt;
                </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-6 gap-6">
                {formattedProducts.map((product) => (
                    <ProductCard key={`best-${product.id}`} product={product} />
                ))}
            </div>
        </section>
    );
}