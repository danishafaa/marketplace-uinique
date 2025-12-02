// src/components/Header.tsx (KODE FINAL MODIFIKASI LENGKAP)

'use client';

import { createSupabaseClient } from '@/utils/supabase/client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import CartDrawer from '@/components/CartDrawer';
import ChatDrawer from '@/components/ChatDrawer';

// Interface untuk data pengguna yang dibutuhkan
interface UserProfile {
    email: string;
    isSeller: boolean;
}

export default function Header() {
    const [user, setUser] = useState<UserProfile | null>(null);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isChatOpen, setIsChatOpen] = useState(false);
    const router = useRouter();
    const supabase = createSupabaseClient();

    // ... (useEffect, handleLogout) dipertahankan

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push('/');
    };

    // Helper untuk menampilkan nama yang aman
    const displayUserName = user?.email?.split('@')[0] || 'Pengguna';

    // --- HELPER UNTUK CEK LOGIN SEBELUM BUKA DRAWER/PAGE ---
    const handleFeatureClick = (feature: 'chat' | 'favorites') => {
        if (!user) {
            // Jika belum login, redirect ke halaman login
            router.push('/login');
        } else if (feature === 'chat') {
            // Jika sudah login, buka chat drawer
            setIsChatOpen(true);
        } else if (feature === 'favorites') {
            // Jika sudah login, arahkan ke halaman Favorites (placeholder)
            router.push('/dashboard/favorites');
        }
    };

    return (
        // 1. Kontainer Header: Menggunakan warna primer solid
        <header className="bg-primary-dark shadow-md sticky top-0 z-50 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">

                {/* Logo/Nama Marketplace - UINIQUE */}
                <Link href="/" className="text-3xl font-extrabold text-white">
                    UINIQUE
                </Link>

                {/* Search Bar */}
                <div className="hidden md:block flex-grow max-w-lg mx-8">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Cari produk di UINIQUE..."
                            // Styling Input: Border Primary Light, Text Darkgray
                            className="w-full p-2 pl-10 border border-primary-light rounded-lg focus:ring-tertiary focus:border-tertiary text-darkgray"
                        />
                        {/* Icon Search */}
                        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                    </div>
                </div>

                {/* Navigasi Ikon */}
                <nav className="flex items-center space-x-4 text-sm">

                    {/* Ikon 1-4 (Dipertahankan) */}
                    {/* ... (Semua ikon Chat, Cart, Favorites, Orders) ... */}

                    {user ? (
                        <>
                            {/* Link Seller Dashboard */}
                            <Link href="/dashboard/seller/products" className="text-white hover:text-tertiary transition">
                                Seller Dashboard
                            </Link>

                            {/* Nama Pengguna */}
                            <div className="font-semibold text-white">
                                Halo, {displayUserName}
                            </div>

                            {/* Logout Button */}
                            <button
                                onClick={handleLogout}
                                className="text-tertiary hover:text-white transition bg-transparent border border-tertiary py-1 px-3 rounded"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link href="/login" className="text-tertiary hover:text-white font-medium transition">
                                Login / Signup
                            </Link>
                        </>
                    )}
                </nav>
            </div>

            {/* 3. INTEGRASI DRAWER UTAMA */}
            <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
            <ChatDrawer isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
        </header>
    );
}