// src/app/all-products/page.tsx
import { prisma } from '@/lib/prisma';
import AllProductClient from '@/components/AllProductClient';

export const dynamic = 'force-dynamic';

// DEFINISI TIPE DATA YANG SAMA DENGAN CLIENT
interface ProductItem {
    id: string;
    name: string;
    price: number;
    imageUrl: string | null;
    storeName: string;
    category: string;
    isFavorite: boolean;
}

export default async function AllProductsPage({
    searchParams,
}: {
    searchParams: { search?: string };
}) {
    // 1. Tangkap kata kunci pencarian dari URL
    const query = searchParams.search || "";
    
    let formattedProducts: ProductItem[] = [];

    try {
        // 2. Kirim perintah filter ke database Prisma
        const products = await prisma.product.findMany({
            where: query ? {
                OR: [
                    { name: { contains: query, mode: 'insensitive' } },
                    { description: { contains: query, mode: 'insensitive' } },
                ],
            } : {}, // Jika query kosong, tampilkan semua
            orderBy: { createdAt: 'desc' },
            include: { store: { select: { name: true } } },
        });

        formattedProducts = products.map((p) => ({
            id: p.id,
            name: p.name,
            price: p.price,
            imageUrl: p.imageUrl,
            storeName: p.store?.name || 'Uinique Store',
            category: (p as any).category || 'Food',
            isFavorite: false,
        }));
    } catch (error) {
        console.error("Gagal memuat produk:", error);
    }

    return (
        <div className="bg-[#f2f7fa] min-h-screen pb-20 pt-6">
            <main className="max-w-7xl mx-auto px-4">
                {query && (
                    <div className="mb-6">
                        <h1 className="text-xl font-bold text-[#002b45]">
                            Showing results for: <span className="italic">"{query}"</span>
                        </h1>
                        <p className="text-sm text-gray-500">{formattedProducts.length} products found</p>
                    </div>
                )}
                
                {/* 3. PENTING: Tambahkan key={query}. 
                  Ini memaksa React merender ulang komponen Client jika hasil pencarian berubah. 
                */}
                <AllProductClient key={query} initialProducts={formattedProducts} />
            </main>
        </div>
    );
}