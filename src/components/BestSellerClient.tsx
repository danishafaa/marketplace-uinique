// src/components/BestSellerClient.tsx
'use client';

import { useState, useMemo } from 'react';
import ProductCard from './ProductCard';

interface Product {
    id: string;
    name: string;
    price: number;
    imageUrl: string | null;
    storeName: string;
    category: string;
    isFavorite: boolean;
}

const categories = ["Food", "Drink", "Service", "Stationery"];

export default function BestSellerClient({ initialProducts }: { initialProducts: Product[] }) {
    // Sesuai desain, kita default ke kategori "Drink"
    const [activeCategory, setActiveCategory] = useState("Drink");
    const [search, setSearch] = useState("");

    const filteredProducts = useMemo(() => {
        return initialProducts.filter((p) => {
            const matchCategory = p.category === activeCategory;
            const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
            return matchCategory && matchSearch;
        });
    }, [activeCategory, search, initialProducts]);

    return (
        <div className="space-y-6">
            {/* 1. Header & Search Bar sesuai desain */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-black text-[#002b45] uppercase tracking-tight italic">Best Seller</h1>
                    <p className="text-xs text-gray-400 font-medium">Kumpulan produk favorit pilihan pelanggan.</p>
                </div>

                <div className="relative w-full md:w-80">
                    <input
                        type="text"
                        placeholder="Search best seller..."
                        className="w-full bg-white border-none rounded-full py-3 px-6 pl-12 shadow-sm text-sm focus:ring-2 focus:ring-[#002b45]/20"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <span className="absolute left-5 top-1/2 -translate-y-1/2">🔍</span>
                </div>
            </div>

            {/* 2. Category Tabs sesuai desain */}
            <div className="bg-white p-3 rounded-[30px] shadow-sm flex flex-wrap gap-2">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`px-6 py-2 rounded-full text-xs font-bold transition-all ${activeCategory === cat
                                ? 'bg-[#002b45] text-white shadow-md'
                                : 'bg-gray-50 text-gray-400 hover:bg-gray-100'
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* 3. Product Grid dalam Kotak Putih Bulat */}
            <section className="bg-white rounded-[40px] p-8 md:p-12 shadow-sm border border-gray-50 min-h-[400px]">
                {filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                        {filteredProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                        <p>Produk best seller belum tersedia untuk kategori ini.</p>
                    </div>
                )}
            </section>
        </div>
    );
}