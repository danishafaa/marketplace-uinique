'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import NextLink from 'next/link';
import { User, Bell, ClipboardList, Ticket } from "lucide-react";
import { updateProfile } from '@/app/actions/profile';
import { createSupabaseClient } from "@/utils/supabase/client";

export default function ProfileClient({ initialProfile }: { initialProfile: any }) {
    const supabase = createSupabaseClient();
    const [loading, setLoading] = useState(false);
    const [imageFile, setImageFile] = useState<File | null>(null); // 2. Simpan file asli di sini
    
    const [formData, setFormData] = useState({
        username: initialProfile?.username || "",
        name: initialProfile?.name || "",
        phoneNumber: initialProfile?.phoneNumber || "",
        shopName: initialProfile?.shopName || "",
        gender: initialProfile?.gender || "Male",
        dateOfBirth: initialProfile?.dateOfBirth ? new Date(initialProfile.dateOfBirth).toISOString().split('T')[0] : "",
    });

    const [avatarPreview, setAvatarPreview] = useState(initialProfile?.avatarUrl || "/placeholder-user.png");
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // 3. Update fungsi handleImageChange untuk menangkap file asli
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        setImageFile(file); // Simpan file untuk di-upload nanti
        const reader = new FileReader();
        reader.onloadend = () => setAvatarPreview(reader.result as string);
        reader.readAsDataURL(file);
      }
    };

    const handleSave = async () => {
        setLoading(true);
        let finalAvatarUrl = avatarPreview;

        try {
            // 4. Logika Upload Gambar ke Supabase Storage
            if (imageFile) {
                const fileExt = imageFile.name.split('.').pop();
                const fileName = `${initialProfile.id}-${Date.now()}.${fileExt}`;
                const filePath = `avatars/${fileName}`;

                // Upload ke bucket 'user-content' (Pastikan bucket ini sudah dibuat di Supabase)
                const { error: uploadError } = await supabase.storage
                    .from('user-content')
                    .upload(filePath, imageFile);

                if (uploadError) throw uploadError;

                // Ambil Public URL setelah berhasil upload
                const { data } = supabase.storage.from('user-content').getPublicUrl(filePath);
                finalAvatarUrl = data.publicUrl;
            }

            // 5. Panggil Server Action dengan menyertakan URL gambar baru
            const result = await updateProfile(initialProfile.id, {
                ...formData,
                avatarUrl: finalAvatarUrl
            });

            if (result.success) {
                alert("Profile updated successfully!");
                setImageFile(null); // Reset file state
            } else {
                alert("Failed to update profile database.");
            }
        } catch (error: any) {
            console.error("Error:", error);
            alert("Error: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-[#f2f7fa] min-h-screen py-10 px-4 font-sans text-black">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
                
                {/* SIDEBAR */}
                <aside className="w-full md:w-64 space-y-6">
                    <div className="flex flex-col items-center">
                        <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-sm mb-4">
                            <Image src={avatarPreview} alt="Avatar" fill className="object-cover" />
                        </div>
                        <NextLink href="/seller/add-product" className="w-full">
                            <button className="w-full bg-[#002B45] text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:opacity-90 transition">
                                <span>🛍️</span> Start Selling
                            </button>
                        </NextLink>
                    </div>
                    <nav className="space-y-1">
                        <SidebarItem icon={User} label="My Account" active />
                        <SidebarItem icon={ClipboardList} label="My orders" />
                        <SidebarItem icon={Bell} label="Notifications" />
                        <SidebarItem icon={Ticket} label="My Vouchers" />
                    </nav>
                </aside>

                {/* MAIN CARD */}
                <div className="flex-1 bg-white rounded-[40px] shadow-sm p-8 md:p-12 border border-gray-50">
                    <h1 className="text-2xl font-black text-[#002b45] border-b pb-6 mb-10">My Profile</h1>

                    <div className="flex flex-col lg:flex-row gap-16">
                        <div className="flex-1 space-y-8">
                            <ProfileField label="Username" name="username" value={formData.username} onChange={handleChange} isInput />
                            <ProfileField label="Name" name="name" value={formData.name} onChange={handleChange} isInput />
                            <ProfileField label="Email" value={initialProfile?.email || ""} />
                            <ProfileField label="Phone Number" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} isInput />
                            <ProfileField label="Shop Name" name="shopName" value={formData.shopName} onChange={handleChange} isInput />

                            {/* GENDER */}
                            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-8">
                                <span className="text-base font-bold text-gray-700 w-32">Gender</span>
                                <div className="flex gap-6">
                                    <label className="flex items-center gap-2 cursor-pointer font-bold text-black">
                                        <input type="radio" name="gender" value="Male" checked={formData.gender === "Male"} onChange={handleChange} className="w-4 h-4 accent-[#002b45]" /> Male
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer font-bold text-black">
                                        <input type="radio" name="gender" value="Female" checked={formData.gender === "Female"} onChange={handleChange} className="w-4 h-4 accent-[#002b45]" /> Female
                                    </label>
                                </div>
                            </div>

                            {/* DOB */}
                            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-8">
                                <span className="text-base font-bold text-gray-700 w-32">Date of Birth</span>
                                <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} className="flex-1 border-2 border-gray-200 rounded-2xl px-5 py-3 text-black font-bold focus:border-[#002b45] outline-none" />
                            </div>

                            <div className="pt-10">
                                <button 
                                    onClick={handleSave}
                                    disabled={loading}
                                    className="bg-[#002b45] text-white px-12 py-3 rounded-2xl font-black text-lg shadow-xl hover:bg-[#00365a] transition disabled:bg-gray-400"
                                >
                                    {loading ? "Saving..." : "Save Changes"}
                                </button>
                            </div>
                        </div>

                        {/* AVATAR SELECTOR */}
                        <div className="w-full lg:w-80 flex flex-col items-center border-l lg:pl-16 border-gray-50">
                            <div className="relative w-48 h-48 rounded-full overflow-hidden mb-8 shadow-xl border-4 border-gray-50 bg-gray-50">
                                <Image src={avatarPreview} alt="Avatar Preview" fill className="object-cover" />
                            </div>
                            <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageChange} />
                            <button 
                                onClick={() => fileInputRef.current?.click()}
                                className="border-2 border-gray-200 px-8 py-2.5 rounded-2xl text-base font-black text-gray-500 hover:bg-gray-50 transition"
                            >
                                Select Image
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// ... SidebarItem dan ProfileField tetap sama seperti kode Anda sebelumnya ...
function SidebarItem({ icon: Icon, label, active = false }: any) {
    return (
        <div className={`flex items-center gap-4 px-5 py-3 rounded-xl cursor-pointer transition ${active ? 'bg-white shadow-sm text-[#002b45]' : 'text-gray-500 hover:bg-gray-100'}`}>
            <Icon size={20} />
            <span className={`text-base ${active ? 'font-black' : 'font-bold'}`}>{label}</span>
        </div>
    );
}

function ProfileField({ label, name, value, onChange, isInput = false }: any) {
    return (
        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-8">
            <span className="text-base font-bold text-gray-700 w-32">{label}</span>
            {isInput ? (
                <input
                    type="text"
                    name={name}
                    value={value}
                    onChange={onChange}
                    className="flex-1 border-2 border-gray-200 rounded-2xl px-6 py-3 text-black font-bold outline-none focus:border-[#002b45] transition"
                />
            ) : (
                <span className="text-base font-black text-black">{value}</span>
            )}
        </div>
    );
}