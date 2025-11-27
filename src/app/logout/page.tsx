// src/app/logout/page.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createSupabaseClient } from '@/utils/supabase/client';

export default function LogoutPage() {
    const router = useRouter();
    const supabase = createSupabaseClient();

    useEffect(() => {
        // Fungsi untuk sign out
        const handleLogout = async () => {
            // Hapus sesi di Supabase
            await supabase.auth.signOut();

            // Redirect kembali ke halaman utama setelah sign out
            router.push('/');
        };

        handleLogout();
    }, [router, supabase]); // Dependency array memastikan fungsi berjalan sekali

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-8">
            <h1 className="text-2xl font-bold text-gray-700 mb-4">Logging out...</h1>
            <p className="text-gray-500">Mohon tunggu sebentar, sesi Anda sedang diakhiri.</p>
        </div>
    );
}