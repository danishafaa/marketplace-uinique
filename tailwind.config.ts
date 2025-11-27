// tailwind.config.ts

import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        './src/**/*.{js,ts,jsx,tsx,mdx}', // Pastikan ini mencakup semua file Anda
    ],
    theme: {
        extend: {
            colors: {
                // --- Custom Color Palette untuk UINIQUE ---
                primary: {
                    light: '#CCEEFF', // Sedikit lebih terang dari primer Anda
                    DEFAULT: '#99DFFF', // Biru Langit (Paling Atas di Palette)
                    dark: '#66D1FF',   // Biru Sedang (Kedua dari atas, cocok untuk hover/aksen)
                },
                secondary: '#FFFFFF', // Putih
                tertiary: {
                    DEFAULT: '#FFDD99', // Kuning/Orange Muda (Paling Bawah di Palette)
                    dark: '#FFCC66', // Sedikit lebih gelap untuk aksen
                },
                // Anda bisa menambahkan warna lain jika dibutuhkan, misalnya text-color
                darkgray: '#333333',
                lightgray: '#F8F8F8', // Untuk background area tertentu
            },
            // Hapus atau modifikasi jika ada backgroundImage atau lainnya yang tidak relevan
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic':
                    'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            },
        },
    },
    plugins: [],
};
export default config;