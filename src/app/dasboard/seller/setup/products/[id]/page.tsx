// src/app/products/[id]/page.tsx

import { prisma } from '@/lib/prisma';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import BuyButton from './BuyButton';

// Dapatkan ID dari URL params
interface ProductDetailPageProps {
    params: {
        id: string; // [id] dari path route
    };
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
    // Ambil produk dan Store-nya
    const product = await prisma.product.findUnique({
        where: { id: params.id },
        include: { store: true },
    });

    if (!product) {
        notFound(); // Tampilkan halaman 404 jika produk tidak ditemukan
    }

    return (
        <div className="p-8 max-w-5xl mx-auto grid md:grid-cols-2 gap-12">
            {/* Sisi Kiri: Gambar Produk */}
            <div className="relative w-full aspect-square rounded-xl overflow-hidden">
                <Image
                    src={product.imageUrl || '/placeholder.png'}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                />
            </div>

            {/* Sisi Kanan: Detail & Aksi */}
            <div>
                <h1 className="text-4xl font-extrabold mb-2">{product.name}</h1>
                <p className="text-xl text-gray-500 mb-6">dari Toko: {product.store.name}</p>

                <p className="text-5xl font-bold text-red-600 mb-8">
                    Rp{product.price.toLocaleString('id-ID')}
                </p>

                <p className="text-gray-700 whitespace-pre-line mb-10">{product.description}</p>

                {/* Tombol Aksi - Ini akan diintegrasikan di Fase 4 */}
                <BuyButton
                    productId={product.id}
                    productPrice={product.price}
                />
                {/* Anda bisa menambahkan tombol 'Add to Cart' atau detail lain di sini */}
            </div>
        </div>
    );
}