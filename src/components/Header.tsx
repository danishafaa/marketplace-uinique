// src/components/Header.tsx (MODIFIKASI)

'use client';

import { createSupabaseClient } from '@/utils/supabase/client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image'; // Import Image komponen jika akan pakai logo

// Interface untuk data pengguna yang dibutuhkan
interface UserProfile {
    email: string;
    isSeller: boolean;
}

export default function Header() {
    const [user, setUser] = useState<UserProfile | null>(null);
    const router = useRouter();
    const supabase = createSupabaseClient();

    useEffect(() => {
        const getUser = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (session) {
                setUser({ email: session.user.email || 'User', isSeller: false });
            } else {
                setUser(null);
            }
        };
        getUser();

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
        <header className="bg-primary-dark shadow-md sticky top-0 z-50 text-white"> {/* Warna header jadi lebih gelap */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">

                {/* Logo/Nama Marketplace - UINIQUE */}
                <Link href="/" className="text-3xl font-extrabold text-white"> {/* Warna teks putih */}
                    UINIQUE {/* NAMA BARU */}
                </Link>

                {/* Search Bar */}
                <div className="hidden md:block flex-grow max-w-lg mx-8">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Cari produk di UINIQUE..."
                            className="w-full p-2 pl-10 border border-primary-light rounded-lg focus:ring-tertiary focus:border-tertiary text-darkgray" // Gunakan warna baru
                        />
                        {/* Icon Search (Anda bisa pakai SVG) */}
                        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                    </div>
                </div>

                {/* Navigasi User */}
                <nav className="flex items-center space-x-4 text-sm">
                    {user ? (
                        <>
                            <Link href="/dashboard/seller/products" className="text-white hover:text-tertiary transition"> {/* Warna teks putih */}
                                Seller Dashboard
                            </Link>
                            <div className="font-semibold text-white"> {/* Warna teks putih */}
                                Halo, {user.email?.split('@')[0] || 'Pengguna'}
                            </div>
                            <button
                                onClick={handleLogout}
                                className="text-tertiary hover:text-white transition bg-transparent border border-tertiary py-1 px-3 rounded" // Tombol logout
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link href="/login" className="text-tertiary hover:text-white font-medium transition"> {/* Warna teks tersier */}
                                Login / Signup
                            </Link>
                        </>
                    )}
                </nav>
            </div>
        </header>
    );
}