// src/components/Header.tsx
// src/components/Header.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Menu, Search, ShoppingCart, Heart, User } from 'lucide-react';
// Tambahkan import tipe data dari supabase-js di bawah ini:
import { createSupabaseClient as createClient } from '@/utils/supabase/client';
import { AuthChangeEvent, Session, User as SupabaseUser } from '@supabase/supabase-js';
import { useCartStore } from '@/store/useCartStore'
export default function Header() {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState("");
    const [user, setUser] = useState<SupabaseUser | null>(null);

    // --- B. AMBIL DATA DARI ZUSTAND ---
    // 'count' adalah angka keranjang, 'updateCount' adalah fungsi untuk refresh angka tersebut
    const { count, updateCount, setCount } = useCartStore();

    useEffect(() => {
        const supabase = createClient();

        // Ambil data user saat pertama kali load
        const checkUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);
        // --- C. AMBIL JUMLAH KERANJANG SAAT PERTAMA LOAD ---
            if (user) {
                await updateCount(); // Panggil fungsi sakti dari store
            }
        };
        checkUser();

        // Pantau perubahan status login/logout secara realtime
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
        async (_event: AuthChangeEvent, session: Session | null) => {
            // Deklarasikan currentUser agar tidak 'Cannot find name'
            const currentUser = session?.user ?? null; 
            setUser(currentUser);

            if (currentUser) {
                // Sekarang 'await' diperbolehkan karena sudah ada 'async' di atas
                await updateCount(); 
            } else {
                setCount(0); 
            }
        }
    );

    return () => subscription.unsubscribe();
}, [updateCount, setCount]);

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
            // bg-white agar solid putih, text-gray-800 agar teks terbaca
                    className="w-full py-2.5 px-12 rounded-full bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-400"
                    />
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
    {/* Pastikan ini 'count' bukan angka '0' manual */}
    {count > 0 && (
        <span className="absolute -top-1 -right-2 bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
            {count}
        </span>
    )}
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
                        {user ? (
                            // Jika SUDAH login, arahkan ke /profile
                            <Link href="/profile" className="hover:text-sky-300 transition p-1" title="Profil Saya">
                                <User size={32} className="text-sky-400" />
                            </Link>
                        ) : (
                            // Jika BELUM login, arahkan ke /login
                            <Link href="/login" className="hover:text-sky-300 transition p-1" title="Masuk">
                                <User size={32} />
                            </Link>
                        )}
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