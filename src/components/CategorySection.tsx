// src/components/CategorySection.tsx
import React from 'react';
import Link from 'next/link';

const categories = [
    { name: 'Food', icon: '🍲', href: '/category/food' },
    { name: 'Drink', icon: '🥤', href: '/category/drink' },
    { name: 'Service', icon: '⚙️', href: '/category/service' },
    { name: 'Stationery', icon: '✏️', href: '/category/stationery' },
];

export default function CategorySection() {
    return (
        <div className="py-8 flex flex-col items-center">
            <p className="text-sm font-bold text-gray-400 mb-6 uppercase tracking-widest">Browse by Category</p>
            <div className="flex flex-wrap justify-center gap-10">
                {categories.map((cat) => (
                    <Link key={cat.name} href={cat.href} className="group flex flex-col items-center cursor-pointer">
                        <div className="w-16 h-16 bg-white shadow-md rounded-2xl flex items-center justify-center border border-gray-100 group-hover:shadow-xl group-hover:-translate-y-1 transition-all duration-300">
                            <span className="text-3xl">{cat.icon}</span>
                        </div>
                        <span className="text-[11px] font-bold mt-3 text-gray-700 uppercase group-hover:text-[#002b45]">{cat.name}</span>
                    </Link>
                ))}
            </div>
        </div>
    );
}