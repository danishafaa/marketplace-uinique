"use client";
import Link from "next/link";
// Pastikan install lucide-react jika belum: npm install lucide-react
import { Heart } from "lucide-react";

export default function EmptyFavorite() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center bg-white rounded-[40px] shadow-sm border border-gray-50 py-20">

            {/* Ikon Hati Besar */}
            <div className="mb-6 relative">
                <Heart
                    size={100}
                    strokeWidth={1.5}
                    className="text-[#1A1A1A]"
                />
            </div>

            {/* Teks Pesan */}
            <h2 className="text-xl font-bold text-[#1A1A1A] mb-2">
                No favorite products yet
            </h2>
            <p className="text-gray-500 mb-8 max-w-sm text-sm">
                Click the love icon on products to add them here
            </p>

            {/* Tombol Continue Shopping (Warna Navy) */}
            <Link href="/">
                <button className="bg-[#002B45] text-white px-10 py-3 rounded-full font-bold text-sm hover:bg-[#001D2E] transition-all duration-300 shadow-md">
                    Continue Shopping
                </button>
            </Link>
        </div>
    );
}