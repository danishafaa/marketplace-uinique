// src/app/dashboard/page.tsx

import { prisma } from '@/lib/prisma';
import { createSupabaseServerClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export const dynamic = 'force-dynamic'; // Selalu render dinamis

// Ganti seluruh fungsi getUserDashboardData dengan kode ini
async function getUserDashboardData() {
    const supabase = await createSupabaseServerClient();
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
        redirect('/login');
    }

    // Ambil Profile dan Store (JANGAN gunakan include: { store: true })
    const profile = await prisma.profile.findUnique({
        where: { id: session.user.id },
        select: { // <-- HANYA GUNAKAN SELECT
            name: true,
            email: true,
            isSeller: true,
            // Nested select untuk Store, hanya mengambil nama
            store: { select: { name: true } },
        }
    });

    if (!profile) {
        // Jika ada sesi tapi profile tidak ditemukan
        redirect('/login');
    }

    return {
        profile,
        userEmail: session.user.email // userEmail bisa null jika email belum diverifikasi
    };
}


export default async function DashboardPage() {
    const { profile, userEmail } = await getUserDashboardData();

    const isSeller = profile.isSeller;
    const storeName = profile.store?.name || 'Belum Ada Toko';

    return (
        <div className="max-w-4xl mx-auto p-8">
            <h1 className="text-4xl font-extrabold mb-6">Halo, {profile.name || userEmail?.split('@')[0] || 'Pengguna'}</h1>
            <p className="text-gray-600 mb-8">Selamat datang di Pusat Dashboard Anda.</p>

            {/* --- Kartu Status Seller --- */}
            <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-orange-500 mb-8">
                <h2 className="text-2xl font-bold mb-4">Status Penjual</h2>

                {isSeller ? (
                    <>
                        <p className="text-green-600 font-semibold mb-3">✅ Akun Penjual Aktif</p>
                        <p className="text-gray-700">Toko Anda: {storeName}</p>
                        <Link href="/dashboard/seller/products" className="mt-4 inline-block bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600 transition">
                            Kelola Produk
                        </Link>
                    </>
                ) : (
                    <>
                        <p className="text-red-500 font-semibold mb-3">❌ Belum Terdaftar sebagai Penjual</p>
                        <p className="text-gray-700">Tingkatkan akun Anda untuk mulai berjualan!</p>
                        <Link href="/dashboard/seller/setup" className="mt-4 inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition">
                            Daftar Jadi Penjual Sekarang
                        </Link>
                    </>
                )}
            </div>

            {/* --- Navigasi Pembeli Utama --- */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <DashboardCard
                    title="Daftar Pesanan"
                    description="Lihat semua pesanan yang pernah Anda buat."
                    href="/dashboard/orders"
                    icon="🛍️"
                />
                <DashboardCard
                    title="Pengaturan Akun"
                    description="Ubah profil, email, dan password Anda."
                    href="/dashboard/profile"
                    icon="⚙️"
                />
                <DashboardCard
                    title="Keluar (Logout)"
                    description="Akhiri sesi Anda."
                    href="/logout" // Route ini perlu dibuat, atau gunakan action di Client Component
                    icon="➡️"
                />
            </div>
        </div>
    );
}

// Komponen Card sederhana (Tambahkan di bawah atau buat file terpisah)
function DashboardCard({ title, description, href, icon }: { title: string, description: string, href: string, icon: string }) {
    return (
        <Link href={href} className="block bg-gray-50 p-5 rounded-lg shadow hover:shadow-xl transition duration-300">
            <span className="text-2xl mb-2 block">{icon}</span>
            <h3 className="text-xl font-semibold mb-1">{title}</h3>
            <p className="text-sm text-gray-600">{description}</p>
        </Link>
    )
}