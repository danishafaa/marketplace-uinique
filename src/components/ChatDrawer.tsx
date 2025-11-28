// src/components/ChatDrawer.tsx (KODE LENGKAP YANG SUDAH DIPERBAIKI)

'use client';

import { useEffect, useState, useRef } from 'react';
import { createSupabaseClient } from '@/utils/supabase/client';
import { sendMessage } from '@/app/actions/message';
import { useRouter } from 'next/navigation'; // <-- Perlu diimpor jika ingin redirect

// Tipe data Message disederhanakan
interface ChatMessage {
    id: string;
    senderId: string;
    content: string;
    createdAt: string;
}

// Komponen Utama Chat Drawer
export default function ChatDrawer({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [currentUserId, setCurrentUserId] = useState<string | null>(null);
    const [messageInput, setMessageInput] = useState('');

    const supabase = createSupabaseClient();
    const chatEndRef = useRef<HTMLDivElement>(null);
    const DUMMY_ROOM_ID = "cln1q1l2c000001l01g943210";
    // useRouter harus ada di sini jika Anda ingin redirect setelah error auth
    const router = useRouter();

    // --- Realtime Subscription ---
    useEffect(() => {
        if (!isOpen) return;

        // Mendapatkan ID pengguna saat ini
        supabase.auth.getUser().then(({ data }) => {
            if (data.user) {
                setCurrentUserId(data.user.id);
            } else {
                // Jika tidak login, tutup drawer atau redirect
                onClose();
                router.push('/login');
            }
        });

        // 2. Berlangganan (Subscribe) ke channel Realtime
        const channel = supabase.channel(`chat_room_${DUMMY_ROOM_ID}`)
            .on('postgres_changes', {
                event: 'INSERT',
                schema: 'public',
                table: 'Message',
                filter: `roomId=eq.${DUMMY_ROOM_ID}`
            }, (payload) => {
                const newMessage = payload.new as ChatMessage;
                setMessages((prevMessages) => [...prevMessages, newMessage]);
            })
            .subscribe();

        // 3. Cleanup saat komponen dilepas
        return () => {
            supabase.removeChannel(channel);
        };
    }, [isOpen, supabase, router, onClose]); // <-- DEPENDENCY ARRAY DIPERBAIKI


    // --- Auto-scroll ke pesan terakhir ---
    useEffect(() => {
        if (chatEndRef.current) {
            chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);


    // --- Fungsi Mengirim Pesan ---
    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (messageInput.trim() === '') return;

        const result = await sendMessage(DUMMY_ROOM_ID, messageInput.trim());

        if (result.success) {
            setMessageInput('');
        } else {
            alert(result.message || 'Gagal mengirim pesan.');
        }
    };

    // --- RETURN JSX (YANG HILANG) ---
    return (
        <>
            {/* Overlay Gelap */}
            <div
                className={`fixed inset-0 bg-black transition-opacity duration-300 ${isOpen ? 'opacity-50 z-40' : 'opacity-0 pointer-events-none'
                    }`}
                onClick={onClose}
            ></div>

            {/* Panel Chat (Meluncur dari Kanan) */}
            <div
                className={`fixed top-0 right-0 w-full md:w-96 bg-white h-full shadow-2xl transition-transform duration-500 z-50 transform ${isOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
            >
                <div className="flex justify-between items-center p-4 border-b bg-primary-dark text-white">
                    <h2 className="text-xl font-bold">Chat dengan Penjual</h2>
                    <button onClick={onClose} className="hover:text-tertiary">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                </div>

                {/* Isi Chat */}
                <div className="flex flex-col h-[calc(100%-60px)]">

                    {/* Area Pesan */}
                    <div className="flex-grow p-4 space-y-4 overflow-y-auto bg-lightgray">
                        {messages.length === 0 ? (
                            <p className="text-center text-gray-500 mt-10">Mulai percakapan baru.</p>
                        ) : (
                            messages.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={`flex ${msg.senderId === currentUserId ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div className={`max-w-[75%] p-3 rounded-xl ${msg.senderId === currentUserId ? 'bg-primary-dark text-white rounded-br-none' : 'bg-white text-darkgray rounded-bl-none shadow'
                                        }`}>
                                        {msg.content}
                                    </div>
                                </div>
                            ))
                        )}
                        <div ref={chatEndRef} /> {/* Untuk Auto-scroll */}
                    </div>

                    {/* Form Input */}
                    <form onSubmit={handleSend} className="p-4 border-t bg-white flex space-x-2">
                        <input
                            type="text"
                            value={messageInput}
                            onChange={(e) => setMessageInput(e.target.value)}
                            placeholder="Tulis pesan..."
                            className="flex-grow p-3 border rounded-lg focus:ring-primary-dark focus:border-primary-dark text-darkgray"
                            required
                        />
                        <button
                            type="submit"
                            className="bg-primary-dark text-white p-3 rounded-lg hover:bg-primary transition"
                        >
                            Kirim
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}