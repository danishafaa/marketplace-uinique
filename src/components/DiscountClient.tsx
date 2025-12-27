// src/components/DiscountClient.tsx
'use client';

import { useState, useMemo } from 'react';
import ProductCard from './ProductCard';

interface Product {
    id: string;
    name: string;
    price: number;
    discountPrice?: number | null;
    imageUrl: string | null;
    storeName: string;
    category: string;
    isFavorite: boolean;
}

const categories = ["All Product", "Food", "Drink", "Service", "Stationery"];

export default function DiscountClient({ initialProducts }: { initialProducts: Product[] }) {
    const [activeCategory, setActiveCategory] = useState("All Product");
    const [search, setSearch] = useState("");

    const filteredProducts = useMemo(() => {
        return initialProducts.filter((p) => {
            const matchCategory = activeCategory === "All Product" || p.category === activeCategory;
            const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
            return matchCategory && matchSearch;
        });
    }, [activeCategory, search, initialProducts]);

    return (
        <div className="space-y-6">
            {/* Header & Search sesuai desain Discount.jpg */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-black text-[#002b45] uppercase tracking-tight italic">Discount</h1>
                    <p className="text-xs text-gray-400 font-medium">Temukan penawaran terbaik dengan harga spesial.</p>
                </div>

                <div className="relative w-full md:w-80">
                    <input
                        type="text"
                        placeholder="Search discount..."
                        className="w-full bg-white border-none rounded-full py-3 px-6 pl-12 shadow-sm text-sm focus:ring-2 focus:ring-[#002b45]/20"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
                </div>
            </div>

            {/* Tabs Kategori sesuai desain Discount.jpg */}
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

            {/* Grid Produk dalam Kotak Putih Bulat sesuai desain Discount.jpg */}
            <section className="bg-white rounded-[40px] p-8 md:p-12 shadow-sm border border-gray-50 min-h-[400px]">
                {filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                        {filteredProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                ) : (
                    <p className="text-center py-20 text-gray-400">Belum ada produk diskon untuk kategori ini.</p>
                )}
            </section>
        </div>
    );
}