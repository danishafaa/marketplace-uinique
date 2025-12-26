// src/components/ProductCard.tsx

'use client';

import Link from 'next/link';
import Image from 'next/image';
import FavoriteButton from './FavoriteButton'; // Tetap pertahankan fitur Wishlist
import { addItemToCart } from '@/app/actions/cart'; // Tetap pertahankan fungsi Cart Server Action

// Interface disesuaikan dengan data dari Database (page.tsx)
interface Product {
    id: string;
    name: string;
    price: number;
    imageUrl: string | null;
    store: {
        name: string;
    };
    isFavorite: boolean;
    createdAt?: Date; // Opsional: untuk logika "NEW" badge
}

export default function ProductCard({ product }: { product: Product }) {

    // Logic 1: Format Harga
    const formattedPrice = product.price.toLocaleString('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    });

    // Logic 2: Handle Add to Cart (Mencegah pindah halaman saat klik tombol)
    const handleAddToCart = async (e: React.MouseEvent) => {
        e.preventDefault(); // Mencegah Link terbuka
        e.stopPropagation(); // Mencegah event bubbling

        try {
            const result = await addItemToCart(product.id, 1);
            if (result.success) {
                alert('Berhasil masuk keranjang!'); // Bisa diganti Toast nanti
            } else {
                alert(result.message);
            }
        } catch (error) {
            console.error(error);
            alert("Terjadi kesalahan.");
        }
    };

    // Logic 3: Tentukan apakah produk "Baru" (Misal: dibuat dalam 7 hari terakhir)
    const isNew = product.createdAt
        ? (new Date().getTime() - new Date(product.createdAt).getTime()) / (1000 * 3600 * 24) < 7
        : false;

    return (
        <Link
            href={`/products/${product.id}`}
            className="group block bg-white p-3 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 relative"
        >
            {/* --- BAGIAN GAMBAR --- */}
            <div className="relative aspect-square mb-3 overflow-hidden rounded-xl bg-gray-50">
                <Image
                    src={product.imageUrl || '/placeholder.png'}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Badge NEW (Visual Baru) */}
                {isNew && (
                    <div className="absolute top-3 left-3 bg-black text-white text-[9px] px-2 py-0.5 font-black z-10 rounded-sm tracking-wider">
                        NEW
                    </div>
                )}

                {/* Tombol Favorit (Logic Lama, Posisi Baru) */}
                <div className="absolute top-2 right-2 z-10">
                    {/* Kita bungkus div agar event klik hati tidak memicu link produk */}
                    <div onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}>
                        <FavoriteButton productId={product.id} isFavoriteInitial={product.isFavorite} />
                    </div>
                </div>
            </div>

            {/* --- BAGIAN TEXT INFO --- */}
            <div className="px-1">
                {/* Nama Produk */}
                <h3 className="text-[13px] font-bold text-gray-900 leading-tight line-clamp-2 min-h-[2.5em]">
                    {product.name}
                </h3>

                {/* Nama Toko */}
                <p className="text-[10px] text-gray-400 mt-1 truncate">
                    {product.store.name}
                </p>

                {/* Harga (Style Baru) */}
                <p className="text-[11px] text-gray-600 mt-1 font-medium">
                    Price: <span className="text-[#002b45] font-bold">{formattedPrice}</span>
                </p>
            </div>

            {/* --- TOMBOL ADD TO CART (Style Baru: Navy Pill) --- */}
            <button
                type="button"
                onClick={handleAddToCart}
                className="mt-3 w-full bg-[#002b45] text-white text-[10px] py-2 rounded-full font-bold hover:bg-[#001a2b] active:scale-95 transition-all shadow-sm"
            >
                Add to Cart
            </button>
        </Link>
    );
}