// src/app/actions/wishlist.ts

'use server';

import { createSupabaseServerClient } from '@/utils/supabase/server';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

// --- 1. AMBIL DATA FAVORIT (Untuk Halaman /favorites) ---
export async function getFavoriteProducts() {
    const supabase = await createSupabaseServerClient();
    const { data: { session } } = await supabase.auth.getSession();

    if (!session?.user) return [];

    try {
        const favorites = await prisma.wishlist.findMany({
            where: { userId: session.user.id },
            include: {
                product: {
                    include: { store: { select: { name: true } } } // Ambil nama toko juga
                },
            },
            orderBy: { createdAt: 'desc' }
        });

        // Kembalikan hanya data produknya saja
        return favorites.map((fav) => fav.product);
    } catch (error) {
        console.error("Error fetching wishlist:", error);
        return [];
    }
}

// --- 2. TOGGLE LOVE (Untuk Tombol Hati di Product Card) ---
export async function toggleWishlist(productId: string) {
    const supabase = await createSupabaseServerClient();
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
        return { success: false, message: 'Harap login dahulu.' };
    }

    const userId = session.user.id;

    try {
        // Cek apakah sudah ada di wishlist
        const existing = await prisma.wishlist.findUnique({
            where: {
                userId_productId: {
                    userId: userId,
                    productId: productId
                }
            }
        });

        if (existing) {
            // Jika ada, HAPUS (Unlike)
            await prisma.wishlist.delete({
                where: { id: existing.id }
            });
            revalidatePath('/');
            revalidatePath('/favorites');
            return { success: true, message: 'Dihapus dari favorit', action: 'removed' };
        } else {
            // Jika belum ada, TAMBAH (Like)
            await prisma.wishlist.create({
                data: {
                    userId: userId,
                    productId: productId
                }
            });
            revalidatePath('/');
            revalidatePath('/favorites');
            return { success: true, message: 'Ditambahkan ke favorit', action: 'added' };
        }
    } catch (error) {
        console.error("Error toggle wishlist:", error);
        return { success: false, message: 'Gagal memproses data.' };
    }
}

// --- 3. HAPUS SPESIFIK (Untuk Tombol Sampah) ---
export async function removeFromWishlist(productId: string) {
    const supabase = await createSupabaseServerClient();
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) return { success: false, message: "Unauthorized" };

    try {
        await prisma.wishlist.delete({
            where: {
                userId_productId: {
                    userId: session.user.id,
                    productId: productId
                }
            }
        });
        revalidatePath('/favorites');
        return { success: true };
    } catch {
        return { success: false, message: "Gagal menghapus" };
    }
}