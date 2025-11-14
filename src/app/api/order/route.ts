// src/app/api/order/route.ts

import { prisma } from '@/lib/prisma';
import { createSupabaseServerClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
    const supabase = await createSupabaseServerClient();
    const { data: { session } } = await supabase.auth.getSession();

    // 1. Otorisasi: Pastikan pengguna sudah login
    if (!session) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { productId, quantity = 1 } = await req.json(); // Ambil detail pesanan dari body request
        const buyerId = session.user.id;

        // 2. Validasi Harga (CRUCIAL): Ambil harga dari database, jangan percaya harga dari client
        const product = await prisma.product.findUnique({
            where: { id: productId },
            select: { id: true, price: true, name: true, storeId: true }
        });

        if (!product) {
            return NextResponse.json({ message: 'Product not found' }, { status: 404 });
        }

        const calculatedPrice = product.price * quantity;

        // 3. Transaksi: Buat Order dan OrderItem
        const order = await prisma.order.create({
            data: {
                buyerId: buyerId,
                totalAmount: calculatedPrice,
                status: 'PENDING', // Status awal sebelum pembayaran
                items: {
                    create: {
                        productId: product.id,
                        quantity: quantity,
                        price: product.price, // Harga per unit saat transaksi
                    }
                }
            },
        });

        // 4. Sukses: Kirimkan ID Pesanan kembali ke client
        return NextResponse.json({
            success: true,
            orderId: order.id,
            totalAmount: order.totalAmount,
            // Data ini akan digunakan di Fase 4 (Midtrans)
        });

    } catch (error) {
        console.error("Order initiation failed:", error);
        return NextResponse.json({ message: 'Failed to initiate order.' }, { status: 500 });
    }
}