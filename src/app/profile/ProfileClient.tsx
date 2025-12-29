"use client";

import { useState, useRef } from "react";
import Image from "next/image";

export default function ProfileClient({ user }: { user: any }) {
  // 1. State untuk semua input
  const [formData, setFormData] = useState({
    username: user?.username || "uinique_user",
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    shopName: user?.shopName || "",
    gender: user?.gender || "",
    dob: user?.dob || "",
  });

  // 2. State untuk Preview Gambar
  const [imagePreview, setImagePreview] = useState(user?.image || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fungsi memicu jendela pilih file
  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  // Fungsi menangani perubahan gambar
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-white rounded-[2rem] p-12 shadow-sm border border-gray-50 flex flex-col md:flex-row gap-16">
      {/* SISI KIRI: Form Input */}
      <div className="flex-1 space-y-8">
        <h2 className="text-2xl font-black mb-10">My Profile</h2>
        
        {/* Username Field - Sekarang Bisa Diketik! */}
        <div className="flex items-center">
          <label className="w-40 text-gray-500 font-medium">Username</label>
          <input 
            type="text"
            className="flex-grow p-3 rounded-xl border border-gray-200 focus:outline-[#002B45]"
            value={formData.username}
            onChange={(e) => setFormData({...formData, username: e.target.value})}
          />
        </div>

        {/* Name Field */}
        <div className="flex items-center">
          <label className="w-40 text-gray-500 font-medium">Name</label>
          <input 
            type="text"
            className="flex-grow p-3 rounded-xl border border-gray-200 focus:outline-[#002B45]"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
          />
        </div>

        {/* ... field lainnya seperti Email, Phone, dll ... */}

        <button className="bg-[#002B45] text-white px-10 py-3 rounded-xl font-bold mt-10 hover:opacity-90 transition">
          Save Changes
        </button>
      </div>

      {/* SISI KANAN: Avatar & Select Image */}
      <div className="w-full md:w-80 flex flex-col items-center gap-6 border-l border-gray-50 pl-16">
        <div className="relative w-48 h-48 rounded-full border-4 border-gray-50 overflow-hidden bg-gray-100">
          {imagePreview ? (
            <img src={imagePreview} className="w-full h-full object-cover" alt="Avatar" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-300">Avatar Large</div>
          )}
        </div>

        {/* Input File Tersembunyi */}
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleImageChange} 
          className="hidden" 
          accept="image/*"
        />

        <button 
          onClick={handleImageClick}
          className="px-6 py-2 border-2 border-gray-200 rounded-xl font-bold text-gray-400 hover:bg-gray-50 transition"
        >
          Select Image
        </button>
      </div>
    </div>
  );
}