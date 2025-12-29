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
  count: 0,
  setCount: (num) => set({ count: num }),
  updateCount: async () => {
    // Ambil data langsung dari server action
    const newCount = await getCartCount();
    console.log("STORE DEBUG: Angka baru dari DB adalah:", newCount); 
    // Pastikan angka di-set ke state
    set({ count: Number(newCount) });
  },
}));