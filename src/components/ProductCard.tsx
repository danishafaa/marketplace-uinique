// src/components/ProductCard.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { addItemToCart } from '@/app/actions/cart';
import FavoriteButton from './FavoriteButton'; // Pastikan diimport

interface ProductProps {
    product: {
        id: string;
        name: string;
        price: number;
        imageUrl: string | null;
        storeName: string;
        isFavorite: boolean;
    }
}

export default function ProductCard({ product }: ProductProps) {

    // Fungsi Add to Cart
    const handleAddToCart = async (e: React.MouseEvent) => {
        e.preventDefault(); // Cegah pindah halaman
        e.stopPropagation();

        try {
            const result = await addItemToCart(product.id, 1);
            if (result.success) {
                alert('Berhasil masuk keranjang!');
            } else {
                alert(result.message);
            }
        } catch {
            alert("Terjadi kesalahan sistem.");
        }
    };

    return (
        <Link
            href={`/products/${product.id}`}
            className="group block bg-white p-3 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 relative"
        >
            {/* GAMBAR PRODUK */}
            <div className="relative aspect-square mb-3 overflow-hidden rounded-xl bg-gray-50">
                <Image
                    src={product.imageUrl || '/placeholder.png'}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* --- POSISI TOMBOL FAVORIT --- */}
                {/* z-20 agar berada di atas gambar dan bisa diklik */}
                <div className="absolute top-2 right-2 z-20">
                    <FavoriteButton
                        productId={product.id}
                        isFavoriteInitial={product.isFavorite}
                    />
                </div>
            </div>

            {/* INFO PRODUK */}
            <div className="px-1 min-h-[80px]">
                <h3 className="text-[12px] font-bold text-gray-900 leading-tight line-clamp-2 h-[32px]">
                    {product.name}
                </h3>
                <p className="text-[10px] text-gray-400 mt-1 truncate">
                    Toko: {product.storeName}
                </p>
                <p className="text-[11px] text-[#002b45] mt-1 font-bold">
                    Rp {product.price.toLocaleString('id-ID')}
                </p>
            </div>

            {/* TOMBOL ADD TO CART */}
            <button
                onClick={handleAddToCart}
                className="mt-3 w-full bg-[#002b45] text-white text-[10px] py-2 rounded-full font-bold hover:bg-[#001a2b] active:scale-95 transition-all shadow-sm z-20 relative"
            >
                Add to Cart
            </button>
        </Link>
    );
}