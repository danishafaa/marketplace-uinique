// src/components/Header.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation'; // Untuk fungsi search
import { Menu, Search, ShoppingCart, Heart, User } from 'lucide-react';

export default function Header() {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState("");

    // --- LOGIKA PENCARIAN ---
    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault(); // Mencegah reload halaman
        if (searchQuery.trim()) {
            // Arahkan ke halaman All Products dengan kata kunci
            router.push(`/all-products?search=${encodeURIComponent(searchQuery)}`);
        }
    };

    return (
        <header className="sticky top-0 z-50 shadow-md">
            {/* --- BARIS UTAMA (NAVY GELAP) --- */}
            <div className="bg-[#002b45] text-white px-4 py-3">
                <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">

                    {/* Sisi Kiri: Menu & Logo Gambar */}
                    <div className="flex items-center space-x-4">
                        <button className="hover:text-gray-300 transition">
                            <Menu size={32} />
                        </button>

                        <Link href="/" className="flex items-center">
                            <Image
                                src="/logo-uinique.png" // Pastikan file ini ada di public/
                                alt="UINIQUE Logo"
                                width={140}
                                height={40}
                                className="object-contain"
                                priority
                            />
                        </Link>
                    </div>

                    {/* Tengah: Search Bar Bulat (SEKARANG BERFUNGSI) */}
                    <form onSubmit={handleSearch} className="flex-grow max-w-2xl relative hidden md:block">
                        <div className="relative flex items-center">
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full py-2.5 px-12 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-sky-400"
                            />
                            {/* Tombol Search Icon bisa diklik */}
                            <button type="submit" className="absolute left-4 text-gray-500 hover:text-[#002b45]">
                                <Search size={24} />
                            </button>
                        </div>
                    </form>

                    {/* Sisi Kanan: Icons */}
                    <div className="flex items-center space-x-6">

                        {/* 1. Cart Icon */}
                        <Link href="/cart" className="relative hover:text-sky-300 transition p-1" title="Keranjang">
                            <ShoppingCart size={32} />
                            {/* Badge Merah (Statis dulu) */}
                            <span className="absolute -top-1 -right-2 bg-red-600 text-[10px] font-bold px-1.5 rounded-full">
                                0
                            </span>
                        </Link>

                        {/* 2. Favorite Icon (INI YANG DIPERBAIKI) */}
                        <Link
                            href="/favorites"
                            className="hover:text-pink-400 transition p-1 cursor-pointer"
                            title="Favorit Saya"
                        >
                            <Heart size={32} />
                        </Link>

                        {/* 3. User Icon */}
                        <Link href="/login" className="hover:text-sky-300 transition p-1" title="Akun Saya">
                            <User size={32} />
                        </Link>
                    </div>
                </div>
            </div>

            {/* --- BARIS KEDUA (SUB-NAVBAR BIRU MUDA) --- */}
            <div className="bg-[#9dc3e6] py-2 px-6">
                <div className="max-w-7xl mx-auto">
                    <nav className="flex items-center space-x-10 text-[#002b45] font-semibold text-sm">
                        <Link href="/all-products" className="hover:text-white transition-colors">
                            Product
                        </Link>
                        <Link href="/promo" className="hover:text-white transition">
                            Promo
                        </Link>
                        <Link href="/best-seller" className="hover:text-white transition">
                            Best Seller
                        </Link>
                        <Link href="/discount" className="hover:text-white transition">
                            Discount
                        </Link>
                    </nav>
                </div>
            </div>
        </header>
    );
}