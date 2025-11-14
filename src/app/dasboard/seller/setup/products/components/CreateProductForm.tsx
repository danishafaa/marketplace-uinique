// src/app/dashboard/seller/products/components/CreateProductForm.tsx
'use client';

import { useState } from 'react';
import { createProduct } from '../actions';

export function CreateProductForm() {
    const [isLoading, setIsLoading] = useState(false);

    async function handleSubmit(formData: FormData) {
        setIsLoading(true);
        try {
            await createProduct(formData);
            // Reset form atau refresh halaman
            window.location.reload();
        } catch (error) {
            console.error('Error creating product:', error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <form action={handleSubmit} className="mb-8 p-4 border rounded">
            <h2 className="text-xl font-bold mb-4">Tambah Produk Baru</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium mb-2">Nama Produk</label>
                    <input
                        type="text"
                        name="name"
                        required
                        className="w-full p-2 border rounded"
                        placeholder="Nama produk"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-2">Harga</label>
                    <input
                        type="number"
                        name="price"
                        required
                        className="w-full p-2 border rounded"
                        placeholder="Harga"
                    />
                </div>
                <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2">Deskripsi</label>
                    <textarea
                        name="description"
                        required
                        className="w-full p-2 border rounded"
                        placeholder="Deskripsi produk"
                        rows={3}
                    />
                </div>
                <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2">Gambar Produk</label>
                    <input
                        type="file"
                        name="imageFile"
                        accept="image/*"
                        required
                        className="w-full p-2 border rounded"
                    />
                </div>
            </div>
            <button
                type="submit"
                disabled={isLoading}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
            >
                {isLoading ? 'Menambahkan...' : 'Tambah Produk'}
            </button>
        </form>
    );
}