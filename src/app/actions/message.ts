// src/app/actions/message.ts

'use server';

import { createSupabaseServerClient } from '@/utils/supabase/server';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function sendMessage(roomId: string, content: string): Promise<{ success: boolean, message?: string }> {
    const supabase = await createSupabaseServerClient();
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
        return { success: false, message: 'Unauthorized.' };
    }
    const senderId = session.user.id;

    // Safety check (RLS seharusnya sudah menangani ini, tapi kita double-check)
    const room = await prisma.chatRoom.findUnique({ where: { id: roomId } });
    if (!room || (room.buyerId !== senderId && room.sellerId !== senderId)) {
        return { success: false, message: 'Anda bukan partisipan di ruangan ini.' };
    }

    try {
        await prisma.message.create({
            data: {
                roomId: roomId,
                senderId: senderId,
                content: content,
            }
        });

        // Revalidate path yang menampilkan pesan (misalnya halaman chat drawer)
        revalidatePath('/dashboard/chat');

        return { success: true };
    } catch (error) {
        console.error("Failed to send message:", error);
        return { success: false, message: 'Gagal mengirim pesan ke database.' };
    }
}