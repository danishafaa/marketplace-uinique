"use client";

import { MessageCircle, Plus, Minus, ChevronLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { getCheckoutItems, updateCartQuantity } from "@/app/actions/cart";

export default function CheckoutPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // 1. Ambil data produk yang dicentang dari database
  useEffect(() => {
    async function loadData() {
      const checkoutData = await getCheckoutItems();
      setItems(checkoutData);
      setLoading(false);
    }
    loadData();
  }, []);

  // 2. Kalkulasi Total Biaya
  const subTotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const totalDiscount = 3000; // Contoh diskon statis sesuai desain
  const totalBill = subTotal - totalDiscount;

  // 3. Fungsi WhatsApp Otomatis
  const contactSeller = (phone: string, productName: string) => {
    const message = `Halo, saya ingin memesan produk: ${productName}. Apakah stok masih tersedia?`;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, "_blank");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F0F2F5]">
        <Loader2 className="animate-spin text-[#002B45]" size={48} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F0F2F5] pb-20 font-sans text-black">
      <div className="container mx-auto max-w-6xl px-4 py-10">
        
        {/* Header Section */}
        <div className="flex items-center gap-4 mb-10">
          <Link href="/cart" className="p-3 bg-white rounded-full shadow-sm hover:bg-gray-50 transition">
            <ChevronLeft size={24} />
          </Link>
          <h1 className="text-4xl font-extrabold tracking-tight">Order Summary</h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-10 items-start">
          
          {/* SISI KIRI: ALAMAT & DAFTAR PRODUK */}
          <div className="flex-grow space-y-8 w-full">
            
            {/* Kartu Alamat Pengiriman */}
            <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-gray-50">
              <div className="flex items-center gap-3 mb-4">
                <h2 className="text-2xl font-black">Haihello123</h2>
                <span className="text-gray-400 font-bold text-xl">(+62)82*****74</span>
              </div>
              <p className="text-gray-500 text-lg leading-relaxed font-semibold">
                Gang Sawo, No. 3A, Pisangan Subdistrict, East Ciputat District, <br />
                South Tangerang, Banten 15412
              </p>
            </div>

            {/* List Produk Dicentang */}
            {items.length === 0 ? (
              <div className="bg-white rounded-3xl p-10 text-center font-bold text-gray-400">
                No items selected for checkout.
              </div>
            ) : (
              items.map((item) => (
                <div key={item.id} className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-gray-50 space-y-8">
                  <h3 className="font-black text-sm text-gray-800 uppercase tracking-[0.3em]">
                    {item.product?.store?.name || "STORE NAME"}
                  </h3>
                  
                  <div className="flex flex-col md:flex-row gap-8">
                    {/* Gambar Produk */}
                    <div className="w-36 h-36 bg-gray-50 rounded-3xl overflow-hidden border border-gray-100 shrink-0">
                      <img 
                        src={item.product?.imageUrl || "/placeholder.png"} 
                        alt={item.product?.name} 
                        className="w-full h-full object-cover" 
                      />
                    </div>

                    {/* Detail Produk & Tombol WA */}
                    <div className="flex-grow flex flex-col justify-between">
                      <div>
                        <h4 className="text-xl font-extrabold text-gray-800 leading-tight mb-2">
                          {item.product?.name}
                        </h4>
                        <p className="text-sm text-gray-400 line-through font-bold">
                          Rp {(item.product?.originalPrice || item.price + 1000).toLocaleString('id-ID')}
                        </p>
                        
                        <div className="flex justify-between items-center mt-2">
                          <p className="text-[#FF3B30] font-black text-3xl">
                            Rp {item.price.toLocaleString('id-ID')}
                          </p>
                          
                          {/* Quantity Control */}
                          <div className="flex items-center border-2 border-gray-100 rounded-2xl overflow-hidden scale-110">
                            <button className="px-3 py-1 text-gray-300"><Plus size={14}/></button>
                            <span className="px-4 py-1 font-black text-lg border-x-2 border-gray-100">{item.quantity}</span>
                            <button className="px-3 py-1 text-gray-300"><Minus size={14}/></button>
                          </div>
                        </div>
                      </div>

                      {/* Green WhatsApp Button */}
                      <button 
                        onClick={() => contactSeller(item.product?.storePhone || "6282111570074", item.product?.name)}
                        className="mt-8 w-full md:w-fit bg-[#34C759] text-white px-10 py-4 rounded-[1.5rem] font-black text-lg flex items-center justify-center gap-3 hover:bg-green-600 transition shadow-lg shadow-green-100"
                      >
                        <MessageCircle size={26} fill="white" />
                        Contact the store via WA
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* SISI KANAN: RINGKASAN TAGIHAN */}
          <div className="w-full lg:w-[480px] space-y-8 lg:sticky lg:top-10">
            
            {/* Voucher Section */}
            <div className="bg-white rounded-[1.5rem] p-5 shadow-sm border border-gray-50 flex gap-4">
              <input 
                type="text" 
                placeholder="Enter Voucher Code" 
                className="flex-grow bg-[#F8F9FA] rounded-2xl px-6 py-4 text-lg font-bold focus:outline-none border-2 border-transparent focus:border-[#002B45] transition" 
              />
              <button className="bg-[#002B45] text-white px-10 py-4 rounded-2xl font-black text-xl hover:opacity-90 transition">
                Apply
              </button>
            </div>

            {/* Payment & Billing Details */}
            <div className="bg-white rounded-[3rem] p-10 shadow-sm border border-gray-50 space-y-10">
              <div>
                <h3 className="font-black text-2xl mb-3">Payment Method</h3>
                <p className="text-gray-700 font-bold text-2xl">COD-Pay on the spot</p>
              </div>

              <div className="space-y-6 pt-6">
                <div className="flex justify-between items-center text-2xl text-gray-500 font-bold">
                  <span>Sub-Total ({items.length} Store)</span>
                  <span className="text-black">Rp {subTotal.toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between items-center text-2xl text-gray-500 font-bold">
                  <span>Total Discount</span>
                  <span className="text-black">Rp {totalDiscount.toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between items-center text-[2.5rem] border-t-4 border-gray-50 pt-10 mt-6">
                  <span className="font-black">Total Bill:</span>
                  <span className="font-black">Rp {totalBill.toLocaleString('id-ID')}</span>
                </div>
              </div>
            </div>

            {/* Note Section */}
            <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-gray-50 text-center">
              <p className="text-gray-500 text-2xl font-bold leading-snug">
                Please contact each store to <br /> complete your order and payment.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}