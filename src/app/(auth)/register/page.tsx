// src/app/(auth)/register/page.tsx
"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { registerUser } from '@/app/actions/auth'; // Import mesinnya

const RegisterPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    // Kita gunakan client-side handling untuk menampilkan loading state
    const clientAction = async (formData: FormData) => {
        setIsLoading(true);
        setErrorMessage("");

        const result = await registerUser(formData);

        // Jika ada error (misal email sudah terdaftar)
        if (result?.success === false) {
            setErrorMessage(result.message);
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#002d4b] flex items-center justify-center p-4 font-sans">
            <div className="bg-white w-full max-w-5xl rounded-[40px] shadow-2xl overflow-hidden flex flex-col md:flex-row-reverse min-h-[550px]">

                {/* Sisi Kanan: Welcome Message */}
                <div className="w-full md:w-1/2 p-12 flex flex-col justify-center items-center text-center space-y-8 bg-white">
                    <h1 className="text-5xl md:text-6xl font-black text-[#002d4b] tracking-tight">
                        Hello, Welcome!
                    </h1>
                    <div className="space-y-4">
                        <p className="text-[#002d4b] text-lg font-medium">Already have an account?</p>
                        <Link href="/login">
                            <button className="bg-[#002d4b] text-white px-12 py-3 rounded-xl text-lg font-bold hover:bg-[#00365a] transition-all transform hover:scale-105 shadow-lg uppercase">
                                Log In
                            </button>
                        </Link>
                    </div>
                </div>

                {/* Sisi Kiri: Register Form */}
                <div className="w-full md:w-1/2 p-12 flex flex-col justify-center bg-white border-r md:border-gray-100">
                    <div className="max-w-md mx-auto w-full space-y-6">
                        <h2 className="text-3xl font-bold text-[#002d4b] mb-4">Create Account</h2>

                        {/* Tampilkan error jika pendaftaran gagal */}
                        {errorMessage && <p className="text-red-500 text-xs font-bold bg-red-50 p-3 rounded-lg">{errorMessage}</p>}

                        <form action={clientAction} className="space-y-4">
                            {/* Input Full Name (Gunakan name="fullName" agar terbaca di action) */}
                            <div className="relative">
                                <input
                                    name="fullName"
                                    type="text"
                                    placeholder="Full Name"
                                    required
                                    className="w-full bg-[#d9d9d9] border-none rounded-xl py-4 px-6 pr-12 text-gray-700 focus:ring-2 focus:ring-[#002d4b] outline-none transition-all placeholder:text-gray-500"
                                />
                                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                                    </svg>
                                </div>
                            </div>

                            {/* Input Email (Gunakan name="email") */}
                            <div className="relative">
                                <input
                                    name="email"
                                    type="email"
                                    placeholder="Email Address"
                                    required
                                    className="w-full bg-[#d9d9d9] border-none rounded-xl py-4 px-6 pr-12 text-gray-700 focus:ring-2 focus:ring-[#002d4b] outline-none transition-all placeholder:text-gray-500"
                                />
                                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                                    </svg>
                                </div>
                            </div>

                            {/* Input Password (Gunakan name="password") */}
                            <div className="relative">
                                <input
                                    name="password"
                                    type="password"
                                    placeholder="Password"
                                    required
                                    className="w-full bg-[#d9d9d9] border-none rounded-xl py-4 px-6 pr-12 text-gray-700 focus:ring-2 focus:ring-[#002d4b] outline-none transition-all placeholder:text-gray-500"
                                />
                                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
                                    </svg>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-[#002d4b] text-white py-4 rounded-xl text-xl font-bold hover:bg-[#00365a] transition-all shadow-md mt-4 uppercase disabled:bg-gray-400"
                            >
                                {isLoading ? "Creating Account..." : "Sign Up"}
                            </button>
                        </form>

                        <div className="relative flex items-center py-2">
                            <div className="flex-grow border-t border-gray-300"></div>
                            <span className="flex-shrink mx-4 text-gray-500 text-sm font-medium">OR</span>
                            <div className="flex-grow border-t border-gray-300"></div>
                        </div>

                        <button type="button" className="w-full bg-[#d9d9d9] text-[#555] py-4 rounded-xl flex items-center justify-center gap-3 font-bold hover:bg-gray-300 transition-all uppercase tracking-wider text-sm">
                            <Image
                                src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png"
                                alt="Google" width={24} height={24} className="w-6 h-6"
                            />
                            Sign Up with Google
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;