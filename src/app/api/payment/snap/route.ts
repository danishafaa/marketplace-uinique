// src/app/api/payment/snap/route.ts

import { prisma } from '@/lib/prisma';
import { snap } from '@/lib/midtrans';
import { NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/utils/supabase/server';

export const dynamic = 'force-dynamic';

// Definisikan tipe untuk item details
interface MidtransItemDetail {
    id: string;
    price: number;
    quantity: number;
    name: string;
}

// Definisikan tipe untuk order item
interface OrderItem {
    productId: string;
    price: number;
    quantity: number;
    product: {
        name: string;
    };
}

interface SnapTransactionParameter {
    transaction_details: {
        order_id: string;
        gross_amount: number;
    };
    customer_details: {
        email: string;
        first_name?: string;
        last_name?: string;
        phone?: string;
    };
    item_details: MidtransItemDetail[];
    callbacks: {
        notification: string;
    };
}

export async function POST(req: Request) {
    const supabase = await createSupabaseServerClient();
    const { data: { session } } = await supabase.auth.getSession();

    // 1. Otorisasi: Pastikan pengguna sudah login
    if (!session) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { orderId } = await req.json();

        // 2. Verifikasi & Ambil Data Order dari Database (Prisma)
        const order = await prisma.order.findUnique({
            where: { id: orderId, buyerId: session.user.id },
            include: { items: { include: { product: true } } }
        });

        if (!order || order.status !== 'PENDING') {
            return NextResponse.json({ message: 'Order is not valid or already paid.' }, { status: 400 });
        }

        // 3. Persiapan Data untuk Midtrans
        const midtransItemDetails: MidtransItemDetail[] = order.items.map((item: OrderItem) => ({
            id: item.productId,
            price: item.price,
            quantity: item.quantity,
            name: item.product.name,
        }));

        // Dapatkan origin dari URL request
        const origin = new URL(req.url).origin;

        const parameter: SnapTransactionParameter = {
            transaction_details: {
                order_id: order.id,
                gross_amount: order.totalAmount,
            },
            customer_details: {
                email: session.user.email || '',
                first_name: session.user.user_metadata?.name || '',
            },
            item_details: midtransItemDetails,
            callbacks: {
                notification: `${origin}/api/payment/webhook`,
            }
        };

        // 4. Minta Snap Token ke Midtrans
        const transaction = await snap.createTransaction(parameter);
        const snapToken = transaction.token;

        // 5. Kirim Snap Token kembali ke Frontend
        return NextResponse.json({
            success: true,
            token: snapToken,
        });

    } catch (error: unknown) {
        console.error("Midtrans Snap initiation failed:", error);

        let errorMessage = 'Failed to create payment session.';
        if (error instanceof Error) {
            errorMessage = error.message;
        }

        return NextResponse.json({ message: errorMessage }, { status: 500 });
    }
}