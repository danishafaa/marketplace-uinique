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

                    {/* Sisi Kiri: Menu & Logo */}
                    <div className="flex items-center space-x-4">
                        <button className="hover:text-gray-300 transition">
                            <Menu size={32} />
                        </button>
                        <Link href="/" className="flex items-center">
                            {/* Logo UINIQUE sesuai desain */}
                            <span className="text-3xl font-black tracking-tighter">UINI</span>
                            <div className="relative mx-1">
                                <span className="text-3xl font-black">Q</span>
                                {/* Aksen keranjang kecil di bawah Q jika ingin custom, 
                                    atau bisa gunakan logo image jika ada */}
                            </div>
                            <span className="text-3xl font-black tracking-tighter">UE</span>
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
                        <button className="relative hover:text-sky-300 transition">
                            <ShoppingCart size={32} />
                            <span className="absolute -top-1 -right-2 bg-red-600 text-[10px] font-bold px-1.5 rounded-full">
                                0
                            </span>
                        </button>
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
                        <Link href="/products" className="hover:underline transition">
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