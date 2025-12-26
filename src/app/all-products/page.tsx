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

export default async function AllProductsPage() {
    // INISIALISASI DENGAN TIPE DATA (Ini solusi error 'implicit any')
    let formattedProducts: ProductItem[] = [];
    let errorState = false;

    try {
        const products = await prisma.product.findMany({
            orderBy: { createdAt: 'desc' },
            include: { store: { select: { name: true } } },
        });

        formattedProducts = products.map((p) => ({
            id: p.id,
            name: p.name,
            price: p.price,
            imageUrl: p.imageUrl,
            storeName: p.store?.name || 'Uinique Store',
            // Gunakan casting aman jika kolom category belum ada di database
            category: (p as unknown as { category: string }).category || 'Food',
            isFavorite: false,
        }));
    } catch (error) {
        console.error("Gagal memuat produk:", error);
        errorState = true;
    }

    if (errorState) {
        return <div className="p-20 text-center">Gagal memuat data produk.</div>;
    }

    return (
        <div className="bg-[#f2f7fa] min-h-screen pb-20 pt-6">
            <main className="max-w-7xl mx-auto px-4">
                <AllProductClient initialProducts={formattedProducts} />
            </main>
        </div>
    );
}