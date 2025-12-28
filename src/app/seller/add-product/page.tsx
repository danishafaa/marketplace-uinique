// src/app/seller/add-product/page.tsx
'use client';

import { useState } from 'react';
import { addProduct } from "@/app/actions/product";

// --- KOMPONEN TOGGLE SWITCH ---
function ToggleSwitch({ name, label, defaultChecked = false }: { name: string, label: string, defaultChecked?: boolean }) {
    const [isChecked, setIsChecked] = useState(defaultChecked);
    return (
        <div className="flex items-center justify-between">
            <label className="text-sm font-semibold text-gray-600">{label}</label>
            <div
                className={`relative w-12 h-6 rounded-full transition-colors cursor-pointer ${isChecked ? 'bg-[#002B45]' : 'bg-gray-300'}`}
                onClick={() => setIsChecked(!isChecked)}
            >
                <span className={`absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full transition-transform transform ${isChecked ? 'translate-x-6' : 'translate-x-0'}`} />
                <input type="hidden" name={name} value={isChecked ? "true" : "false"} />
            </div>
        </div>
    );
}

export default function AddProductPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    async function handleSubmit(formData: FormData) {
        setIsLoading(true);
        setErrorMessage("");
        const result = await addProduct(formData);
        if (result && !result.success) {
            setErrorMessage(result.message);
            setIsLoading(false);
        }
    }

    const inputClass = "w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-1 focus:ring-[#002B45]";
    const labelClass = "text-sm font-semibold text-gray-700 mb-2 inline-block";

    return (
        <div className="min-h-screen bg-[#F0F2F5] py-10 font-sans">
            <div className="container mx-auto max-w-4xl px-4">
                <h1 className="text-2xl font-bold mb-8 text-gray-800">Add sales products</h1>

                <form action={handleSubmit} className="space-y-6 pb-20">
                    {errorMessage && (
                        <div className="bg-red-50 text-red-500 p-4 rounded-xl text-sm font-bold border border-red-100">{errorMessage}</div>
                    )}

                    {/* CARD 1: Store and Product Information */}
                    <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
                        <h2 className="text-lg font-bold mb-6 text-gray-900">Store and Product Information</h2>
                        <div className="flex flex-col md:flex-row gap-8">
                            {/* Photo Section */}
                            <div className="w-full md:w-1/3">
                                <div className="aspect-square bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 transition mb-2">
                                    <span className="text-gray-400 text-sm font-medium">+ add photo</span>
                                </div>
                                <div className="grid grid-cols-3 gap-2">
                                    {[1, 2, 3].map(i => <div key={i} className="aspect-square bg-gray-50 rounded-lg border border-gray-200"></div>)}
                                </div>
                            </div>

                            <div className="flex-grow space-y-4">
                                <div><label className={labelClass}>Product Name*</label><input name="name" className={inputClass} required /></div>
                                <div><label className={labelClass}>Store Name*</label><input name="storeName" className={inputClass} required /></div>
                                <div><label className={labelClass}>Store Telephone Number*</label><input name="storePhone" className={inputClass} required /></div>
                                <div><label className={labelClass}>Store Address*</label><input name="storeAddress" className={inputClass} required /></div>
                                <div><label className={labelClass}>Product Description</label><textarea name="description" rows={4} className={inputClass} required></textarea></div>
                            </div>
                        </div>
                    </div>

                    {/* CARD 2: Product Specification */}
                    <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
                        <h2 className="text-lg font-bold mb-6 text-gray-900">Product Specification</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                            <div><label className={labelClass}>Category*</label>
                                <select name="category" className={inputClass}>
                                    <option value="Food">Food</option><option value="Drink">Drink</option><option value="Service">Service</option><option value="Stationery">Stationery</option>
                                </select>
                            </div>
                            <div><label className={labelClass}>Shelf Life</label><input name="shelfLife" className={inputClass} /></div>
                            <div><label className={labelClass}>Product Weight</label><input name="weight" className={inputClass} /></div>
                            <div><label className={labelClass}>Flavor</label><input name="flavor" className={inputClass} /></div>
                            <div><label className={labelClass}>Brand</label><input name="brand" className={inputClass} /></div>
                            <div><label className={labelClass}>Packaging Type</label><input name="packagingType" className={inputClass} /></div>
                            <div className="md:col-span-1"><label className={labelClass}>Serving Instructions</label><input name="servingInstructions" className={inputClass} /></div>
                        </div>
                    </div>

                    {/* CARD 3: Price and Stock Details */}
                    <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
                        <h2 className="text-lg font-bold mb-6 text-gray-900">Price and Stock Details</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 mb-6 items-center">
                            <div><label className={labelClass}>Price*</label><input name="originalPrice" type="number" className={inputClass} required /></div>
                            <ToggleSwitch name="isPreOrder" label="Pre-Order" />
                            <div><label className={labelClass}>Stock</label><input name="stock" type="number" className={inputClass} required /></div>
                            <ToggleSwitch name="isDiscount" label="Discount" defaultChecked={true} />
                            <div><label className={labelClass}>Min. Purchase Quantity</label><input name="minOrder" type="number" className={inputClass} /></div>
                            <div><label className={labelClass}>Price After Discount*</label><input name="price" type="number" className={inputClass} required /></div>
                        </div>
                        <div className="bg-[#FFCC00] p-3 rounded flex items-center gap-3 text-xs font-bold text-gray-800">
                            <span className="text-base">⚠️</span> <p>without expedition delivery, transactions only via WA admin</p>
                        </div>
                    </div>

                    {/* FOOTER BUTTONS */}
                    <div className="flex justify-center gap-6 mt-10">
                        <button type="submit" disabled={isLoading} className="bg-[#002B45] text-white px-16 py-2.5 rounded-full font-bold shadow-md hover:bg-[#00365a] transition disabled:bg-gray-400">
                            {isLoading ? "SAVING..." : "Save"}
                        </button>
                        <button type="button" className="bg-[#C4C4C4] text-white px-16 py-2.5 rounded-full font-bold shadow-md hover:bg-gray-400">Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
}