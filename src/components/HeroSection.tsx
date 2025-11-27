// src/components/HeroSection.tsx
import Link from 'next/link';
import Image from 'next/image';

// Data simulasi untuk kategori (Contoh: Mirip Icon Shopee)
const categories = [
    { name: 'Fashion Pria', icon: '/icons/shirt.svg', href: '/c/pria' },
    { name: 'Kopi Lokal', icon: '/icons/coffee.svg', href: '/c/kopi' },
    { name: 'Tas Wanita', icon: '/icons/bag.svg', href: '/c/wanita' },
    { name: 'Peralatan Rumah', icon: '/icons/home.svg', href: '/c/rumah' },
    { name: 'Elektronik', icon: '/icons/tech.svg', href: '/c/tech' },
];

export default function HeroSection() {
    return (
        <section className="bg-white py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Banner Utama (Mirip Hero Shopee) */}
                <div className="relative h-64 md:h-96 rounded-xl overflow-hidden shadow-xl mb-8">
                    <Image
                        src="/images/main-banner.jpg" // ⚠️ Anda perlu menambahkan gambar ini di folder public/images
                        alt="Shopee Pilih Lokal Banner"
                        fill
                        className="object-cover"
                        priority // Agar dimuat lebih cepat
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                        <h2 className="text-3xl md:text-5xl font-extrabold text-white text-center">
                            Tempat Belanja Produk Lokal No. 1
                        </h2>
                    </div>
                </div>

                {/* Baris Kategori Icon */}
                <div className="flex justify-around items-center bg-gray-50 p-4 rounded-lg shadow-inner">
                    {categories.map((category) => (
                        <Link key={category.name} href={category.href} className="flex flex-col items-center space-y-1 hover:text-orange-600 transition">
                            {/* Anda perlu menambahkan icon SVG atau gambar kecil di folder public/icons */}
                            <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-600">
                                {/* Placeholder untuk Icon */}
                                <span className="text-lg">🛍️</span>
                            </div>
                            <span className="text-xs text-center font-medium">{category.name}</span>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}