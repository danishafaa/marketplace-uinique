// src/components/Header.tsx (KODE FINAL MODIFIKASI)

'use client';

import { createSupabaseClient } from '@/utils/supabase/client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import CartDrawer from '@/components/CartDrawer'; // <-- 1. IMPORT CART DRAWER

// Interface untuk data pengguna yang dibutuhkan
interface UserProfile {
    email: string;
    isSeller: boolean;
}

export default function Header() {
    const [user, setUser] = useState<UserProfile | null>(null);
    const [isCartOpen, setIsCartOpen] = useState(false); // <-- 2. STATE UNTUK DRAWER
    const router = useRouter();
    // Inisialisasi Supabase client di luar useEffect/handler
    const supabase = createSupabaseClient();

    useEffect(() => {
        // Fungsi untuk mendapatkan sesi pengguna saat ini
        const getUser = async () => {
            const { data: { session } } = await supabase.auth.getSession();

            if (session) {
                setUser({ email: session.user.email || 'User', isSeller: false });
            } else {
                setUser(null);
            }
        };
        getUser();

        // Listener untuk mendengarkan perubahan sesi (login/logout)
        const { data: authListener } = supabase.auth.onAuthStateChange(
            (event, session) => {
                if (event === 'SIGNED_IN' || event === 'INITIAL_SESSION') {
                    setUser({ email: session?.user.email || 'User', isSeller: false });
                } else if (event === 'SIGNED_OUT') {
                    setUser(null);
                }
            }
        );

        return () => {
            authListener?.subscription.unsubscribe();
        };
    }, []);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push('/');
    };

    return (
        <header className="bg-primary-dark shadow-md sticky top-0 z-50 text-white"> {/* WARNA PRIMER BARU */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">

                {/* Logo/Nama Marketplace - UINIQUE */}
                <Link href="/" className="text-3xl font-extrabold text-white"> {/* TEXT PUTIH */}
                    UINIQUE {/* NAMA BARU */}
                </Link>

                {/* Search Bar (Placeholder) */}
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

                    {/* Ikon Keranjang (Cart Drawer Trigger) */}
                    <button
                        onClick={() => setIsCartOpen(true)} // <-- Tombol untuk membuka drawer
                        className="text-white hover:text-tertiary transition p-2 relative"
                        aria-label="Keranjang Belanja"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 12m0 0L3 3M7 13a1 1 0 100 2 1 1 0 000-2zm12 0a1 1 0 100 2 1 1 0 000-2z"></path></svg>
                        <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                            0 {/* TODO: Ganti dengan jumlah item keranjang */}
                        </span>
                    </button>

                    {user ? (
                        <>
                            <Link href="/dashboard/seller/products" className="text-white hover:text-tertiary transition">
                                Seller Dashboard
                            </Link>
                            <div className="font-semibold text-white">
                                Halo, {user.email?.split('@')[0] || 'Pengguna'}
                            </div>
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

            {/* 3. INTEGRASI DRAWER KERANJANG */}
            <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        </header>
    );
}