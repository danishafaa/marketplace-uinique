// src/components/Header.tsx (KODE REVISI AKHIR - Biru Dongker & Biru Muda)

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
    // Jika Anda mengalami error pada createSupabaseClient, pastikan path-nya benar
    const supabase = createSupabaseClient();

    // --- EFFECT & HANDLERS ---
    // (Asumsi useEffect dan handleLogout dipertahankan dan tidak ada perubahan)

    // ... (logic useEffect dan handleLogout Anda di sini)

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push('/');
    };

    // Helper untuk menampilkan nama yang aman
    const displayUserName = user?.email?.split('@')[0] || 'Pengguna';

    // Helper untuk cek login sebelum buka drawer/page
    const handleFeatureClick = (feature: 'chat' | 'favorites') => {
        if (!user) {
            router.push('/login');
        } else if (feature === 'chat') {
            setIsChatOpen(true);
        } else if (feature === 'favorites') {
            router.push('/dashboard/favorites');
        }
    };

    return (
        // Header utama hanya sebagai container sticky dan shadow
        <header className="shadow-lg sticky top-0 z-50 text-white">

            {/* ========================================================== */}
            {/* B A R I S A N 1 : TOP HEADER (BIRU DONGKER / Navy) */}
            {/* Menggunakan bg-slate-900 sebagai pengganti bg-primary-dark */}
            {/* ========================================================== */}
            <div className="bg-slate-900">
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
                                // Warna border dan focus disesuaikan agar cocok dengan tema gelap
                                className="w-full p-2 pl-10 border border-gray-600 rounded-lg focus:ring-sky-400 focus:border-sky-400 text-gray-900"
                            />
                            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                        </div>
                    </div>

                    {/* Navigasi User dan Ikon */}
                    <nav className="flex items-center space-x-4 text-sm">

                        {/* Ikon 1: Keranjang (Cart Drawer) */}
                        <button
                            onClick={() => setIsCartOpen(true)}
                            className="text-white hover:text-sky-400 transition p-2 relative"
                            aria-label="Keranjang Belanja"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 12m0 0L3 3M7 13a1 1 0 100 2 1 1 0 000-2zm12 0a1 1 0 100 2 1 1 0 000-2z"></path></svg>
                            <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                                0
                            </span>
                        </button>

                        {/* Ikon 2: Messaging/Chat */}
                        <button
                            onClick={() => handleFeatureClick('chat')}
                            className="text-white hover:text-sky-400 transition p-2 relative"
                            aria-label="Fitur Pesan / Chat"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M12 14h.01M12 21V3M4 12h16"></path></svg>
                        </button>

                        {/* Ikon 3: Favorit/Wishlist */}
                        <button
                            onClick={() => handleFeatureClick('favorites')}
                            className="text-white hover:text-sky-400 transition p-2 relative"
                            aria-label="Wishlist / Favorit"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                        </button>

                        {/* Ikon 4: Pesanan/Order History */}
                        <Link href="/dashboard/orders" className="text-white hover:text-sky-400 transition p-2 relative" aria-label="Pesanan Saya">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path></svg>
                        </Link>

                        {user ? (
                            <>
                                {/* Link Seller Dashboard */}
                                <Link href="/dashboard/seller/products" className="text-white hover:text-sky-400 transition">
                                    Seller Dashboard
                                </Link>

                                {/* Nama Pengguna */}
                                <div className="font-semibold text-white">
                                    Halo, {displayUserName}
                                </div>

                                {/* Logout Button */}
                                <button
                                    onClick={handleLogout}
                                    className="text-sky-400 hover:text-white transition bg-transparent border border-sky-400 py-1 px-3 rounded"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link href="/login" className="text-sky-400 hover:text-white font-medium transition">
                                    Login / Signup
                                </Link>
                            </>
                        )}
                    </nav>
                </div>
            </div>

            {/* ========================================================== */}
            {/* B A R I S A N 2 : SUB HEADER (BIRU MUDA CANTIK) */}
            {/* Menggunakan bg-sky-600 */}
            {/* ========================================================== */}
            <div className="bg-sky-600">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-10 flex items-center space-x-6 text-sm">
                    {/* Navigasi Sekunder */}
                    <Link href="/categories" className="font-bold border border-transparent hover:border-white p-1 transition">
                        Semua Kategori
                    </Link>
                    <Link href="/deals" className="hover:text-white transition">
                        Promo Hari Ini
                    </Link>
                    <Link href="/new-arrivals" className="hover:text-white transition">
                        Produk Populer
                    </Link>
                    {/* Tambahkan link navigasi sekunder lainnya di sini */}
                </div>
            </div>

            {/* 3. INTEGRASI DRAWER UTAMA */}
            <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
            <ChatDrawer isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
        </header>
    );
}