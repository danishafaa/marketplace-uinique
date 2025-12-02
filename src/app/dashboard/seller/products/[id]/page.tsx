// src/app/products/[id]/page.tsx

import { prisma } from '@/lib/prisma';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import BuyButton from './BuyButton';
import { addItemToCart } from '@/app/actions/cart'; // Logic Cart
import { startConversation } from '@/app/actions/chat'; // Logic Chat
import { toggleWishlist } from '@/app/actions/wishlist'; // Logic Wishlist
import FavoriteButton from '@/components/FavoriteButton'; // Tombol Favorit

// Dapatkan ID dari URL params
interface ProductDetailPageProps {
    params: {
        id: string; // [id] dari path route
    };
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
    // Ambil produk dan Store-nya, termasuk status Wishlist user saat ini (jika login)
    const product = await prisma.product.findUnique({
        where: { id: params.id },
        include: {
            store: { select: { name: true, profileId: true } },
            // Cek apakah produk ini ada di wishlist user yang login
            wishlistItems: {
                where: { wishlist: { buyer: { id: (await prisma.profile.findFirst({ select: { id: true } }))?.id } } },
                select: { id: true }
            }
        },
    });

    if (!product) {
        notFound();
    }

    // Format Harga untuk tampilan
    const formattedPrice = product.price.toLocaleString('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    });

    // Ambil ID Penjual dan status favorit awal
    const sellerId = product.store.profileId;
    const isFavoriteInitial = product.wishlistItems.length > 0;

    return (
        <div className="bg-lightgray min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

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
                        {/* Tombol Favorit di sudut gambar */}
                        <div className="absolute top-4 right-4 z-10 bg-white rounded-full shadow-lg">
                            <FavoriteButton productId={product.id} isFavoriteInitial={isFavoriteInitial} />
                        </div>
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

                        {/* Tombol Aksi Utama (Buy Now & Add to Cart) */}
                        <div className="pt-4 border-t flex space-x-4">
                            {/* Tombol 1: Buy Now (BuyButton Component) */}
                            <div className="flex-1">
                                <BuyButton
                                    productId={product.id}
                                    productPrice={product.price}
                                />
                            </div>

                            {/* Tombol 2: Tambah ke Keranjang (Server Action) */}
                            <form action={async (formData: FormData) => {
                                'use server';
                                const result = await addItemToCart(product.id, 1);

                                if (result.success) {
                                    alert('Item berhasil ditambahkan ke keranjang!');
                                } else {
                                    alert(result.message || 'Gagal menambahkan item.');
                                }
                            }}>
                                <button
                                    type="submit"
                                    className="bg-tertiary text-darkgray p-4 rounded-lg shadow-md hover:bg-tertiary-dark transition font-bold"
                                >
                                    🛒 Tambah
                                </button>
                            </form>
                        </div>

                        {/* Tombol 3: CHAT DENGAN PENJUAL */}
                        {sellerId && (
                            <form action={async () => {
                                'use server';
                                const result = await startConversation(sellerId);

                                if (result.success) {
                                    alert(`Chat Room ID: ${result.roomId}. Percakapan berhasil dibuat/ditemukan.`);
                                } else {
                                    alert(result.message);
                                }
                            }}>
                                <button
                                    type="submit"
                                    className="w-full mt-4 bg-primary-light text-primary-dark p-3 rounded-lg shadow-sm hover:bg-primary transition font-semibold"
                                >
                                    💬 Chat dengan Penjual
                                </button>
                            </form>
                        )}


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