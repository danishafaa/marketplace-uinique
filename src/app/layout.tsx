import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from '@/components/Header';
import Footer from '@/components/Footer'; // 1. Import Footer yang baru dibuat

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "UINIQUE - Marketplace Mahasiswa UIN Jakarta",
  description: "Platform produk kreatif dan inovatif mahasiswa UIN Syarif Hidayatullah Jakarta",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        {/* 2. Header Global: Hanya diletakkan di sini agar tidak dobel */}
        <Header />

        {/* 3. Main Content: flex-grow memastikan footer terdorong ke bawah jika konten sedikit */}
        <main className="flex-grow">
          {children}
        </main>

        {/* 4. Footer Global: Akan muncul di bagian paling bawah semua halaman */}
        <Footer />
      </body>
    </html>
  );
}