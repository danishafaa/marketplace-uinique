// src/components/Footer.tsx
import Link from "next/link";
import { Instagram } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-white pt-16 pb-8 border-t border-gray-100 font-sans">
            <div className="container mx-auto px-6 max-w-7xl">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 text-[#1A1A1A]">

                    {/* Kolom 1: Customer Service & Contact */}
                    <div className="space-y-8">
                        <div>
                            <h3 className="font-bold text-lg mb-4 text-[#002B45]">Customer Service</h3>
                            <ul className="space-y-2 text-gray-600 text-sm">
                                <li><Link href="/seller/add-product" className="hover:text-[#002B45] transition">Seller Registration</Link></li>
                                <li><Link href="#" className="hover:text-[#002B45] transition">Help Center</Link></li>
                                <li><Link href="/profile" className="hover:text-[#002B45] transition">My Account</Link></li>
                                <li><Link href="/food" className="hover:text-[#002B45] transition">Discount Products</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-bold text-lg mb-4 text-[#002B45]">Contact Us</h3>
                            <div className="text-gray-600 space-y-2 leading-relaxed text-sm italic">
                                <p>Jl. Ir. H. Djuanda No. 95 Ciputat, Kota Tangerang Selatan 15412</p>
                                <p>Tel. +62 821-1157-0074</p>
                                <p>Email: rplkelompok4@gmail.com</p>
                            </div>
                        </div>
                        <div className="text-gray-500 text-sm leading-relaxed pr-4 border-l-2 border-[#002B45] pl-4">
                            <p>
                                <strong>UINIQUE</strong> adalah wadah marketplace bagi mahasiswa UIN Syarif Hidayatullah Jakarta,
                                menghadirkan produk kreatif dan inovatif dalam satu platform digital akademik.
                            </p>
                        </div>
                    </div>

                    {/* Kolom 2: Categories - Link disesuaikan dengan rute kita */}
                    <div>
                        <h3 className="font-bold text-lg mb-4 text-[#002B45]">Categories</h3>
                        <ul className="space-y-3 text-gray-600 text-sm">
                            <li><Link href="/food" className="hover:text-[#002B45] transition flex items-center gap-2"><span>🍔</span> Food</Link></li>
                            <li><Link href="/drink" className="hover:text-[#002B45] transition flex items-center gap-2"><span>🥤</span> Drink</Link></li>
                            <li><Link href="/service" className="hover:text-[#002B45] transition flex items-center gap-2"><span>🛠️</span> Service</Link></li>
                            <li><Link href="/stationery" className="hover:text-[#002B45] transition flex items-center gap-2"><span>✏️</span> Stationery</Link></li>
                        </ul>
                    </div>

                    {/* Kolom 3: Information & Follow Us */}
                    <div className="space-y-8">
                        <div>
                            <h3 className="font-bold text-lg mb-4 text-[#002B45]">Information</h3>
                            <ul className="space-y-2 text-gray-600 text-sm">
                                <li><Link href="#" className="hover:text-[#002B45] transition">About Us</Link></li>
                                <li><Link href="#" className="hover:text-[#002B45] transition">FAQ</Link></li>
                                <li><Link href="#" className="hover:text-[#002B45] transition">Terms & Conditions</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-bold text-lg mb-4 text-[#002B45]">Follow Us</h3>
                            {/* Link Instagram dimatikan sementara sesuai permintaan */}
                            <div className="flex items-center gap-3 text-gray-400 cursor-not-allowed group">
                                <div className="p-2 border border-gray-200 rounded-xl group-hover:border-[#002B45] group-hover:text-[#002B45] transition shadow-sm">
                                    <Instagram size={22} strokeWidth={2} />
                                </div>
                                <span className="font-semibold text-sm">@uinique (Coming Soon)</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Garis Hak Cipta */}
                <div className="mt-20 pt-8 text-center text-gray-400 text-xs border-t border-gray-100 uppercase tracking-widest">
                    <p>© uinique 2025 — UIN Syarif Hidayatullah Jakarta</p>
                </div>
            </div>
        </footer>
    );
}