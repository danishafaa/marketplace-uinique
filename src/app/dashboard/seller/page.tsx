// src/app/dashboard/page.tsx

import { prisma } from '@/lib/prisma';
import { createSupabaseServerClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

async function getUserDashboardData() {
    const supabase = await createSupabaseServerClient();
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
        // Middleware seharusnya menangani ini, tapi kita double-check
        redirect('/login');
    }

    // Ambil Profile dan Store
    const profile = await prisma.profile.findUnique({
        where: { id: session.user.id },
        select: { // Menggunakan SELECT untuk menghindari Prisma Conflict
            name: true,
            email: true,
            isSeller: true,
            store: { select: { name: true, profileId: true } },
        }
    });

    if (!profile) {
        redirect('/login');
    }

    return {
        profile,
        userEmail: session.user.email
    };
}


export default async function DashboardPage() {
    const { profile, userEmail } = await getUserDashboardData();

    const isSeller = profile.isSeller;
    const storeName = profile.store?.name || 'Belum Ada Toko';
    // Menggunakan optional chaining untuk display name yang aman
    const displayUserName = profile.name || userEmail?.split('@')[0] || 'Pengguna';


    return (
        <div className="max-w-4xl mx-auto p-8">
            <h1 className="text-4xl font-extrabold mb-6 text-darkgray">Halo, {displayUserName}</h1>
            <p className="text-gray-600 mb-8">Selamat datang di Pusat Dashboard Anda.</p>

            {/* --- Kartu Status Seller --- */}
            <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-primary-dark mb-8">
                <h2 className="text-2xl font-bold mb-4 text-darkgray">Status Penjual</h2>

                {isSeller ? (
                    <>
                        <p className="text-green-600 font-semibold mb-3">✅ Akun Penjual Aktif</p>
                        <p className="text-gray-700">Toko Anda: {storeName}</p>
                        <Link href="/dashboard/seller/products" className="mt-4 inline-block bg-primary-dark text-white py-2 px-4 rounded hover:bg-primary transition">
                            Kelola Produk
                        </Link>
                    </>
                ) : (
                    <>
                        <p className="text-red-500 font-semibold mb-3">❌ Belum Terdaftar sebagai Penjual</p>
                        <p className="text-gray-700">Tingkatkan akun Anda untuk mulai berjualan!</p>
                        <Link href="/dashboard/seller/setup" className="mt-4 inline-block bg-tertiary text-darkgray py-2 px-4 rounded hover:bg-tertiary-dark transition">
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
                    href="/logout"
                    icon="➡️"
                />
            </div>
        </div>
    );
}

// Komponen Card sederhana (Perlu didefinisikan di sini atau dibuat file terpisah)
function DashboardCard({ title, description, href, icon }: { title: string, description: string, href: string, icon: string }) {
    return (
        <Link href={href} className="block bg-secondary p-5 rounded-lg shadow hover:shadow-xl transition duration-300 border border-gray-200">
            <span className="text-2xl mb-2 block">{icon}</span>
            <h3 className="text-xl font-semibold mb-1 text-darkgray">{title}</h3>
            <p className="text-sm text-gray-600">{description}</p>
        </Link>
    )
}