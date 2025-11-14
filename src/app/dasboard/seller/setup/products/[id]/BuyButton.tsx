// src/app/products/[id]/BuyButton.tsx

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface BuyButtonProps {
    productId: string;
    productPrice: number;
}

export default function BuyButton({ productId, productPrice }: BuyButtonProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleInitiateOrder = async () => {
        setIsLoading(true);
        setError(null);

        try {
            // 1. Panggil API Route untuk membuat Order di DB
            const response = await fetch('/api/order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    productId: productId,
                    quantity: 1, // Untuk saat ini, asumsikan kuantitas 1
                }),
            });

            const data = await response.json();

            if (!response.ok || !data.success) {
                // Tangani Unauthorized (401) atau error lain dari server
                if (response.status === 401) {
                    router.push('/login');
                    return;
                }
                throw new Error(data.message || 'Gagal memulai pesanan.');
            }

            // 2. Sukses: Arahkan ke Halaman Checkout/Midtrans
            // Di Fase 4, kita akan menggunakan orderId ini untuk mendapatkan token Midtrans.
            const { orderId, totalAmount } = data;

            // Tampilkan harga menggunakan productPrice yang diterima dari props
            alert(`Pesanan berhasil dibuat! ID: ${orderId}. Total: Rp${productPrice.toLocaleString('id-ID')}`);

            // Lanjut ke halaman ringkasan checkout atau Midtrans (Fase 4)
            router.push(`/checkout/summary?orderId=${orderId}`);

        } catch (err: unknown) {
            // Perbaikan: Gunakan unknown dan handle error dengan proper type checking
            if (err instanceof Error) {
                setError(err.message || 'Terjadi kesalahan jaringan.');
            } else {
                setError('Terjadi kesalahan yang tidak diketahui.');
            }
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <button
                onClick={handleInitiateOrder}
                disabled={isLoading}
                className={`w-full text-white text-xl p-4 rounded-lg transition ${isLoading ? 'bg-gray-500 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'}`}
            >
                {isLoading ? 'Memproses Pesanan...' : `Beli Sekarang - Rp${productPrice.toLocaleString('id-ID')}`}
            </button>
            {error && (
                <p className="mt-2 text-red-500 text-sm p-2 bg-red-100 rounded">
                    {error}
                </p>
            )}
        </>
    );
}