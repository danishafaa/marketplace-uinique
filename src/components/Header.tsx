// src/components/Header.tsx

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, Search, ShoppingCart, Heart, User } from 'lucide-react';

export default function Header() {
    const [isCartOpen, setIsCartOpen] = useState(false);

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
                            {/* --- GANTI BAGIAN INI DENGAN GAMBAR --- */}
                            <Image
                                src="/logo-uinique.png" // Sesuaikan dengan nama file di folder public
                                alt="UINIQUE Logo"
                                width={180}  // Sesuaikan lebar logo Anda
                                height={50}  // Sesuaikan tinggi logo Anda
                                className="object-contain"
                                priority      // Agar logo dimuat paling awal
                            />
                        </Link>
                    </div>

                    {/* Tengah: Search Bar Bulat */}
                    <div className="flex-grow max-w-2xl relative">
                        <div className="relative flex items-center">
                            <input
                                type="text"
                                placeholder="Search...."
                                className="w-full py-2.5 px-12 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-sky-400"
                            />
                            <Search
                                className="absolute left-4 text-gray-500"
                                size={24}
                            />
                        </div>
                    </div>

                    {/* Sisi Kanan: Icons */}
                    <div className="flex items-center space-x-6">
                        {/* Gunakan Link ke /cart */}
                        <Link href="/cart" className="relative hover:text-sky-300 transition">
                            <ShoppingCart size={32} />
                            {/* Angka badge bisa diambil dari database/state */}
                            <span className="absolute -top-1 -right-2 bg-red-600 text-[10px] font-bold px-1.5 rounded-full">
                                0
                            </span>
                        </Link>
                        <button className="hover:text-sky-300 transition">
                            <Heart size={32} />
                        </button>
                        <Link href="/dashboard" className="hover:text-sky-300 transition">
                            <User size={32} />
                        </Link>
                    </div>
                </div>
            </div>

            {/* --- BARIS KEDUA (SUB-NAVBAR BIRU MUDA) --- */}
            <div className="bg-[#9dc3e6] py-2 px-6">
                <div className="max-w-7xl mx-auto">
                    <nav className="flex items-center space-x-10 text-[#002b45] font-semibold text-sm">
                        <Link href="/all-products" className="hover:text-[#002b45] transition-colors">
                            Product
                        </Link>
                        <Link href="/promo" className="hover:underline transition">
                            Promo
                        </Link>
                        <Link href="/best-seller" className="hover:underline transition">
                            Best seller
                        </Link>
                        <Link href="/discount" className="hover:underline transition">
                            Discount
                        </Link>
                    </nav>
                </div>
            </div>
        </header>
    );
}