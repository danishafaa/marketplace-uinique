// src/components/FavoriteButton.tsx
'use client';

import { useState } from 'react';
import { toggleWishlist } from '@/app/actions/wishlist';
import { Heart } from 'lucide-react'; // Pastikan install lucide-react, atau pakai SVG manual

interface FavoriteButtonProps {
    productId: string;
    isFavoriteInitial: boolean;
}

export default function FavoriteButton({ productId, isFavoriteInitial }: FavoriteButtonProps) {
    const [isFavorite, setIsFavorite] = useState(isFavoriteInitial);
    const [isLoading, setIsLoading] = useState(false);

    const handleToggle = async (e: React.MouseEvent) => {
        // PENTING: Mencegah Link parent bereaksi
        e.preventDefault();
        e.stopPropagation();

        if (isLoading) return;

        // Optimistic UI: Langsung ubah warna dulu biar terasa cepat
        const previousState = isFavorite;
        setIsFavorite(!previousState);
        setIsLoading(true);

        try {
            const result = await toggleWishlist(productId);
            if (!result.success) {
                // Jika gagal, kembalikan ke warna semula & beri pesan
                setIsFavorite(previousState);
                alert(result.message);
            }
        } catch (error) {
            setIsFavorite(previousState);
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <button
            onClick={handleToggle}
            disabled={isLoading}
            className={`p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-sm transition-all hover:scale-110 active:scale-95 ${isFavorite ? 'text-red-500' : 'text-gray-400 hover:text-red-400'
                }`}
            title={isFavorite ? "Hapus dari Favorit" : "Tambah ke Favorit"}
        >
            {/* Menggunakan Lucide Icon biar rapi, atau SVG bawaan */}
            <Heart
                size={20}
                fill={isFavorite ? "currentColor" : "none"}
                strokeWidth={2}
            />
        </button>
    );
}