// src/components/HeroSection.tsx (Kode Final yang Diperbaiki)

import Link from 'next/link';
import Image from 'next/image';

// Data simulasi untuk kategori (sesuai referensi icon)
const categories = [
    { name: 'Fashion Pria', icon: '👔', href: '/c/pria' },
    { name: 'Fashion Wanita', icon: '👗', href: '/c/wanita' },
    { name: 'Elektronik', icon: '📱', href: '/c/elektronik' },
    { name: 'Rumah & Dapur', icon: '🏡', href: '/c/rumah' },
    { name: 'Voucher Spesial', icon: '⭐', href: '/c/promo' },
];

export default function HeroSection() {
    return (
        <section className="bg-lightgray py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* AREA UTAMA: Banner dan Text */}
                <div className="relative h-64 md:h-80 rounded-xl overflow-hidden shadow-2xl mb-8">

                    {/* Gambar Banner (Jika ada, akan tampil; jika tidak, warna fallback akan terlihat) */}
                    <Image
                        src="/images/uinique-banner.png"
                        alt="UINIQUE Special Offer Banner"
                        fill
                        className="object-cover"
                        priority
                    // Tambahkan styling fallback agar container utama tetap terlihat
                    />

                    {/* OVERLAY & TEXT (Pastikan background warna primer selalu ada) */}
                    <div className="absolute inset-0 bg-primary-dark bg-opacity-90 flex flex-col items-center justify-center p-4">
                        <h2 className="text-3xl md:text-5xl font-extrabold text-white text-center tracking-tight">
                            TEMUKAN BARANG KEBUTUHAN HARIANMU
                        </h2>
                        <p className="text-white mt-2 text-lg">
                            Nikmati barang lokal dengan kualitas terbaik.
                        </p>
                        <button className="mt-4 bg-tertiary text-darkgray font-bold py-2 px-6 rounded-full shadow-lg hover:bg-tertiary-dark transition-colors">
                            Belanja Sekarang
                        </button>
                    </div>
                </div>

                {/* AREA KATEGORI IKON */}
                <div className="flex justify-between items-center bg-secondary p-2 rounded-lg shadow-xl border border-primary-light">
                    {categories.map((category) => (
                        // Card Kategori: Menggunakan warna primer
                        <Link key={category.name} href={category.href} className="flex flex-col items-center space-y-2 p-3 w-1/5 hover:bg-lightgray rounded-lg transition group">
                            <div className="w-14 h-14 bg-primary-dark rounded-lg flex items-center justify-center text-white shadow-lg group-hover:bg-primary transition-colors">
                                <span className="text-2xl">{category.icon}</span>
                            </div>
                            <span className="text-xs text-center font-medium text-darkgray group-hover:text-primary-dark">{category.name}</span>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}