// src/components/HeroSectionContent.tsx

import Link from 'next/link';

export default function HeroSectionContent() {
    return (
        // Background warna primer yang lebih terang (primary-light)
        <section className="bg-primary-light/50 p-6 md:p-10 rounded-xl shadow-lg mb-6">
            <div className="grid grid-cols-12 items-center">

                {/* Kolom Kiri: Teks dan Tombol */}
                <div className="col-span-12 md:col-span-7 lg:col-span-6 space-y-4">
                    <p className="text-sm font-semibold text-primary-dark uppercase">45% OFF | NUT COLLECTION</p>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-darkgray leading-tight">
                        TETAP DI RUMAH & KIRIMKAN <span className="text-red-500">KEBUTUHAN HARIANMU</span>
                    </h1>
                    <p className="text-gray-700 max-w-sm">
                        Belanja cepat dan dapatkan kebutuhan Anda dikirim langsung ke rumah Anda.
                    </p>
                    <Link href="/products" className="inline-block bg-red-500 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-red-600 transition duration-300">
                        Shop More
                    </Link>
                </div>

                {/* Kolom Kanan: Visual/Gambar (Placeholder) */}
                <div className="col-span-12 md:col-span-5 lg:col-span-6 mt-6 md:mt-0 relative h-64 hidden md:block">
                    {/* Placeholder visual yang besar (Anda bisa ganti dengan komponen Image jika ada) */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-9xl opacity-20 text-primary-dark">🛒</span>
                        <span className="absolute text-5xl font-extrabold text-primary-dark opacity-70">UINIQUE</span>
                    </div>
                </div>

            </div>
        </section>
    );
}