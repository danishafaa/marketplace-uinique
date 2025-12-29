// src/components/ProductCard.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { addItemToCart } from '@/app/actions/cart';
import FavoriteButton from './FavoriteButton';

// 1. Perbarui Interface agar mendukung data baru (badge & originalPrice)
interface ProductProps {
    product: {
        id: string | number; // Mendukung string (dari DB) atau number (dari data dummy)
        name: string;
        price: number;
        originalPrice?: number; // Tambahan untuk harga coret
        imageUrl?: string | null; // Mendukung imageUrl atau image
        image?: string;
        storeName?: string;
        isFavorite?: boolean;
        badge?: string; // Tambahan untuk badge "Best Seller"
    }
}

export default function ProductCard({ product }: ProductProps) {
    // Penanganan fleksibel untuk gambar dan ID
    const displayImage = product.imageUrl || product.image || '/placeholder.png'; 
    const productId = String(product.id);
    const hasDiscount = product.originalPrice && product.originalPrice > product.price;

const imageSrc = product.imageUrl && product.imageUrl.startsWith('http') 
        ? product.imageUrl 
        : "https://placehold.co/500x500/f2f7fa/002b45?text=No+Image";

    const handleAddToCart = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        try {
            const result = await addItemToCart(productId, 1);
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
            href={`/product/${productId}`}
            className="group block bg-white p-4 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 relative h-full flex flex-col"
        >
            {/* 2. Badge Best Seller di pojok kiri atas sesuai desain */}
            {product.badge === "Best Seller" && (
                <div className="absolute top-0 left-0 bg-[#002b45] text-white text-[10px] font-bold px-3 py-1 rounded-tl-2xl rounded-br-lg z-20">
                    Best Seller
                </div>
            )}

            {/* GAMBAR PRODUK */}
            <div className="relative aspect-square mb-3 overflow-hidden rounded-xl bg-gray-50">
                <Image
                    src={imageSrc}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 16vw"
                    unoptimized={true} // Menghindari Error 400 dari optimasi Next.js
                />

                {/* TOMBOL FAVORIT (Tetap di kanan atas) */}
                <div className="absolute top-2 right-2 z-20">
                    <FavoriteButton
                        productId={productId}
                        isFavoriteInitial={product.isFavorite || false}
                    />
                </div>
            </div>

            {/* INFO PRODUK */}
            <div className="px-1 flex-1 flex flex-col items-center text-center">
                <h3 className="text-[13px] font-bold text-gray-900 leading-tight mb-1">
                    {product.name}
                </h3>

                {/* 3. Harga Diskon & Harga Coret sesuai desain */}
                <div className="mt-auto">
                    {hasDiscount && (
                        <p className="text-[10px] text-gray-400 line-through">
                            Rp {product.originalPrice?.toLocaleString('id-ID')}
                        </p>
                    )}
                    <p className={`text-[12px] font-bold ${hasDiscount ? 'text-red-600' : 'text-[#002b45]'}`}>
                        {hasDiscount ? "" : "Price: "}Rp {product.price.toLocaleString('id-ID')}
                    </p>
                </div>
            </div>

            {/* TOMBOL ADD TO CART (Tetap dipertahankan) */}
            <button
                onClick={handleAddToCart}
                className="mt-3 w-full bg-[#002b45] text-white text-[11px] py-2 rounded-full font-bold hover:bg-[#001a2b] active:scale-95 transition-all shadow-sm z-20 relative"
            >
                Add to Cart
            </button>
        </Link>
    );
}