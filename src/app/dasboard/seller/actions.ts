'use server'

import { createSupabaseServerClient } from '@/utils/supabase/server';
import { prisma } from '@/lib/prisma';
import type { Prisma } from '@prisma/client';

interface StoreSetupResult {
    success: boolean;
    message: string;
}

export async function registerSeller(formData: FormData): Promise<StoreSetupResult> {
    const supabase = await createSupabaseServerClient(); // Jangan lupa await!
    const storeName = formData.get('storeName') as string;
    const storeDescription = formData.get('storeDescription') as string;

    // 1. Dapatkan Sesi Pengguna
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
        return { success: false, message: 'Harap login untuk mendaftar sebagai penjual.' };
    }

    const userId = session.user.id;

    if (!storeName || storeName.length < 3) {
        return { success: false, message: 'Nama toko tidak valid.' };
    }

    try {
        // 2. Transaksi Database (Prisma)
        await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
            // a. Update Profile: Tandai pengguna sebagai penjual
            const updatedProfile = await tx.profile.update({
                where: { id: userId },
                data: { isSeller: true },
            });

            if (!updatedProfile) {
                throw new Error("Profile not found.");
            }

            // b. Create Store: Buat entitas Store baru yang terhubung ke Profile
            await tx.store.create({
                data: {
                    name: storeName,
                    description: storeDescription,
                    profileId: userId,
                },
            });
        });

        return { success: true, message: 'Pendaftaran toko berhasil!' };

    } catch (error: unknown) {
        console.error("Seller registration failed:", error);

        if (error instanceof Error) {
            // Untuk Prisma error dengan code
            if ('code' in error && error.code === 'P2002') {
                return { success: false, message: 'Nama toko ini sudah digunakan. Mohon pilih nama lain.' };
            }
            return { success: false, message: error.message };
        }

        return { success: false, message: 'Terjadi kesalahan server saat mendaftar.' };
    }
}