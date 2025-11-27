// src/components/Header.tsx

'use client';

import { createSupabaseClient } from '@/utils/supabase/client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

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
        // Fungsi untuk mendapatkan sesi pengguna saat ini
        const getUser = async () => {
            const { data: { session } } = await supabase.auth.getSession();

            if (session) {
                setUser({ email: session.user.email || 'User', isSeller: false }); // Sederhana
                // TODO: Anda bisa fetch data isSeller dari tabel Profile di sini
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
        router.push('/'); // Redirect ke homepage setelah logout
    };

    return (
        <header className="bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">

                {/* Logo/Nama Marketplace */}
                <Link href="/" className="text-2xl font-extrabold text-orange-600">
                    My Marketplace
                </Link>

                {/* Search Bar (Placeholder) */}
                <div className="hidden md:block flex-grow max-w-lg mx-8">
                    <input
                        type="text"
                        placeholder="Cari produk di sini..."
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500"
                    />
                </div>

                {/* Navigasi User */}
                <nav className="flex items-center space-x-4 text-sm">
                    {user ? (
                        <>
                            <Link href="/dashboard/seller/products" className="text-gray-600 hover:text-orange-600">
                                Seller Dashboard
                            </Link>
                            <div className="font-semibold text-gray-800">
                                Halo, {user.email.split('@')[0]}
                            </div>
                            <button
                                onClick={handleLogout}
                                className="text-red-500 hover:text-red-700 transition"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link href="/login" className="text-orange-600 hover:text-orange-700 font-medium">
                                Login / Signup
                            </Link>
                        </>
                    )}
                </nav>
            </div>
        </header>
    );
}