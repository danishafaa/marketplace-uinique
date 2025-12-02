// src/components/FavoriteButton.tsx

'use client';

import { useState } from 'react';
import { toggleWishlist } from '@/app/actions/wishlist';

// Props yang dibutuhkan: ID produk dan status awal (apakah sudah favorit atau belum)
interface FavoriteButtonProps {
    productId: string;
    isFavoriteInitial: boolean;
}

export default function FavoriteButton({ productId, isFavoriteInitial }: FavoriteButtonProps) {
    const [isFavorite, setIsFavorite] = useState(isFavoriteInitial);
    const [isLoading, setIsLoading] = useState(false);

    const handleToggle = async () => {
        setIsLoading(true);
        const result = await toggleWishlist(productId);

        if (result.success) {
            setIsFavorite(result.action === 'added');
            alert(result.message);
        } else {
            alert(result.message);
        }
        setIsLoading(false);
    };

    return (
        <button
            onClick={handleToggle}
            disabled={isLoading}
            className={`p-1 rounded-full transition duration-200 ${isFavorite ? 'text-red-500 hover:text-red-600' : 'text-gray-400 hover:text-red-500'
                }`}
            aria-label={isFavorite ? "Hapus dari Favorit" : "Tambah ke Favorit"}
        >
            <svg
                className="w-6 h-6 fill-current"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
            >
                {/* Ikon Hati: Solid jika favorit, Outline jika tidak */}
                <path d={
                    isFavorite
                        ? "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C15.09 3.81 16.76 3 18.5 3 21.58 3 24 5.42 24 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                        : "M16.5 3C14.73 3 13.19 3.7 12 4.9C10.81 3.7 9.27 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5c0-3.08-2.42-5.5-5.5-5.5zm-4.4 15.22L7.5 13.91C4.54 11.13 3 9.4 3 8.5c0-.66.54-1.2 1.2-1.2h0c.53 0 1.04.25 1.36.75L12 18.22l6.44-10.27c.32-.5.83-.75 1.36-.75.66 0 1.2.54 1.2 1.2 0 .9-1.54 2.63-4.4 5.41L12 18.22z"
                } />
            </svg>
        </button>
    );
}