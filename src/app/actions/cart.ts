// src/app/actions/cart.ts

'use server';

import { createSupabaseServerClient } from '@/utils/supabase/server';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

interface CartActionResponse {
    success: boolean;
    message: string;
    cartId?: string;
}

export async function addItemToCart(productId: string, quantity: number = 1): Promise<CartActionResponse> {
    const supabase = await createSupabaseServerClient();
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
        return { success: false, message: 'Harap login untuk menambahkan item ke keranjang.' };
    }

    const userId = session.user.id;

    try {
        // 1. Ambil harga produk saat ini (keamanan)
        const product = await prisma.product.findUnique({
            where: { id: productId },
            select: { price: true, name: true, storeId: true }
        });

        if (!product) {
            return { success: false, message: 'Produk tidak ditemukan.' };
        }

        // 2. Transaksi Database
        const cart = await prisma.$transaction(async (tx) => {
            // A. Dapatkan atau Buat Keranjang Pembeli
            let cart = await tx.cart.findUnique({
                where: { buyerId: userId },
                include: { items: true },
            });

            if (!cart) {
                cart = await tx.cart.create({
                    data: { buyerId: userId },
                    include: { items: true },
                });
            }

            // B. Cek apakah item sudah ada di keranjang
            const existingItem = cart.items.find(item => item.productId === productId);

            if (existingItem) {
                // Item sudah ada: UPDATE kuantitas
                await tx.cartItem.update({
                    where: { id: existingItem.id },
                    data: { quantity: existingItem.quantity + quantity },
                });
            } else {
                // Item baru: INSERT
                await tx.cartItem.create({
                    data: {
                        cartId: cart.id,
                        productId: productId,
                        quantity: quantity,
                        price: product.price, // Simpan harga saat ini
                    }
                });
            }

            return cart;
        });

        revalidatePath('/cart');
        return { success: true, message: 'Item berhasil ditambahkan ke keranjang!', cartId: cart.id };

    } catch (error: unknown) {
        console.error("Add to Cart failed:", error);
        if (error instanceof Error) {
            return { success: false, message: error.message };
        }
        return { success: false, message: 'Terjadi kesalahan server saat memproses keranjang.' };
    }
}

// Dummy Server Action untuk fitur Cart yang lain
export async function removeItemFromCart(itemId: string) {
    // Implementasi logika delete di sini
    return { success: true, message: 'Item berhasil dihapus.' };
}