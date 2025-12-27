// src/app/best-seller/page.tsx
import { prisma } from '@/lib/prisma';
import BestSellerClient from '@/components/BestSellerClient';

export const dynamic = 'force-dynamic';

// 1. Definisikan Interface agar tidak error 'Unexpected any'
interface ProductItem {
    id: string;
    name: string;
    price: number;
    imageUrl: string | null;
    storeName: string;
    category: string;
    isFavorite: boolean;
}

export default async function BestSellerPage() {
    let formattedProducts: ProductItem[] = [];
    let errorState = false;

    // 2. Ambil data di dalam try/catch (Hanya logika data, bukan UI)
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
            // Gunakan casting aman untuk kategori agar sesuai desain Best Seller Drink
            category: (p as unknown as { category: string }).category || 'Drink',
            isFavorite: false,
        }));
    } catch (error) {
        console.error("Gagal memuat produk best seller:", error);
        errorState = true;
    }

    // 3. Tampilkan UI di LUAR blok try/catch untuk menghindari error ESLint
    if (errorState) {
        return (
            <div className="bg-[#f2f7fa] min-h-screen flex items-center justify-center">
                <p className="text-gray-500 font-medium">Gagal memuat data produk best seller.</p>
            </div>
        );
    }

    return (
        <div className="bg-[#f2f7fa] min-h-screen pb-20 pt-6">
            <main className="max-w-7xl mx-auto px-4">
                <BestSellerClient initialProducts={formattedProducts} />
            </main>
        </div>
    );
}