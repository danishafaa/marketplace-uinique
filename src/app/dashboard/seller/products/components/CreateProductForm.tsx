// src/app/dashboard/seller/products/components/CreateProductForm.tsx
'use client';

import { useState } from 'react';
import { createProduct } from '../actions'; // Pastikan import ini benar

export function CreateProductForm() {
    const [isLoading, setIsLoading] = useState(false);

    // Fungsi handleSubmit yang diperbaiki
    async function handleSubmit(formData: FormData) {
        setIsLoading(true);

        // Panggil server action DAN tangkap hasilnya
        const result = await createProduct(formData);

        setIsLoading(false);

        // Periksa hasil dari server action
        if (result.success) {
            // SUKSES: Tampilkan pesan dan reload
            alert('Produk berhasil ditambahkan!');
            window.location.reload();
        } else {
            // GAGAL: Tampilkan pesan error dari backend
            // Ini adalah pesan error RLS yang kita cari!
            alert(`Error: ${result.message || 'Gagal menambahkan produk.'}`);
        }

        // Kita tidak perlu try...catch di sini karena server action
        // sudah menangani error-nya dan mengembalikannya sebagai objek.
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
                        className="w-full p-2 border rounded text-black" // Tambah text-black
                        placeholder="Nama produk"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-2">Harga</label>
                    <input
                        type="number"
                        name="price"
                        required
                        className="w-full p-2 border rounded text-black" // Tambah text-black
                        placeholder="Harga"
                    />
                </div>
                <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2">Deskripsi</label>
                    <textarea
                        name="description"
                        required
                        className="w-full p-2 border rounded text-black" // Tambah text-black
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
                        className="w-full p-2 border rounded text-black" // Tambah text-black
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