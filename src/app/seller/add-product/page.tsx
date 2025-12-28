// src/app/seller/add-product/page.tsx
'use client'; // Tambahkan ini di baris paling atas

import { useState } from 'react';
import { addProduct } from "@/app/actions/product";

export default function AddProductPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    // Fungsi wrapper untuk menangani return value dari server action
    async function handleSubmit(formData: FormData) {
        setIsLoading(true);
        setErrorMessage("");

        const result = await addProduct(formData);

        if (result && !result.success) {
            setErrorMessage(result.message);
            setIsLoading(false);
        }
        // Jika sukses, redirect akan otomatis dijalankan oleh server action
    }

    return (
        <div className="min-h-screen bg-[#F0F2F5] py-10 font-sans">
            <div className="container mx-auto max-w-4xl px-4">
                <h1 className="text-2xl font-bold mb-8 text-gray-800">Add sales products</h1>

                {/* Gunakan wrapper handleSubmit untuk menghilangkan error ts(2322) */}
                <form action={handleSubmit} className="space-y-6 pb-20">

                    {/* Tampilkan error jika ada */}
                    {errorMessage && (
                        <div className="bg-red-50 text-red-500 p-4 rounded-xl text-sm font-bold border border-red-100">
                            {errorMessage}
                        </div>
                    )}

                    {/* Card 1: Store and Product Information */}
                    <div className="bg-white rounded-3xl shadow-sm p-8 border border-gray-100">
                        <h2 className="text-lg font-bold mb-6 text-[#002B45]">Store and Product Information</h2>
                        <div className="flex flex-col md:flex-row gap-8">
                            <div className="w-full md:w-1/3">
                                <div className="aspect-square bg-gray-50 border-2 border-dashed border-gray-300 rounded-2xl flex flex-col items-center justify-center mb-4 cursor-pointer hover:bg-gray-100 transition">
                                    <span className="text-gray-400 text-sm">+ add photo</span>
                                </div>
                            </div>
                            <div className="flex-grow space-y-4">
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-semibold text-gray-600">Product Name*</label>
                                    <input name="name" className="w-full border border-gray-300 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-[#002B45]" required />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-semibold text-gray-600">Product Description</label>
                                    <textarea name="description" rows={3} className="w-full border border-gray-300 rounded-xl p-4 outline-none focus:ring-2 focus:ring-[#002B45]" required></textarea>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Card 2: Product Specification */}
                    <div className="bg-white rounded-3xl shadow-sm p-8 border border-gray-100">
                        <h2 className="text-lg font-bold mb-6 text-[#002B45]">Product Specification</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold text-gray-600">Category*</label>
                                <select name="category" className="w-full border border-gray-300 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-[#002B45]">
                                    <option value="Food">Food</option>
                                    <option value="Drink">Drink</option>
                                    <option value="Service">Service</option>
                                    <option value="Stationery">Stationery</option>
                                </select>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold text-gray-600">Stock*</label>
                                <input name="stock" type="number" className="w-full border border-gray-300 rounded-xl px-4 py-2 outline-none" required />
                            </div>
                        </div>
                    </div>

                    {/* Card 3: Price Details */}
                    <div className="bg-white rounded-3xl shadow-sm p-8 border border-gray-100">
                        <h2 className="text-lg font-bold mb-6 text-[#002B45]">Price and Stock Details</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold text-gray-600">Price (Before Discount)*</label>
                                <input name="price" type="number" placeholder="Rp 0" className="w-full border border-gray-300 rounded-xl px-4 py-2 outline-none" required />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold text-gray-600">Price After Discount*</label>
                                <input name="discountPrice" type="number" placeholder="Rp 0" className="w-full border border-gray-300 rounded-xl px-4 py-2 outline-none" required />
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center gap-6 mt-10">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="bg-[#002B45] text-white px-16 py-3 rounded-full font-bold shadow-lg hover:bg-[#00365a] transition disabled:bg-gray-400"
                        >
                            {isLoading ? "SAVING..." : "SAVE"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}