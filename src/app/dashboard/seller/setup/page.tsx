// src/app/dashboard/seller/setup/page.tsx

'use client';

import { useState } from 'react';
import { registerSeller } from '../actions';
import { useRouter } from 'next/navigation';

export default function SellerSetupPage() {
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');
    const router = useRouter();

    const handleSubmit = async (formData: FormData) => {
        setStatus('loading');
        const result = await registerSeller(formData);

        if (result.success) {
            setStatus('success');
            setMessage(result.message + ' Mengarahkan ke dashboard produk...');
            // Redirect ke Langkah 13 (Product Management) setelah sukses
            setTimeout(() => router.push('/dashboard/seller/products'), 2000);
        } else {
            setStatus('error');
            setMessage(result.message);
        }
    };

    return (
        <div className="p-8 max-w-lg mx-auto">
            <h1 className="text-2xl font-bold mb-6">Daftarkan Toko Anda</h1>

            <form action={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="storeName" className="block text-sm font-medium">Nama Toko</label>
                    <input
                        id="storeName"
                        name="storeName"
                        type="text"
                        required
                        className="w-full p-2 border rounded mt-1"
                        disabled={status === 'loading'}
                    />
                </div>

                <div>
                    <label htmlFor="storeDescription" className="block text-sm font-medium">Deskripsi Singkat</label>
                    <textarea
                        id="storeDescription"
                        name="storeDescription"
                        rows={3}
                        className="w-full p-2 border rounded mt-1"
                        disabled={status === 'loading'}
                    />
                </div>

                <button
                    type="submit"
                    disabled={status === 'loading'}
                    className={`w-full p-3 text-white rounded transition ${status === 'loading' ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`}
                >
                    {status === 'loading' ? 'Mendaftar...' : 'Daftar Sekarang'}
                </button>
            </form>

            {(status === 'success' || status === 'error') && (
                <p className={`mt-4 p-3 rounded text-sm ${status === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {message}
                </p>
            )}
        </div>
    );
}