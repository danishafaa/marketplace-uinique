/** @type {import('next').NextConfig} */
const nextConfig = {
  // Konfigurasi untuk gambar eksternal
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.supabase.co', // Tetap pertahankan konfigurasi Supabase Anda
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
      {
        protocol: 'https',
        hostname: 'www.gstatic.com', // TAMBAHKAN INI: Perbaikan error login
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com', // TAMBAHKAN INI: Untuk foto profil Google
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;