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
                            className="w-full p-2 pl-10 border border-primary-light rounded-lg focus:ring-tertiary focus:border-tertiary text-darkgray"
                        />
                        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                    </div>
                </div>

                {/* Navigasi User dan Ikon */}
                <nav className="flex items-center space-x-4 text-sm">

                    {/* Ikon 1: Keranjang (Cart Drawer) */}
                    <button
                        onClick={() => setIsCartOpen(true)}
                        className="text-white hover:text-tertiary transition p-2 relative"
                        aria-label="Keranjang Belanja"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 12m0 0L3 3M7 13a1 1 0 100 2 1 1 0 000-2zm12 0a1 1 0 100 2 1 1 0 000-2z"></path></svg>
                        <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                            0
                        </span>
                    </button>

                    {/* Ikon 2: Messaging/Chat (Fix: Panggil helper) */}
                    <button
                        onClick={() => handleFeatureClick('chat')}
                        className="text-white hover:text-tertiary transition p-2 relative"
                        aria-label="Fitur Pesan / Chat"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M12 14h.01M12 21V3M4 12h16"></path></svg>
                    </button>

                    {/* Ikon 3: Favorit/Wishlist (Fix: Panggil helper) */}
                    <button
                        onClick={() => handleFeatureClick('favorites')}
                        className="text-white hover:text-tertiary transition p-2 relative"
                        aria-label="Wishlist / Favorit"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                    </button>

                    {/* Ikon 4: Pesanan/Order History */}
                    <Link href="/dashboard/orders" className="text-white hover:text-tertiary transition p-2 relative" aria-label="Pesanan Saya">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path></svg>
                    </Link>

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