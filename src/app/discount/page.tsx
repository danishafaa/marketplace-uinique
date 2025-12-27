// src/app/discount/page.tsx
import { prisma } from '@/lib/prisma';
import DiscountClient from '@/components/DiscountClient';

export const dynamic = 'force-dynamic';

// 1. Definisikan Interface resmi agar tidak ada error 'Unexpected any'
interface ProductItem {
    id: string;
    name: string;
    price: number;
    discountPrice: number;
    imageUrl: string | null;
    storeName: string;
    category: string;
    isFavorite: boolean;
}

export default async function DiscountPage() {
    let formattedProducts: ProductItem[] = [];
    let errorState = false;

    // 2. Ambil data di dalam try/catch (Hanya data, bukan JSX/Tampilan)
    try {
        const products = await prisma.product.findMany({
            orderBy: { createdAt: 'desc' },
            include: { store: { select: { name: true } } },
        });

        // 3. Mapping data dengan tipe data yang benar tanpa 'any' atau '@ts-ignore'
        formattedProducts = products.map((p) => {
            // Logic diskon: gunakan discountPrice dari DB atau hitung otomatis 20% jika kosong
            const dbProduct = p as unknown as { discountPrice?: number; category?: string };
            const dPrice = dbProduct.discountPrice || p.price * 0.8;

            return {
                id: p.id,
                name: p.name,
                price: p.price,
                discountPrice: dPrice,
                imageUrl: p.imageUrl,
                storeName: p.store?.name || 'Uinique Store',
                category: dbProduct.category || 'Food',
                isFavorite: false,
            };
        });
    } catch {
        errorState = true;
    }

    // 4. Tampilkan UI di LUAR blok try/catch agar tidak error ESLint
    if (errorState) {
        return (
            <div className="bg-[#f2f7fa] min-h-screen flex items-center justify-center">
                <p className="text-gray-500 font-medium">Gagal memuat produk diskon.</p>
            </div>
        );
    }

    return (
        <div className="bg-[#f2f7fa] min-h-screen pb-20 pt-6">
            <main className="max-w-7xl mx-auto px-4">
                {/* Mengirim data ke komponen client untuk filter kategori sesuai desain */}
                <DiscountClient initialProducts={formattedProducts} />
            </main>
        </div>
    );
}