'use server';

import { prisma } from '@/lib/prisma';
import { createSupabaseServerClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';

// --- FUNGSI TAMBAH KE KERANJANG ---
export async function addItemToCart(productId: string, quantity: number) {
    const supabase = await createSupabaseServerClient();
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) return { success: false, message: 'Harap login terlebih dahulu' };

    const product = await prisma.product.findUnique({
        where: { id: productId },
        select: { price: true }
    });

    if (!product) return { success: false, message: 'Produk tidak ditemukan' };

    let cart = await prisma.cart.findUnique({
        where: { buyerId: session.user.id }
    });

    if (!cart) {
        cart = await prisma.cart.create({
            data: { buyerId: session.user.id }
        });
    }

    await prisma.cartItem.upsert({
        where: {
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
            price: product.price 
        }
    });

    revalidatePath('/cart');
    return { success: true };
}

// --- FUNGSI AMBIL ISI KERANJANG ---
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

// --- FUNGSI UPDATE QUANTITY ---
export async function updateCartQuantity(itemId: string, quantity: number) {
    await prisma.cartItem.update({
        where: { id: itemId },
        data: { quantity: Math.max(1, quantity) }
    });
    revalidatePath('/cart');
}

// --- FUNGSI HAPUS ITEM (VERSI AMAN) ---
export async function deleteCartItem(itemId: string) {
    try {
        // Kita gunakan 'deleteMany' alih-alih 'delete'. 
        // Bedanya: 'deleteMany' tidak akan error/crash jika ID tidak ditemukan.
        // Ia hanya akan mengembalikan jumlah "0 item terhapus".
        await prisma.cartItem.deleteMany({
            where: { id: itemId }
        });

        // Paksa halaman keranjang untuk memperbarui tampilannya
        revalidatePath('/cart');
        
        return { success: true };
    } catch (error) {
        console.error("Gagal hapus item dari keranjang:", error);
        return { success: false, message: "Terjadi kesalahan saat menghapus barang" };
    }
}

// --- FUNGSI AMBIL DATA CHECKOUT (Hanya yang dicentang) ---
export async function getCheckoutItems() {
  const supabase = await createSupabaseServerClient(); // KOREKSI: Sesuaikan nama fungsi import
  
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];

  // KOREKSI: Karena CartItem tidak punya userId, kita cari lewat Cart
  const cart = await prisma.cart.findUnique({
    where: { buyerId: user.id },
    include: {
      items: {
        where: { checked: true }, // Hanya yang tercentang di UI
        include: {
          product: {
            include: { store: true }
          }
        }
      }
    }
  });

  return cart?.items || [];
}

export async function getCartCount() {
    try {
        const supabase = await createSupabaseServerClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) return 0;

        // 1. Cari Keranjang menggunakan 'buyerId' sesuai skema kamu
        const userCart = await prisma.cart.findFirst({
            where: { 
                buyerId: user.id // INI KUNCINYA: Pakai buyerId
            },
            select: { id: true }
        });

        // Jika keranjang belum ada, kembalikan 0
        if (!userCart) return 0;

        // 2. Hitung total quantity berdasarkan cartId
        const result = await prisma.cartItem.aggregate({
            where: {
                cartId: userCart.id
            },
            _sum: {
                quantity: true
            }
        });

        // Pakai optional chaining '?' agar tidak error 'possibly undefined'
        return result?._sum?.quantity || 0;
        
    } catch (error) {
        console.error("Error fetching cart count:", error);
        return 0;
    }
}