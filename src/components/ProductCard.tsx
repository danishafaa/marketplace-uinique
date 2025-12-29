'use client';

import Link from 'next/link';
import Image from 'next/image';
import { addItemToCart } from '@/app/actions/cart';
import FavoriteButton from './FavoriteButton';
import { useCartStore } from '@/store/useCartStore';

interface ProductProps {
    product: {
        id: string | number;
        name: string;
        price: number;
        originalPrice?: number;
        imageUrl?: string | null;
        image?: string;
        storeName?: string;
        isFavorite?: boolean;
        badge?: string;
    }
}

export default function ProductCard({ product }: ProductProps) {
    // 1. TAMBAHKAN INI: Panggil fungsi update dari store yang sudah kamu buat
    const { updateCount } = useCartStore(); 

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
                // 2. TAMBAHKAN INI: Beri tahu Header untuk memperbarui angka
                await updateCount(); 
                
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
            // Tambahkan 'text-black' agar tulisan nama produk terlihat jelas
            className="group block bg-white p-4 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 relative h-full flex flex-col text-black"
        >
            {product.badge === "Best Seller" && (
                <div className="absolute top-0 left-0 bg-[#002b45] text-white text-[10px] font-bold px-3 py-1 rounded-tl-2xl rounded-br-lg z-20">
                    Best Seller
                </div>
            )}

            <div className="relative aspect-square mb-3 overflow-hidden rounded-xl bg-gray-50">
                <Image
                    src={imageSrc}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 16vw"
                    unoptimized={true}
                />

                <div className="absolute top-2 right-2 z-20">
                    <FavoriteButton
                        productId={productId}
                        isFavoriteInitial={product.isFavorite || false}
                    />
                </div>
            </div>

            <div className="px-1 flex-1 flex flex-col items-center text-center">
                <h3 className="text-[13px] font-bold text-gray-900 leading-tight mb-1">
                    {product.name}
                </h3>

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

            <button
                onClick={handleAddToCart}
                className="mt-3 w-full bg-[#002b45] text-white text-[11px] py-2 rounded-full font-bold hover:bg-[#001a2b] active:scale-95 transition-all shadow-sm z-20 relative"
            >
                Add to Cart
            </button>
        </Link>
    );
}