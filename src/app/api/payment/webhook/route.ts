// src/app/api/payment/webhook/route.ts

import { prisma } from '@/lib/prisma';
import { core } from '@/lib/midtrans';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
    const body = await req.json();

    if (!body || !body.order_id) {
        return NextResponse.json({ message: 'Invalid payload' }, { status: 400 });
    }

    const orderId = body.order_id;

    try {
        const statusResponse = await core.status(orderId);

        const transactionStatus = statusResponse.transaction_status;
        const fraudStatus = statusResponse.fraud_status;

        let newStatus = 'PENDING';

        // Tentukan Status Berdasarkan Response Midtrans
        if (transactionStatus === 'capture') {
            if (fraudStatus === 'accept') {
                newStatus = 'PAID';
            }
        } else if (transactionStatus === 'settlement') {
            newStatus = 'PAID';
        } else if (transactionStatus === 'pending') {
            newStatus = 'PENDING';
        } else if (transactionStatus === 'deny' || transactionStatus === 'cancel' || transactionStatus === 'expire') {
            newStatus = 'CANCELED';
        } else if (transactionStatus === 'refund' || transactionStatus === 'partial_refund') {
            newStatus = 'REFUNDED';
        }

        // Update Database
        await prisma.order.update({
            where: { id: orderId },
            data: {
                status: newStatus,
                midtransToken: statusResponse.transaction_id,
            },
        });

        return NextResponse.json({ message: `Status updated to ${newStatus}` }, { status: 200 });

    } catch (error: unknown) {
        console.error(`Webhook processing failed for order ${orderId}:`, error);
        return NextResponse.json({ message: 'Server processing error' }, { status: 500 });
    }
}