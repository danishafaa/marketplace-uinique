// src/components/Footer.tsx
import Link from "next/link";
import { Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white pt-16 pb-12 border-t border-gray-100 font-sans text-[#1A1A1A]">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col lg:flex-row justify-between gap-12 lg:gap-24">
          
          {/* SISI KIRI: Customer Service, Contact, Description, Follow Us */}
          <div className="flex-1 space-y-10">
            {/* Customer Service */}
            <div>
              <h3 className="font-bold text-lg mb-4">Customer Service</h3>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li><Link href="/seller/add-product" className="hover:text-black transition">Seller Registration</Link></li>
                <li><Link href="#" className="hover:text-black transition">Help Center</Link></li>
                <li><Link href="#" className="hover:text-black transition">My Vouchers</Link></li>
                <li><Link href="#" className="hover:text-black transition">Discount</Link></li>
              </ul>
            </div>

            {/* Contact Us */}
            <div>
              <h3 className="font-bold text-lg mb-4">Contact Us</h3>
              <div className="text-gray-600 space-y-1 text-sm leading-relaxed">
                <p>Jl. Ir. H. Djuanda No. 95 Ciputat, South Tangerang City 15412</p>
                <p>Tel. +62 821-1157-0074</p>
                <p>Email: rplkelompok4@gmail.com</p>
              </div>
            </div>

            {/* Description */}
            <div className="max-w-md">
              <p className="text-gray-500 text-sm leading-relaxed">
                UINIQUE is a marketplace for UIN Syarif Hidayatullah Jakarta students, 
                presenting creative products and innovative services from our academic 
                community within a single digital platform.
              </p>
            </div>

            {/* Follow Us */}
            <div className="space-y-4">
              <h3 className="font-bold text-lg">Follow Us</h3>
              <div className="flex items-center gap-3 group cursor-default">
                <div className="p-1.5 bg-[#1A1A1A] text-white rounded-lg">
                  <Instagram size={20} />
                </div>
                <span className="font-medium text-sm">Uinique</span>
              </div>
            </div>
          </div>

          {/* SISI KANAN: Categories & Information */}
          <div className="flex gap-16 md:gap-32">
            {/* Categories */}
            <div>
              <h3 className="font-bold text-lg mb-4">Categories</h3>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li><Link href="/food" className="hover:text-black transition">Food</Link></li>
                <li><Link href="/drink" className="hover:text-black transition">Drink</Link></li>
                <li><Link href="/service" className="hover:text-black transition">Service</Link></li>
                <li><Link href="/stationery" className="hover:text-black transition">Stationery</Link></li>
              </ul>
            </div>

            {/* Information */}
            <div>
              <h3 className="font-bold text-lg mb-4">Information</h3>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li><Link href="#" className="hover:text-black transition">About Us</Link></li>
                <li><Link href="#" className="hover:text-black transition">FAQ</Link></li>
                <li><Link href="#" className="hover:text-black transition">Terms & Conditions</Link></li>
                <li><Link href="#" className="hover:text-black transition">Privacy Policy</Link></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Hak Cipta */}
        <div className="mt-24 text-gray-400 text-sm">
          <p>© uinique 2025 - UIN Syarif Hidayatullah Jakarta</p>
        </div>
      </div>
    </footer>
  );
}