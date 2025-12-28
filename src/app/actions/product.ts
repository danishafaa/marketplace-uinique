// src/app/actions/product.ts
'use server';

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function addProduct(formData: FormData) {
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const category = formData.get("category") as string;
    const stock = Number(formData.get("stock"));

    // Perbaikan pengambilan data harga sesuai form baru
    const originalPrice = Number(formData.get("originalPrice")); // Harga Coret
    const price = Number(formData.get("price")); // Harga Final (After Discount)

    // Ambil data toggle (nilainya "true" atau "false" string)
    const isPreOrder = formData.get("preOrder") === "true";
    // const isDiscount = formData.get("isDiscount") === "true"; // Bisa disimpan jika perlu

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
                storeId: store.id,
                imageUrl: "/products/placeholder.jpg",
                // Anda mungkin perlu menambahkan kolom 'isPreOrder' boolean di schema.prisma nanti
            }
        });
    } catch (error) {
        console.error("Gagal tambah produk:", error);
        return { success: false, message: "Gagal menyimpan ke database" };
    }

    revalidatePath("/");
    redirect("/");
}