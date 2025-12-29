'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link'; // Import Link untuk navigasi
import { updateCartQuantity, deleteCartItem } from '@/app/actions/cart';

interface CartItem {
    id: string;
    quantity: number;
    checked: boolean; // Field baru yang kita tambahkan di schema
    product: {
        name: string;
        price: number;
        imageUrl: string | null;
        store: {
            name: string;
        };
    };
}

export default function CartClient({ initialItems }: { initialItems: CartItem[] }) {
    // State lokal untuk menangani UI centang secara real-time
    const [items, setItems] = useState(initialItems);

    // Hitung berapa banyak produk yang dicentang
    const selectedItemsCount = items.filter(item => item.checked).length;

    return (
        <div className="space-y-6">
            {/* Header List */}
            <div className="bg-white p-4 rounded-sm shadow-sm flex items-center text-sm font-medium text-gray-600">
                <div className="w-[45%] pl-12">Product</div>
                <div className="w-[15%] text-center">Unit Price</div>
                <div className="w-[15%] text-center">Quantity</div>
                <div className="w-[15%] text-center">Total Price</div>
                <div className="w-[10%] text-center">Action</div>
            </div>

            {/* Loop Item Keranjang */}
            {items.map((item) => (
                <div key={item.id} className="bg-white p-6 rounded-sm shadow-sm border-b">
                    {/* Nama Toko */}
                    <div className="flex items-center space-x-3 mb-4">
                        <input 
                            type="checkbox" 
                            checked={item.checked} 
                            readOnly 
                            className="w-4 h-4 accent-[#002b45]" 
                        />
                        <span className="bg-[#002b45] text-white text-[10px] px-1.5 py-0.5 rounded-sm font-bold">Star+</span>
                        <span className="font-bold text-sm text-gray-800">{item.product.store.name}</span>
                    </div>

                    {/* Detail Produk */}
                    <div className="flex items-center text-sm">
                        <div className="w-[45%] flex items-center space-x-4">
                            <input 
                                type="checkbox" 
                                checked={item.checked} 
                                readOnly 
                                className="w-4 h-4 accent-[#002b45]" 
                            />
                            <div className="relative w-20 h-20 border rounded-sm overflow-hidden">
                                <Image src={item.product.imageUrl || '/placeholder.png'} alt={item.product.name} fill className="object-cover" />
                            </div>
                            <p className="flex-1 pr-4 line-clamp-2">{item.product.name}</p>
                        </div>

                        <div className="w-[15%] text-center">Rp. {item.product.price.toLocaleString('id-ID')}</div>

                        <div className="w-[15%] flex justify-center">
                            <div className="flex items-center border rounded-sm">
                                <button onClick={() => updateCartQuantity(item.id, item.quantity - 1)} className="px-3 py-1 border-r hover:bg-gray-50">-</button>
                                <span className="px-4 py-1">{item.quantity}</span>
                                <button onClick={() => updateCartQuantity(item.id, item.quantity + 1)} className="px-3 py-1 border-l hover:bg-gray-50">+</button>
                            </div>
                        </div>

                        <div className="w-[15%] text-center font-medium text-[#002b45]">
                            Rp. {(item.product.price * item.quantity).toLocaleString('id-ID')}
                        </div>

                        <div className="w-[10%] text-center">
                            <button onClick={() => deleteCartItem(item.id)} className="text-gray-600 hover:text-red-600">Delete</button>
                        </div>
                    </div>
                </div>
            ))}

            {/* Bottom Bar Sticky */}
            <div className="sticky bottom-0 bg-white p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] flex items-center justify-between rounded-sm">
                <div className="flex items-center space-x-8 text-sm text-gray-700">
                    <label className="flex items-center space-x-2 cursor-pointer">
                        <input type="checkbox" className="w-4 h-4 accent-[#002b45]" />
                        <span>Select All</span>
                    </label>
                    <button className="hover:text-red-600">Delete</button>
                    <button className="text-[#002b45] font-medium">Add To My Favorites</button>
                </div>

                <div className="flex items-center space-x-6">
                    {/* Logika Tombol Checkout: Hanya aktif jika ada yang dicentang */}
                    <Link href={selectedItemsCount > 0 ? "/checkout" : "#"}>
                        <button 
                            disabled={selectedItemsCount === 0}
                            className={`px-12 py-3 rounded-md font-bold text-sm transition ${
                                selectedItemsCount > 0 
                                ? "bg-[#002b45] text-white hover:bg-[#00365a]" 
                                : "bg-gray-300 text-gray-500 cursor-not-allowed"
                            }`}
                        >
                            Checkout {selectedItemsCount > 0 && `(${selectedItemsCount})`}
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}