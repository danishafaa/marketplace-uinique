"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateProfile(userId: string, formData: any) {
  try {
    await prisma.profile.update({
      where: { id: userId },
      data: {
        username: formData.username,
        name: formData.name,
        phoneNumber: formData.phoneNumber,
        shopName: formData.shopName,
        gender: formData.gender,
        dateOfBirth: formData.dateOfBirth ? new Date(formData.dateOfBirth) : null,
        // avatarUrl: formData.avatarUrl, // Opsional: jika sudah ada upload foto
      },
    });
    revalidatePath("/profile");
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
}