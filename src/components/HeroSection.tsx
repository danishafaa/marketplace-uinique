// src/components/HeroSection.tsx

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
        <section className="bg-lightgray py-6"> {/* lightgray background dari tailwind.config */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Banner Utama (Menggunakan Warna Primer) */}
                <div className="relative h-64 md:h-80 rounded-xl overflow-hidden shadow-2xl mb-8">
                    <Image
                        src="/images/uinique-banner.jpg" // ⚠️ Anda perlu menambahkan gambar banner ini di folder public/images
                        alt="UINIQUE Special Offer Banner"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-primary-dark bg-opacity-70 flex flex-col items-center justify-center p-4">
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

                {/* Baris Kategori Icon */}
                <div className="flex justify-between items-center bg-secondary p-4 rounded-lg shadow-xl border border-primary-light">
                    {categories.map((category) => (
                        <Link key={category.name} href={category.href} className="flex flex-col items-center space-y-2 hover:text-primary-dark transition group w-1/5">
                            <div className="w-14 h-14 bg-primary-light rounded-full flex items-center justify-center text-primary-dark shadow-md group-hover:bg-tertiary transition-colors">
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