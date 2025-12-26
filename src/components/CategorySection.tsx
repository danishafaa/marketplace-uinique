// src/components/CategorySection.tsx
import React from 'react';
import Image from 'next/image';

const categories = [
    { name: 'Food', icon: '/icons/food.png' },
    { name: 'Drink', icon: '/icons/drink.png' },
    { name: 'Service', icon: '/icons/service.png' },
    { name: 'Stationery', icon: '/icons/stationery.png' },
];

export default function CategorySection() {
    return (
        <div className="py-10 flex flex-col items-center">
            <p className="text-[10px] font-bold text-gray-400 mb-6 uppercase tracking-widest">Browse by Category</p>
            <div className="flex justify-center gap-10 md:gap-16">
                {categories.map((cat) => (
                    <div key={cat.name} className="group flex flex-col items-center cursor-pointer">
                        <div className="w-16 h-16 bg-white shadow-md rounded-2xl flex items-center justify-center border border-gray-100 group-hover:shadow-xl transition-all">
                            <Image src={cat.icon} alt={cat.name} width={32} height={32} />
                        </div>
                        <span className="text-[9px] font-bold mt-3 text-gray-400 uppercase tracking-widest">{cat.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}