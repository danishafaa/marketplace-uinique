// src/app/dashboard/orders/page.tsx

import { prisma } from '@/lib/prisma';
import { createSupabaseServerClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

async function getOrderHistory() {
    const supabase = await createSupabaseServerClient();
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
        redirect('/login');
    }

    // Ambil semua pesanan milik user ini, termasuk item dan produk terkait
    const orders = await prisma.order.findMany({
        where: { buyerId: session.user.id },
        include: {
            items: {
                include: {
                    product: {
                        select: { name: true, imageUrl: true }
                    }
                }
            }
        },
        orderBy: { createdAt: 'desc' },
    });

    return orders;
}

// Komponen utama
export default async function OrderHistoryPage() {
    const orders = await getOrderHistory();

    if (orders.length === 0) {
        return (
            <div className="max-w-4xl mx-auto p-8 text-center">
                <h1 className="text-3xl font-bold mb-4">Histori Pesanan</h1>
                <p className="mt-8 text-lg text-gray-600">Anda belum memiliki pesanan.</p>
                <Link href="/" className="mt-4 inline-block text-blue-600 hover:underline">
                    Mulai Belanja Sekarang
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-8">
            <h1 className="text-3xl font-bold mb-8">Histori Pesanan Anda</h1>

            <div className="space-y-8">
                {orders.map((order) => (
                    <div key={order.id} className="border rounded-xl shadow-md p-6 bg-white">

                        {/* Header Pesanan */}
                        <div className="flex justify-between items-center border-b pb-3 mb-4">
                            <h2 className="font-semibold text-lg">Order ID: {order.id.substring(0, 10)}...</h2>
                            <p className={`px-3 py-1 rounded-full text-sm font-bold ${order.status === 'PAID' ? 'bg-green-100 text-green-700' :
                                    order.status === 'PENDING' ? 'bg-yellow-100 text-yellow-700' :
                                        'bg-red-100 text-red-700'
                                }`}>
                                {order.status}
                            </p>
                        </div>

                        {/* Detail Item */}
                        <div className="space-y-4">
                            {order.items.map((item) => (
                                <div key={item.id} className="flex items-center space-x-4">
                                    <div className="relative w-16 h-16 flex-shrink-0">
                                        <Image
                                            src={item.product.imageUrl || '/placeholder.png'}
                                            alt={item.product.name}
                                            fill
                                            className="object-cover rounded"
                                        />
                                    </div>
                                    <div>
                                        <p className="font-medium">{item.product.name}</p>
                                        <p className="text-sm text-gray-600">
                                            {item.quantity} x Rp{item.price.toLocaleString('id-ID')}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Footer Total */}
                        <div className="mt-4 pt-3 border-t flex justify-between items-center">
                            <p className="text-gray-700 font-medium">Total Pembayaran:</p>
                            <p className="text-xl font-bold text-orange-600">
                                Rp{order.totalAmount.toLocaleString('id-ID')}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}