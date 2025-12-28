// src/components/HomeCategoryButtons.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

// Data kategori sesuai desain
const categories = [
    { name: "FOOD", icon: "/icons/food.png", href: "/food" },
    { name: "DRINK", icon: "/icons/drink.png", href: "/drink" },
    { name: "SERVICE", icon: "/icons/service.png", href: "/service" },
    { name: "STATIONERY", icon: "/icons/stationery.png", href: "/stationery" },
];

export default function HomeCategoryButtons() {
    return (
        <section className="py-10 flex flex-col items-center bg-[#f2f7fa]">
            {/* Judul Section sesuai desain */}
            <h2 className="text-[#8ba2b5] font-bold tracking-[0.2em] text-[11px] mb-10 uppercase">
                Browse by Category
            </h2>

            <div className="flex flex-wrap justify-center gap-6 md:gap-14">
                {categories.map((cat) => (
                    <Link
                        key={cat.name}
                        href={cat.href}
                        className="flex flex-col items-center group cursor-pointer"
                    >
                        {/* Kotak Ikon Putih Bulat */}
                        <div className="w-20 h-20 md:w-24 md:h-24 bg-white rounded-[25px] shadow-sm border border-gray-50 flex items-center justify-center mb-4 group-hover:shadow-md group-hover:-translate-y-1 transition-all duration-300">
                            <div className="relative w-12 h-12">
                                <Image
                                    src={cat.icon}
                                    alt={cat.name}
                                    fill
                                    className="object-contain opacity-80"
                                />
                            </div>
                        </div>

                        {/* Nama Kategori */}
                        <span className="text-[10px] md:text-[12px] font-black text-[#8ba2b5] tracking-widest uppercase">
                            {cat.name}
                        </span>
                    </Link>
                ))}
            </div>
        </section>
    );
}