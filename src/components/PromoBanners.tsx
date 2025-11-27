// src/components/PromoBanners.tsx

import Link from 'next/link';
import Image from 'next/image';

// Data simulasi untuk banner kecil
const promoData = [
    {
        title: "Diskon 50% untuk Fashion!",
        subtitle: "Lihat koleksi terbaru kami.",
        color: "bg-tertiary-dark", // Kuning/Orange Aksen
        href: "/promo/fashion",
        imageSrc: "/images/promo-fashion.jpg" // ⚠️ Tambahkan gambar placeholder
    },
    {
        title: "Gratis Ongkir Sepanjang Hari",
        subtitle: "Minimum pembelian Rp 100.000.",
        color: "bg-primary-dark", // Biru Primer
        href: "/promo/ongkir",
        imageSrc: "/images/promo-ongkir.jpg" // ⚠️ Tambahkan gambar placeholder
    },
    {
        title: "Flash Sale Elektronik",
        subtitle: "Diskon hingga 70% hanya hari ini.",
        color: "bg-red-500", // Merah untuk perhatian
        href: "/promo/flash",
        imageSrc: "/images/promo-flash.jpg" // ⚠️ Tambahkan gambar placeholder
    },
];

export default function PromoBanners() {
    return (
        // Kontainer yang berada di dalam max-w-7xl di page.tsx
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            {promoData.map((promo, index) => (
                <Link
                    key={index}
                    href={promo.href}
                    className={`group relative h-36 rounded-xl overflow-hidden shadow-md transition-shadow duration-300 ${promo.color}`}
                >
                    {/* Gambar Background Promo (Opsional) */}
                    <div className="absolute inset-0">
                        <Image
                            src={promo.imageSrc}
                            alt={promo.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 33vw"
                            className="object-cover opacity-30 group-hover:opacity-40 transition"
                            priority={index === 0}
                        />
                    </div>

                    {/* Teks Konten */}
                    <div className="relative p-4 flex flex-col justify-end h-full">
                        <h3 className="text-xl font-bold text-white group-hover:underline">
                            {promo.title}
                        </h3>
                        <p className="text-sm text-gray-200 mt-1">
                            {promo.subtitle}
                        </p>
                        <span className="mt-2 text-xs font-semibold text-tertiary">
                            Lihat Detail →
                        </span>
                    </div>
                </Link>
            ))}
        </div>
    );
}