'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import NextLink from 'next/link';
import { User, Bell, ClipboardList, Ticket, LucideIcon } from "lucide-react";

export default function ProfileClient({ initialProfile }: { initialProfile: any }) {
    // 1. State untuk menampung ketikan user
    const [formData, setFormData] = useState({
        username: initialProfile?.username || "uinique_user",
        name: initialProfile?.name || "",
        phoneNumber: initialProfile?.phoneNumber || "",
        shopName: initialProfile?.shopName || "",
        gender: initialProfile?.gender || "Male",
        dateOfBirth: initialProfile?.dateOfBirth ? new Date(initialProfile.dateOfBirth).toISOString().split('T')[0] : "",
    });

    const [avatarPreview, setAvatarPreview] = useState(initialProfile?.avatarUrl || "/placeholder-user.png");
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Fungsi handle ketikan
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Fungsi pilih gambar
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => setAvatarPreview(reader.result as string);
        reader.readAsDataURL(file);
      }
    };

    return (
        <div className="bg-[#f2f7fa] min-h-screen py-10 px-4 font-sans">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
                
                {/* SIDEBAR (Sama seperti desainmu) */}
                <aside className="w-full md:w-64 space-y-6">
                    <div className="flex flex-col items-center">
                        <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-sm mb-4">
                            <Image src={avatarPreview} alt="Avatar" fill className="object-cover" />
                        </div>
                        <NextLink href="/seller/add-product" className="w-full">
                            <button className="w-full bg-[#002B45] text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2">
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

                {/* MAIN CONTENT CARD */}
                <div className="flex-1 bg-white rounded-[40px] shadow-sm p-8 md:p-12 border border-gray-50">
                    <h1 className="text-xl font-bold text-[#002b45] border-b pb-4 mb-10">My Profile</h1>

                    <div className="flex flex-col lg:flex-row gap-12">
                        {/* FORM FIELDS */}
                        <div className="flex-1 space-y-6">
                            {/* USERNAME SEKARANG BISA DIKETIK */}
                            <ProfileField label="Username" name="username" value={formData.username} onChange={handleChange} isInput />
                            <ProfileField label="Name" name="name" value={formData.name} onChange={handleChange} isInput />
                            <ProfileField label="Email" value={initialProfile?.email || ""} />
                            <ProfileField label="Phone Number" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} isInput />
                            <ProfileField label="Shop Name" name="shopName" value={formData.shopName} onChange={handleChange} isInput />

                            {/* GENDER & SAVE BUTTON */}
                            <div className="pt-6">
                                <button className="bg-[#002b45] text-white px-10 py-2.5 rounded-full font-bold text-sm shadow-lg">
                                    Save Changes
                                </button>
                            </div>
                        </div>

                        {/* AVATAR SELECTOR */}
                        <div className="w-full lg:w-72 flex flex-col items-center border-l lg:pl-12 border-gray-100">
                            <div className="relative w-40 h-40 rounded-full overflow-hidden mb-6 shadow-md border-2 border-gray-100">
                                <Image src={avatarPreview} alt="Avatar Large" fill className="object-cover" />
                            </div>
                            
                            {/* Hidden Input File */}
                            <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageChange} />
                            
                            <button 
                                onClick={() => fileInputRef.current?.click()} // MEMICU KLIK
                                className="border border-gray-300 px-6 py-2 rounded-lg text-sm font-medium hover:bg-gray-50"
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

// Sub-komponen (Pindahkan ke bawah atau file terpisah)
function SidebarItem({ icon: Icon, label, active = false }: any) {
    return (
        <div className={`flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer ${active ? 'text-[#002b45]' : 'text-gray-500'}`}>
            <Icon size={18} />
            <span className={`text-sm ${active ? 'font-bold' : 'font-medium'}`}>{label}</span>
        </div>
    );
}

function ProfileField({ label, name, value, onChange, isInput = false }: any) {
    return (
        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-8">
            <span className="text-sm text-gray-500 w-32">{label}</span>
            {isInput ? (
                <input
                    type="text"
                    name={name}
                    value={value}
                    onChange={onChange}
                    className="flex-1 border border-gray-300 rounded-full px-5 py-2 text-sm outline-none focus:ring-1 focus:ring-[#002b45]"
                />
            ) : (
                <span className="text-sm font-medium text-gray-800">{value}</span>
            )}
        </div>
    );
}