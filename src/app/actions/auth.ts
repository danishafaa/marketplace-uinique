// src/app/actions/auth.ts
"use server";

import { createSupabaseServerClient } from "@/utils/supabase/server";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

// Fungsi untuk Pendaftaran (Register)
export async function registerUser(formData: FormData) {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const fullName = formData.get("fullName") as string; // PERUBAHAN: Ambil Nama Lengkap dari Form

    const supabase = await createSupabaseServerClient();

    // 1. Daftar ke Supabase Auth
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
    });

    if (error) return { success: false, message: error.message };

    if (data.user) {
        // 2. Simpan ke Database Prisma (Profile) 
        // Menggunakan data fullName agar sesuai desain My Profile
        await prisma.profile.create({
            data: {
                id: data.user.id,
                email: email,
                name: fullName, // PERUBAHAN: Gunakan nama asli dari input user
                username: email.split("@")[0], // Username default dari email
            },
        });
    }

    return redirect("/profile");
}

// Fungsi untuk Masuk (Login)
export async function loginUser(formData: FormData) {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = await createSupabaseServerClient();

    const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) return { success: false, message: error.message };

    // Setelah login berhasil, arahkan ke halaman profile
    return redirect("/profile");
}