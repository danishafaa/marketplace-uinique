// src/app/actions/product.ts
'use server';

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function addProduct(formData: FormData) {
    // 1. Ambil Informasi Toko & Produk Dasar
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const storePhone = formData.get("storePhone") as string;
    const storeAddress = formData.get("storeAddress") as string;
    const category = formData.get("category") as string;

    // 2. Ambil Spesifikasi Produk
    const shelfLife = formData.get("shelfLife") as string;
    const weight = formData.get("weight") as string;
    const flavor = formData.get("flavor") as string;
    const brand = formData.get("brand") as string;
    const packagingType = formData.get("packagingType") as string;
    const servingInstructions = formData.get("servingInstructions") as string;

    // 3. Ambil Detail Harga & Stok (Konversi ke Number)
    const originalPrice = Number(formData.get("originalPrice")); // Price (Before Discount)
    const price = Number(formData.get("price")); // Price After Discount
    const stock = Number(formData.get("stock"));
    const minOrder = Number(formData.get("minOrder")) || 1;

    // 4. Ambil Status Toggle (Konversi string "true"/"false" ke Boolean)
    const isPreOrder = formData.get("isPreOrder") === "true";
    const isDiscount = formData.get("isDiscount") === "true";

    // Cari toko (Sementara ambil yang pertama, idealnya dari session user)
    const store = await prisma.store.findFirst();
    if (!store) return { success: false, message: "Store tidak ditemukan" };

    try {
        await prisma.product.create({
            data: {
                name,
                description,
                price,
                originalPrice,
                category,
                stock,
                // Masukkan field baru sesuai desain Gambar 4
                storePhone,
                storeAddress,
                shelfLife,
                weight,
                flavor,
                brand,
                packagingType,
                servingInstructions,
                minOrder,
                isPreOrder,
                isDiscount,
                storeId: store.id,
                imageUrl: "/products/placeholder.jpg", // Nanti bisa diganti dengan upload asli
            }
        });
    } catch (error) {
        console.error("Gagal tambah produk:", error);
        return { success: false, message: "Gagal menyimpan ke database. Pastikan npx prisma db push sudah dijalankan." };
    }

    // Refresh halaman kategori dan homepage agar produk baru muncul
    revalidatePath("/");
    revalidatePath("/food");
    revalidatePath("/drink");

    // Kembali ke homepage setelah sukses
    redirect("/");
}