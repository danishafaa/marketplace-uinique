'use server';

import { prisma } from '@/lib/prisma';
import { createSupabaseServerClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';

export async function addItemToCart(productId: string, quantity: number) {
    const supabase = await createSupabaseServerClient();
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) return { success: false, message: 'Harap login terlebih dahulu' };

    // 1. Ambil data produk untuk mendapatkan harga terbaru
    const product = await prisma.product.findUnique({
        where: { id: productId },
        select: { price: true }
    });

    if (!product) return { success: false, message: 'Produk tidak ditemukan' };

    // 2. Pastikan Keranjang (Cart) pengguna sudah ada
    let cart = await prisma.cart.findUnique({
        where: { buyerId: session.user.id }
    });

    if (!cart) {
        cart = await prisma.cart.create({
            data: { buyerId: session.user.id }
        });
    }

    // 3. Simpan atau perbarui item (Upsert) - Menambahkan 'price' agar tidak error
    await prisma.cartItem.upsert({
        where: {
            // Jika ini masih error merah di VS Code, lakukan langkah nomor 2 di bawah
            cartId_productId: {
                cartId: cart.id,
                productId: productId
            }
        },
        update: {
            quantity: { increment: quantity }
        },
        create: {
            cartId: cart.id,
            productId: productId,
            quantity: quantity,
            price: product.price // Menambahkan field price yang diminta Prisma
        }
    });

    revalidatePath('/cart');
    return { success: true };
}

export async function getCart() {
    const supabase = await createSupabaseServerClient();
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return null;

    return await prisma.cart.findUnique({
        where: { buyerId: session.user.id },
        include: {
            items: {
                include: {
                    product: {
                        include: { store: true }
                    }
                }
            }
        }
    });
}

export async function updateCartQuantity(itemId: string, quantity: number) {
    await prisma.cartItem.update({
        where: { id: itemId },
        data: { quantity: Math.max(1, quantity) }
    });
    revalidatePath('/cart');
}

export async function deleteCartItem(itemId: string) {
    await prisma.cartItem.delete({
        where: { id: itemId }
    });
    revalidatePath('/cart');
}