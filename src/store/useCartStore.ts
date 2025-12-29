// src/store/useCartStore.ts
import { create } from 'zustand';
import { getCartCount } from '@/app/actions/cart'; // Memanggil fungsi dari Langkah 1

// 1. Definisi "Bentuk" data kita
interface CartState {
  count: number;                       // Angka yang muncul di keranjang
  setCount: (num: number) => void;     // Fungsi untuk ganti angka secara manual
  updateCount: () => Promise<void>;    // Fungsi "Sakti" untuk ambil data terbaru dari database
}

// 2. Buat Store (Papan Pengumumannya)
export const useCartStore = create<CartState>((set) => ({
  count: 0, // Awalnya angka keranjang adalah 0

  // Fungsi untuk menset angka secara langsung
  setCount: (num) => set({ count: num }),

  // Fungsi paling penting: Ambil data terbaru dari server
  updateCount: async () => {
    try {
      const newCount = await getCartCount(); // Memanggil fungsi yang pakai 'buyerId' tadi
      set({ count: Number(newCount) });      // Update angka di papan pengumuman
    } catch (error) {
      console.error("Gagal update angka keranjang di store:", error);
    }
  },
}));