/** @type {import('next').NextConfig} */
const nextConfig = {
  // Konfigurasi untuk gambar eksternal
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.supabase.co', // Mengizinkan semua subdomain Supabase
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
      // Anda juga bisa menggunakan hostname spesifik Anda, misalnya:
      // hostname: 'rhksbyflvnkjtxnohvtb.supabase.co',
    ],
  },
};

module.exports = nextConfig;