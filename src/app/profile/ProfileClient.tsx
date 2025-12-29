"use client";

import { useState, useRef, ChangeEvent } from "react";
import Image from "next/image";

export default function ProfileClient({ user }: { user: any }) {
  // 1. Inisialisasi State Form
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
  const [imagePreview, setImagePreview] = useState<string | null>(user?.image || null);
  
  // 3. Ref untuk memicu input file tersembunyi
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fungsi untuk menangani perubahan teks di semua input
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Fungsi memicu jendela pilih file saat tombol diklik
  const handleSelectImageClick = () => {
    fileInputRef.current?.click();
  };

  // Fungsi memproses gambar yang dipilih
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
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
      
      {/* SISI KIRI: FORM INPUT */}
      <div className="flex-1 space-y-8">
        <h2 className="text-2xl font-black mb-10 text-[#002B45]">My Profile</h2>
        
        {/* Username - Pastikan atribut 'name' sesuai dengan state */}
        <div className="flex items-center">
          <label className="w-40 text-gray-400 font-bold">Username</label>
          <input 
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            className="flex-grow p-4 rounded-2xl border border-gray-100 focus:outline-none focus:border-[#002B45] font-semibold text-gray-700"
          />
        </div>

        {/* Name */}
        <div className="flex items-center">
          <label className="w-40 text-gray-400 font-bold">Name</label>
          <input 
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Enter your name"
            className="flex-grow p-4 rounded-2xl border border-gray-100 focus:outline-none focus:border-[#002B45] font-semibold text-gray-700"
          />
        </div>

        {/* Email - Biasanya ReadOnly karena dari Auth */}
        <div className="flex items-center">
          <label className="w-40 text-gray-400 font-bold">Email</label>
          <input 
            type="email"
            value={formData.email}
            readOnly
            className="flex-grow p-4 rounded-2xl border border-gray-50 bg-gray-50 text-gray-400 font-semibold cursor-not-allowed"
          />
        </div>

        {/* Tambahkan field lainnya (Phone, Shop Name, dll) dengan pola yang sama */}

        <button className="bg-[#002B45] text-white px-12 py-4 rounded-[1.5rem] font-black text-lg mt-10 hover:opacity-90 transition shadow-lg shadow-blue-100">
          Save Changes
        </button>
      </div>

      {/* SISI KANAN: AVATAR & UPLOAD */}
      <div className="w-full md:w-96 flex flex-col items-center gap-8 border-l border-gray-50 pl-16">
        <div className="relative w-56 h-56 rounded-full border-8 border-gray-50 overflow-hidden bg-[#F8F9FA] flex items-center justify-center">
          {imagePreview ? (
            <img src={imagePreview} className="w-full h-full object-cover" alt="Profile Preview" />
          ) : (
            <span className="text-gray-300 font-bold">Avatar Large</span>
          )}
        </div>

        {/* Hidden File Input */}
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleImageChange} 
          className="hidden" 
          accept="image/*"
        />

        <button 
          onClick={handleSelectImageClick}
          className="px-8 py-3 border-2 border-gray-100 rounded-2xl font-black text-gray-400 hover:bg-gray-50 transition"
        >
          Select Image
        </button>
      </div>

    </div>
  );
}