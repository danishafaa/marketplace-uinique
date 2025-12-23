// src/app/dashboard/page.tsx
import { prisma } from '@/lib/prisma';
import { createSupabaseServerClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
    const supabase = await createSupabaseServerClient();
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
        redirect('/login');
    }

    try {
        const profile = await prisma.profile.findUnique({
            where: { id: session.user.id },
            include: { store: true }
        });

        if (!profile) {
            return <div className="p-8 text-center text-slate-900">Profil tidak ditemukan di database.</div>;
        }

        const displayUserName = profile.name || session.user.email?.split('@')[0] || 'Pengguna';

        return (
            <div className="max-w-4xl mx-auto p-8">
                <h1 className="text-4xl font-extrabold mb-6 text-slate-900">Halo, {displayUserName}</h1>

                <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-slate-900 mb-8">
                    <h2 className="text-2xl font-bold mb-4 text-slate-900">Pusat Dashboard</h2>
                    <div className="space-y-4">
                        {profile.isSeller ? (
                            <div className="p-4 bg-green-50 rounded-md border border-green-200">
                                <p className="text-green-700 font-bold">✅ Toko Anda: {profile.store?.name}</p>
                                <Link href="/dashboard/seller/products" className="mt-3 inline-block bg-slate-900 text-white py-2 px-4 rounded">
                                    Kelola Produk Jualan
                                </Link>
                            </div>
                        ) : (
                            <div className="p-4 bg-sky-50 rounded-md border border-sky-200">
                                <p className="text-sky-700">Anda belum memiliki toko.</p>
                                <Link href="/dashboard/seller/setup" className="mt-3 inline-block bg-sky-600 text-white py-2 px-4 rounded">
                                    Buka Toko Sekarang
                                </Link>
                            </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                            <Link href="/dashboard/orders" className="p-4 border rounded hover:bg-slate-50 transition">
                                🛍️ Riwayat Pesanan Saya
                            </Link>
                            <Link href="/logout" className="p-4 border border-red-100 rounded text-red-600 hover:bg-red-50 transition">
                                ➡️ Keluar dari Akun
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error("Dashboard Error:", error);
        return <div className="p-8 text-center text-red-500 font-bold">Error 500: Koneksi Database Bermasalah.</div>;
    }
}