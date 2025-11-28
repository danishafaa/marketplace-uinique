// src/components/HeroSection.tsx (KODE FINAL MODIFIKASI)

import Link from 'next/link';
import Image from 'next/image';

// Data simulasi untuk kategori (Menggunakan emoji placeholder)
const categories = [
    { name: 'Fashion Pria', icon: '👔', href: '/c/pria' },
    { name: 'Fashion Wanita', icon: '👗', href: '/c/wanita' },
    { name: 'Elektronik', icon: '📱', href: '/c/elektronik' },
    { name: 'Rumah & Dapur', icon: '🏡', href: '/c/rumah' },
    { name: 'Voucher Spesial', icon: '⭐', href: '/c/promo' },
];

export default function HeroSection() {
    return (
        <section className="bg-lightgray py-6"> {/* Background lightgray */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Banner Utama - Menggunakan Warna Primer untuk Overlay */}
                <div className="relative h-64 md:h-80 rounded-xl overflow-hidden shadow-2xl mb-8">
                    <Image
                        src="/images/uinique-banner.jpg" // ⚠️ Pastikan file ini ada
                        alt="UINIQUE Special Offer Banner"
                        fill
                        className="object-cover"
                        priority
                    />

                    {/* Overlay & Text - Menggunakan Warna Primer (Blue Dark) */}
                    <div className="absolute inset-0 bg-primary-dark bg-opacity-70 flex flex-col items-start justify-center p-6 md:p-12">
                        <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight mb-2">
                            TEMPAT BELANJA PRODUK LOKAL NO. 1
                        </h2>
                        <p className="text-white text-lg mb-4">
                            Dapatkan kebutuhan Anda dengan kualitas terbaik.
                        </p>
                        <button className="mt-2 bg-tertiary text-darkgray font-bold py-3 px-6 rounded-lg shadow-md hover:bg-tertiary-dark transition-colors">
                            Belanja Sekarang
                        </button>
                    </div>
                </div>

                {/* Baris Kategori Icon */}
                <div className="flex justify-between items-center bg-secondary p-2 rounded-lg shadow-xl border border-primary-light">
                    {categories.map((category) => (
                        <Link
                            key={category.name}
                            href={category.href}
                            className="flex flex-col items-center space-y-2 p-3 w-1/5 hover:bg-lightgray rounded-lg transition group"
                        >
                            <div className="w-14 h-14 bg-primary-light rounded-lg flex items-center justify-center text-primary-dark shadow-md group-hover:bg-tertiary transition-colors">
                                <span className="text-2xl">{category.icon}</span> {/* Menggunakan Emoji */}
                            </div>
                            <span className="text-xs text-center font-medium text-darkgray group-hover:text-primary-dark">{category.name}</span>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}