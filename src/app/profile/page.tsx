// src/app/profile/page.tsx
import { createSupabaseServerClient } from "@/utils/supabase/server";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import ProfileClient from "./ProfileClient"; // Kita akan buat file ini

export default async function ProfilePage() {
    const supabase = await createSupabaseServerClient();
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) redirect("/login");

    const profile = await prisma.profile.findUnique({
        where: { id: session.user.id }
    });

    // Lempar data profile ke komponen Client agar bisa diedit
    return <ProfileClient initialProfile={profile} />;
}