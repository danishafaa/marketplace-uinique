// src/lib/midtrans.ts

import Midtrans from 'midtrans-client';

// Inisialisasi klien Snap
const snap = new Midtrans.Snap({
    isProduction: process.env.NODE_ENV === 'production', // Otomatis cek mode produksi
    serverKey: process.env.MIDTRANS_SERVER_KEY || '', // Ambil dari .env
    clientKey: process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY || '', // Ambil dari .env.local
});

// Inisialisasi klien Core API (digunakan untuk Webhook verifikasi status)
const core = new Midtrans.CoreApi({
    isProduction: process.env.NODE_ENV === 'production',
    serverKey: process.env.MIDTRANS_SERVER_KEY || '',
});

export { snap, core };