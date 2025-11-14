// src/app/checkout/summary/SnapPaymentButton.tsx

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Definisikan tipe untuk response Midtrans
interface SnapTransactionResult {
    transaction_status: string;
    status_code: string;
    transaction_id: string;
    order_id: string;
    gross_amount: string;
    payment_type: string;
    transaction_time: string;
    fraud_status: string;
    // Tambahkan properti lain sesuai kebutuhan
}

// Deklarasi Global window.snap dengan tipe yang tepat
declare global {
    interface Window {
        snap: {
            pay: (
                token: string,
                callbacks?: {
                    onSuccess?: (result: SnapTransactionResult) => void;
                    onPending?: (result: SnapTransactionResult) => void;
                    onError?: (result: SnapTransactionResult) => void;
                    onClose?: () => void;
                }
            ) => void;
        };
    }
}

interface SnapButtonProps {
    orderId: string;
}

// Fungsi untuk memuat Midtrans Snap JS Script
const loadSnapScript = (clientKey: string) => {
    const script = document.createElement('script');
    script.src = 'https://app.sandbox.midtrans.com/snap/snap.js';
    script.setAttribute('data-client-key', clientKey);
    script.async = true;
    document.body.appendChild(script);
};

export default function SnapPaymentButton({ orderId }: SnapButtonProps) {
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        // 1. Muat Script Midtrans
        const clientKey = process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY;
        if (clientKey) {
            loadSnapScript(clientKey);
        } else {
            setError("Midtrans Client Key tidak ditemukan.");
            setIsLoading(false);
            return;
        }

        // 2. Ambil Snap Token dari Backend
        const fetchSnapToken = async () => {
            try {
                const response = await fetch('/api/payment/snap', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ orderId }),
                });

                const data = await response.json();

                if (!response.ok || !data.success) {
                    if (response.status === 401) {
                        router.push('/login');
                        return;
                    }
                    throw new Error(data.message || 'Gagal mendapatkan Snap Token.');
                }

                setToken(data.token);
            } catch (err: unknown) {
                // Perbaikan: Ganti any dengan unknown
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError('Terjadi kesalahan yang tidak diketahui');
                }
            } finally {
                setIsLoading(false);
            }
        };

        fetchSnapToken();
    }, [orderId, router]);


    const handlePay = () => {
        if (token && window.snap) {
            // 3. Eksekusi Pop-up Pembayaran
            window.snap.pay(token, {
                onSuccess: (result: SnapTransactionResult) => {
                    // Redirect setelah sukses (status SETTLEMENT)
                    alert('Pembayaran sukses! Status: ' + result.transaction_status);
                    router.push(`/dashboard/order/${orderId}`);
                },
                onPending: (result: SnapTransactionResult) => {
                    // Redirect jika status masih PENDING
                    alert('Menunggu pembayaran Anda. Status: ' + result.transaction_status);
                    router.push(`/dashboard/order/${orderId}`);
                },
                onClose: () => {
                    // Jika user menutup pop-up
                    alert('Anda menutup pop-up pembayaran.');
                }
            });
        } else if (!token) {
            alert('Token belum siap. Mohon tunggu sebentar.');
        }
    };


    if (error) return <p className="text-red-600 p-3 bg-red-100 rounded">Error: {error}</p>;
    if (isLoading || !token) return <button disabled className="w-full p-3 bg-gray-400 text-white rounded">Memuat Pembayaran...</button>;

    return (
        <button
            onClick={handlePay}
            className="w-full p-3 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition"
        >
            Lanjutkan ke Pembayaran Midtrans
        </button>
    );
}