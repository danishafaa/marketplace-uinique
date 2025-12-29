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
    // 2. Ambil kata kunci pencarian dari URL
    const query = searchParams.search || "";
    
    let formattedProducts: ProductItem[] = [];
    let errorState = false;

    try {
        const products = await prisma.product.findMany({
            // 3. Tambahkan filter pencarian berdasarkan nama atau deskripsi
            where: {
                OR: [
                    {
                        name: {
                            contains: query,
                            mode: 'insensitive', // Agar tidak peduli huruf besar/kecil
                        },
                    },
                    {
                        description: {
                            contains: query,
                            mode: 'insensitive',
                        },
                    },
                ],
            },
            orderBy: { createdAt: 'desc' },
            include: { store: { select: { name: true } } },
        });

        formattedProducts = products.map((p) => ({
            id: p.id,
            name: p.name,
            price: p.price,
            imageUrl: p.imageUrl,
            storeName: p.store?.name || 'Uinique Store',
            category: (p as unknown as { category: string }).category || 'Food',
            isFavorite: false,
        }));
    } catch (error) {
        console.error("Gagal memuat produk:", error);
        errorState = true;
    }

    if (errorState) {
        return <div className="p-20 text-center text-[#002b45] font-bold">Gagal memuat data produk.</div>;
    }

    return (
        <div className="bg-[#f2f7fa] min-h-screen pb-20 pt-6">
            <main className="max-w-7xl mx-auto px-4">
                {/* 4. Menampilkan informasi pencarian jika ada input */}
                {query && (
                    <div className="mb-8">
                        <h1 className="text-xl font-bold text-[#002b45]">
                            Search Results for: <span className="italic">"{query}"</span>
                        </h1>
                        <p className="text-sm text-gray-500">{formattedProducts.length} products found</p>
                    </div>
                )}
                
                <AllProductClient initialProducts={formattedProducts} />
            </main>
        </div>
    );
}