// src/components/SidebarKategori.tsx

import Link from 'next/link';

// Komponen utama
export default function SidebarKategori() {
    const categories = [
        "Fashion Pria", "Fashion Wanita", "Elektronik", "Rumah Tangga",
        "Kesehatan", "Makanan", "Voucher & Tiket"
    ];

    return (
        <div className="bg-secondary p-1 rounded-lg shadow-md border border-gray-200">
            {categories.map((category) => (
                <Link
                    key={category}
                    href={`/category/${category.toLowerCase().replace(/\s/g, '-')}`}
                    className="flex items-center space-x-3 p-3 text-darkgray hover:bg-primary-light hover:text-primary-dark transition duration-150 rounded-lg"
                >
                    <span className="text-lg">🛒</span> {/* Placeholder Icon */}
                    <span className="text-sm font-medium">{category}</span>
                </Link>
            ))}
        </div>
    );
}