// src/app/products/[id]/page.tsx

import { prisma } from '@/lib/prisma';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import BuyButton from './BuyButton'; // BuyButton dipertahankan

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

    // Format Harga untuk tampilan (DIAMBIL DARI LOGIKA LAMA)
    const formattedPrice = product.price.toLocaleString('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    });

    return (
        // 1. WRAPPER UTAMA DENGAN WARNA BARU
        <div className="bg-lightgray min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

                {/* KONTEN UTAMA DENGAN SHADOW DAN BACKGROUND PUTIH */}
                <div className="bg-white p-8 rounded-xl shadow-2xl grid grid-cols-1 lg:grid-cols-2 gap-12">

                    {/* Sisi Kiri: Gambar Produk Utama */}
                    <div className="relative w-full aspect-square rounded-xl overflow-hidden shadow-lg border border-gray-200 bg-lightgray">
                        <Image
                            src={product.imageUrl || '/placeholder.png'}
                            alt={product.name}
                            fill
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            className="object-cover"
                            priority
                        />
                    </div>

                    {/* Sisi Kanan: Detail Produk & Aksi */}
                    <div className="space-y-6">

                        {/* Header Produk */}
                        <h1 className="text-4xl font-extrabold text-darkgray leading-tight">
                            {product.name}
                        </h1>
                        <p className="text-sm text-gray-500 border-b pb-4">
                            Toko: <span className="font-semibold text-primary-dark">{product.store.name}</span>
                        </p>

                        {/* Harga & Status */}
                        <div className="flex items-baseline space-x-4">
                            <p className="text-5xl font-bold text-red-600">
                                {formattedPrice}
                            </p>
                            <span className="text-sm text-gray-500">(Stok Tersedia)</span>
                        </div>

                        {/* Tombol Pembelian (BuyButton) */}
                        <div className="pt-4 border-t">
                            <BuyButton
                                productId={product.id}
                                productPrice={product.price}
                            />
                        </div>

                        {/* Deskripsi Singkat */}
                        <div className="pt-6 border-t">
                            <h3 className="text-xl font-bold mb-3 text-darkgray">Deskripsi Produk</h3>
                            <p className="text-gray-700 whitespace-pre-line">
                                {product.description}
                            </p>
                        </div>

                        {/* Informasi Pengiriman (Placeholder) */}
                        <div className="p-4 bg-tertiary/20 rounded-lg text-sm text-darkgray font-medium flex items-center space-x-3">
                            <span>🚚</span>
                            <p>Estimasi Pengiriman 3-5 hari kerja. Gratis Ongkir untuk area tertentu.</p>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}