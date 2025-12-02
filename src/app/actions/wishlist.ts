// src/app/actions/wishlist.ts

'use server';

import { createSupabaseServerClient } from '@/utils/supabase/server';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

interface WishlistActionResponse {
    success: boolean;
    message: string;
    action?: 'added' | 'removed';
}

export async function toggleWishlist(productId: string): Promise<WishlistActionResponse> {
    const supabase = await createSupabaseServerClient();
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
        return { success: false, message: 'Harap login untuk menambahkan ke daftar favorit.' };
    }
    const userId = session.user.id;

    try {
        // 1. Dapatkan atau Buat Wishlist Pengguna
        let wishlist = await prisma.wishlist.findUnique({
            where: { buyerId: userId },
        });

        if (!wishlist) {
            wishlist = await prisma.wishlist.create({
                data: { buyerId: userId },
            });
        }

        // 2. Cek apakah item sudah ada
        const existingItem = await prisma.wishlistItem.findUnique({
            where: {
                wishlistId_productId: { // Menggunakan unique constraint yang kita buat
                    wishlistId: wishlist.id,
                    productId: productId,
                },
            },
        });

        if (existingItem) {
            // Item sudah ada: HAPUS dari wishlist
            await prisma.wishlistItem.delete({
                where: { id: existingItem.id },
            });
            revalidatePath('/dashboard/favorites');
            return { success: true, message: 'Dihapus dari favorit.', action: 'removed' };
        } else {
            // Item belum ada: TAMBAHKAN ke wishlist
            await prisma.wishlistItem.create({
                data: {
                    wishlistId: wishlist.id,
                    productId: productId,
                },
            });
            revalidatePath('/dashboard/favorites');
            return { success: true, message: 'Ditambahkan ke favorit.', action: 'added' };
        }

    } catch (error: unknown) {
        console.error("Wishlist toggle failed:", error);
        return { success: false, message: 'Gagal memproses favorit.' };
    }
}