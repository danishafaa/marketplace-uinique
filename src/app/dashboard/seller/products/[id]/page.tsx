// src/app/products/[id]/page.tsx

import { prisma } from '@/lib/prisma';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import BuyButton from './BuyButton';
import { addItemToCart } from '@/app/actions/cart'; // Logic Cart
import { startConversation } from '@/app/actions/chat'; // Logic Chat
import FavoriteButton from '@/components/FavoriteButton'; // Tombol Favorit
import { Star, ShoppingCart, MessageCircle, Truck, ShieldCheck } from 'lucide-react';

interface ProductDetailPageProps {
    params: {
        id: string;
    };
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
    // Ambil produk dan data terkait
    const product = await prisma.product.findUnique({
        where: { id: params.id },
        include: {
            store: { select: { name: true, profileId: true } },
            wishlistItems: {
                // Logika pencarian profileId sebaiknya disesuaikan dengan sistem auth Anda (misal: session)
                // Di sini saya mempertahankan logika asli Anda
                where: { wishlist: { buyer: { id: (await prisma.profile.findFirst({ select: { id: true } }))?.id } } },
                select: { id: true }
            }
        },
    });

    if (!product) {
        notFound();
    }

    const formattedPrice = product.price.toLocaleString('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    });

    const sellerId = product.store.profileId;
    const isFavoriteInitial = product.wishlistItems.length > 0;

    return (
        <div className="bg-gray-50 min-h-screen pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                {/* Breadcrumb sederhana */}
                <nav className="flex text-sm text-gray-500 mb-6 italic">
                    <span>Produk</span> <span className="mx-2">/</span>
                    <span>{product.store.name}</span> <span className="mx-2">/</span>
                    <span className="text-gray-900 font-medium truncate">{product.name}</span>
                </nav>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-2">

                        {/* Sisi Kiri: Galeri Gambar */}
                        <div className="p-6 bg-white">
                            <div className="relative aspect-square rounded-xl overflow-hidden group border border-gray-100 shadow-inner">
                                <Image
                                    src={product.imageUrl || '/placeholder.png'}
                                    alt={product.name}
                                    fill
                                    sizes="(max-width: 1024px) 100vw, 50vw"
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                    priority
                                />
                                {/* Tombol Favorit */}
                                <div className="absolute top-4 right-4 z-10">
                                    <div className="bg-white/90 backdrop-blur-sm p-1 rounded-full shadow-md hover:bg-white transition-colors">
                                        <FavoriteButton productId={product.id} isFavoriteInitial={isFavoriteInitial} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Sisi Kanan: Detail & Aksi */}
                        <div className="p-8 lg:border-l border-gray-50 flex flex-col justify-between">
                            <div className="space-y-6">
                                <div>
                                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight leading-tight">
                                        {product.name}
                                    </h1>
                                    <div className="flex items-center mt-3 space-x-4">
                                        <div className="flex items-center text-yellow-400">
                                            {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                                            <span className="ml-2 text-sm text-gray-500 font-medium">(4.8/5.0)</span>
                                        </div>
                                        <span className="text-gray-300">|</span>
                                        <span className="text-sm text-blue-600 font-semibold cursor-pointer hover:underline">
                                            Toko: {product.store.name}
                                        </span>
                                    </div>
                                </div>

                                <div className="bg-blue-50/50 p-5 rounded-xl border border-blue-100">
                                    <p className="text-4xl font-black text-blue-700">
                                        {formattedPrice}
                                    </p>
                                    <p className="text-sm text-blue-600 font-medium mt-1 italic">
                                        Stok tersedia dan siap kirim
                                    </p>
                                </div>

                                {/* Deskripsi */}
                                <div className="space-y-2">
                                    <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Deskripsi Produk</h3>
                                    <p className="text-gray-600 leading-relaxed text-sm whitespace-pre-line">
                                        {product.description || "Tidak ada deskripsi produk."}
                                    </p>
                                </div>

                                {/* Fitur Tambahan */}
                                <div className="grid grid-cols-2 gap-4 py-4">
                                    <div className="flex items-start space-x-3 text-sm text-gray-600">
                                        <Truck size={20} className="text-blue-500 shrink-0" />
                                        <span>Gratis Ongkir min. blj Rp50rb</span>
                                    </div>
                                    <div className="flex items-start space-x-3 text-sm text-gray-600">
                                        <ShieldCheck size={20} className="text-green-500 shrink-0" />
                                        <span>Garansi produk original 100%</span>
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="mt-8 space-y-4">
                                <div className="flex flex-col sm:flex-row gap-3">
                                    <div className="flex-[2]">
                                        <BuyButton
                                            productId={product.id}
                                            productPrice={product.price}
                                        />
                                    </div>

                                    <form className="flex-1" action={async (formData: FormData) => {
                                        'use server';
                                        const result = await addItemToCart(product.id, 1);
                                        // Catatan: Gunakan library toast (seperti react-hot-toast) untuk alert yang lebih baik
                                    }}>
                                        <button
                                            type="submit"
                                            className="w-full flex items-center justify-center gap-2 bg-white border-2 border-blue-600 text-blue-600 p-3.5 rounded-xl font-bold hover:bg-blue-50 transition-all shadow-sm"
                                        >
                                            <ShoppingCart size={20} />
                                            + Keranjang
                                        </button>
                                    </form>
                                </div>

                                {sellerId && (
                                    <form action={async () => {
                                        'use server';
                                        await startConversation(sellerId);
                                    }}>
                                        <button
                                            type="submit"
                                            className="w-full flex items-center justify-center gap-2 text-gray-600 hover:text-blue-600 transition-colors font-medium text-sm py-2"
                                        >
                                            <MessageCircle size={18} />
                                            Tanya Penjual tentang produk ini
                                        </button>
                                    </form>
                                )}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}