// src/components/ProductCard.tsx

import Link from 'next/link';
import Image from 'next/image';

// Definisikan tipe untuk product, diambil dari src/app/page.tsx
interface Product {
    id: string;
    name: string;
    price: number;
    imageUrl: string | null;
    store: {
        name: string;
    };
}

export default function ProductCard({ product }: { product: Product }) {
    // Format harga ke IDR
    const formattedPrice = product.price.toLocaleString('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    });

    return (
        <Link
            href={`/products/${product.id}`}
            className="group block bg-secondary border border-gray-200 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden relative"
        >

            {/* Gambar Produk */}
            <div className="relative w-full h-40 bg-lightgray overflow-hidden">
                <Image
                    src={product.imageUrl || '/placeholder.png'}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {/* Badge / Label Promosi (Opsional) */}
                <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    New
                </span>
            </div>

            {/* Detail Produk */}
            <div className="p-4 space-y-1">
                <p className="text-xs text-gray-500">
                    Toko: {product.store.name}
                </p>
                <h3 className="text-base font-semibold truncate text-darkgray group-hover:text-primary-dark transition-colors">
                    {product.name}
                </h3>

                {/* Harga */}
                <p className="text-xl font-extrabold text-red-600 pt-2">
                    {formattedPrice}
                </p>

                {/* Tombol Beli Cepat (Invisible until hover) */}
                <button
                    type="button"
                    className="w-full mt-3 bg-tertiary text-darkgray font-bold py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    onClick={(e) => {
                        e.preventDefault(); // Mencegah navigasi ke halaman produk
                        e.stopPropagation(); // Mencegah navigasi Link
                        // Tambahkan logika tambah ke keranjang cepat di sini
                        alert(`Tambahkan ${product.name} ke Keranjang!`);
                    }}
                >
                    + Tambah
                </button>
            </div>
        </Link>
    );
}