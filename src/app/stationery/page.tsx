// src/app/stationery/page.tsx
import { prisma } from '@/lib/prisma';
import CategoryGrid from '@/components/category/CategoryGrid';
import { Product } from '@/types/product';

export const dynamic = 'force-dynamic';

export default async function StationeryPage() {
    let formattedProducts: Product[] = [];
    let isError = false;

    try {
        const rawProducts = await prisma.product.findMany({
            where: {
                category: 'Stationery',
            },
            include: {
                store: { select: { name: true } }, // Memanggil relasi store agar tidak error
            },
            orderBy: { createdAt: 'desc' },
        });

        // Mapping data agar sesuai dengan interface Product
        formattedProducts = rawProducts.map((p) => ({
            id: p.id,
            name: p.name,
            price: p.price,
            originalPrice: p.originalPrice ?? undefined, // Menangani originalPrice
            image: p.imageUrl || '/placeholder.png',
            category: 'Stationery',
            storeName: p.store?.name || 'Uinique Store', // Menangani store
            badge: p.price < 5000 ? "Best Seller" : undefined,
        }));
    } catch (error) {
        console.error("Database Error:", error);
        isError = true;
    }

    return (
        <div className="bg-[#f2f7fa] min-h-screen pt-10 pb-20">
            <main className="max-w-7xl mx-auto px-6">
                <div className="bg-white rounded-[40px] p-8 md:p-12 shadow-sm border border-gray-50">
                    {/* Menampilkan judul Stationery dan grid produk */}
                    <CategoryGrid
                        title="Stationery"
                        products={formattedProducts}
                        isError={isError}
                    />
                </div>
            </main>
        </div>
    );
}