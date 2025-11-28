// src/app/actions/chat.ts

'use server';

import { createSupabaseServerClient } from '@/utils/supabase/server';
import { prisma } from '@/lib/prisma';

interface ChatRoomResponse {
    success: boolean;
    roomId?: string;
    message: string;
}

// Fungsi untuk memulai percakapan atau menemukan yang sudah ada
export async function startConversation(sellerProfileId: string): Promise<ChatRoomResponse> {
    const supabase = await createSupabaseServerClient();
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
        return { success: false, message: 'Harap login untuk memulai chat.' };
    }
    const buyerId = session.user.id;

    // Pengecekan agar pembeli tidak chat dengan dirinya sendiri
    if (buyerId === sellerProfileId) {
        return { success: false, message: 'Tidak bisa chat dengan diri sendiri.' };
    }

    try {
        // 1. Cek apakah Room sudah ada
        // Kita perlu mencari Room di mana user adalah BUYER dan user lain adalah SELLER
        let room = await prisma.chatRoom.findFirst({
            where: {
                buyerId: buyerId,
                sellerId: sellerProfileId,
            }
        });

        // 2. Jika Room belum ada, buat yang baru
        if (!room) {
            room = await prisma.chatRoom.create({
                data: {
                    buyerId: buyerId,
                    sellerId: sellerProfileId,
                }
            });
        }

        // 3. Sukses: Kembalikan Room ID
        return {
            success: true,
            roomId: room.id,
            message: 'Percakapan siap dimulai.'
        };

    } catch (error) {
        console.error("Start Conversation failed:", error);
        return { success: false, message: 'Gagal memulai percakapan.' };
    }
}