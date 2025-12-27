// src/app/favorites/page.tsx

import { getFavoriteProducts } from "@/app/actions/wishlist";
import FavoriteProductCard from "@/components/FavoriteProductCard";
import EmptyFavorite from "@/components/EmptyFavorite";

export const dynamic = 'force-dynamic';

// 1. Kita definisikan "bentuk" data yang diterima dari database
interface FavoriteProduct {
    id: string;
    name: string;
    price: number;
    imageUrl: string | null;
    store: {
        name: string;
    };
}

export default async function FavoritesPage() {
    const rawProducts = await getFavoriteProducts();

    return (
        <div className="bg-[#f2f7fa] min-h-screen pb-20 pt-8 font-sans">
            <div className="max-w-7xl mx-auto px-4">

                <h1 className="text-2xl font-bold mb-6 text-[#1A1A1A]">
                    Favorite Products
                </h1>

                {rawProducts.length === 0 ? (
                    <EmptyFavorite />
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* 2. Kita mapping dengan aman tanpa 'any' */}
                        {rawProducts.map((item) => {
                            // Kita pastikan data sesuai format yang diminta Card
                            const product: FavoriteProduct = {
                                id: item.id,
                                name: item.name,
                                price: item.price,
                                imageUrl: item.imageUrl,
                                store: item.store || { name: 'Unknown Store' } // Jaga-jaga jika store null
                            };

                            return (
                                <FavoriteProductCard key={product.id} product={product} />
                            );
                        })}
                    </div>
                )}

            </div>
        </div>
    );
}