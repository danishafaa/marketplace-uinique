// src/app/actions/product.ts
'use server';

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function addProduct(formData: FormData) {
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const category = formData.get("category") as string;
    const stock = Number(formData.get("stock")); // Ambil data stok
    const originalPrice = Number(formData.get("price"));
    const price = Number(formData.get("discountPrice"));

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
                stock, // Simpan ke database
                storeId: store.id,
                imageUrl: "/products/placeholder.jpg",
            }
        });
    } catch (error) {
        console.error("Gagal tambah produk:", error);
        return { success: false, message: "Gagal menyimpan ke database" };
    }

    revalidatePath("/");
    redirect("/");
}