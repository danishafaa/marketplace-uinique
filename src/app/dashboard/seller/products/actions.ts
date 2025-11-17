'use server';

import { createSupabaseServerClient } from '@/utils/supabase/server';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import type { SupabaseClient } from '@supabase/supabase-js';

// Interface untuk data produk (sesuai form)
interface ProductForm {
    name: string;
    description: string;
    price: string; // Ambil sebagai string, konversi ke Int
}

// --- Fungsi Helper untuk Otorisasi ---
async function getSellerProfile(supabase: SupabaseClient) {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) throw new Error('NOT_AUTHENTICATED');

    // Ambil profile dan storeId milik user yang login
    const profile = await prisma.profile.findUnique({
        where: { id: session.user.id },
        include: { store: true },
    });

    if (!profile || !profile.isSeller || !profile.store) {
        throw new Error('NOT_SELLER');
    }
    return { userId: session.user.id, storeId: profile.store.id };
}

// --- FUNGSI CREATE (C) ---
export async function createProduct(formData: FormData) {
    const supabase = await createSupabaseServerClient(); // ✅ Tambahkan await
    const file = formData.get('imageFile') as File;
    const data: ProductForm = {
        name: formData.get('name') as string,
        description: formData.get('description') as string,
        price: formData.get('price') as string,
    };

    try {
        const { storeId } = await getSellerProfile(supabase); // Otorisasi

        // 1. UPLOAD FILE ke Supabase Storage
        const path = `products/${storeId}/${Date.now()}_${file.name}`;
        const { data: uploadData, error: uploadError } = await supabase.storage
            .from('product-images') // Ganti dengan nama bucket Anda
            .upload(path, file);

        if (uploadError) throw new Error(uploadError.message);

        // 2. AMBIL URL PUBLIK
        const { data: { publicUrl } } = supabase.storage
            .from('product-images')
            .getPublicUrl(uploadData.path);

        // 3. SIMPAN DATA PRODUK ke PostgreSQL (Prisma)
        await prisma.product.create({
            data: {
                ...data,
                price: parseInt(data.price), // Konversi harga ke Integer
                imageUrl: publicUrl,
                storeId: storeId,
            },
        });

        revalidatePath('/dashboard/seller/products'); // Refresh cache Next.js
        revalidatePath('/'); // <-- TAMBAHKAN INI (Membersihkan cache Halaman Utama)
        return { success: true };
    } catch (error: unknown) {
        console.error("Create Product Error:", error);
        if (error instanceof Error) {
            return { success: false, message: error.message };
        }
        return { success: false, message: 'Terjadi kesalahan tidak diketahui' };
    }
}

// --- FUNGSI DELETE (D) ---
// Di actions.ts - ubah function deleteProduct
export async function deleteProduct(productId: string): Promise<void> {
    const supabase = await createSupabaseServerClient();

    try {
        const { storeId } = await getSellerProfile(supabase);

        const product = await prisma.product.findUnique({ where: { id: productId } });

        if (!product || product.storeId !== storeId) {
            throw new Error("NOT_AUTHORIZED");
        }

        await prisma.product.delete({ where: { id: productId } });

        if (product.imageUrl) {
            const urlParts = product.imageUrl.split('/');
            const fileName = urlParts[urlParts.length - 1];
            const filePath = `products/${storeId}/${fileName}`;

            await supabase.storage
                .from('product-images')
                .remove([filePath]);
        }

        revalidatePath('/dashboard/seller/products');
        revalidatePath('/'); // <-- TAMBAHKAN INI JUGA
        // ✅ Tidak return value, hanya void
    } catch (error: unknown) {
        console.error("Delete Product Error:", error);
        throw error; // ✅ Lempar error untuk ditangani oleh form
    }
}