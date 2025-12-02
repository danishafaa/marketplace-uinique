// src/app/(auth)/login/page.tsx

'use client'

import { useState } from 'react'
import { createSupabaseClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation' // 1. IMPORT ROUTER

export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')
    const router = useRouter() // 2. INISIALISASI ROUTER

    const handleSignUp = async () => {
        const supabase = createSupabaseClient(); // Inisialisasi di dalam handler
        setMessage('Processing...')
        const { error } = await supabase.auth.signUp({
            email,
            password,
        })

        if (error) {
            setMessage(error.message)
        } else {
            setMessage('Success! Check your email for confirmation. Redirecting to login...')
            router.push('/login') // OPsional: redirect ke login setelah daftar
        }
    }

    const handleSignIn = async () => {
        const supabase = createSupabaseClient();
        setMessage('Processing...')
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })

        if (error) {
            setMessage(error.message)
        } else {
            setMessage('Signed in successfully! Redirecting...')

            // PERBAIKAN: Arahkan ke Dashboard Hub utama, BUKAN langsung ke Seller Setup
            router.push('/dashboard')
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-3xl font-bold mb-6">Marketplace Login/Signup</h1>
            <div className="w-full max-w-md bg-white p-8 shadow-md rounded-lg">
                {message && (
                    <p
                        // Perbaikan kecil: Logika warna pesan
                        className={`text-sm mb-4 ${message.includes('Error') || message.includes('failed') ? 'text-red-500' : 'text-green-500'}`}
                    >
                        {message}
                    </p>
                )}
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 mb-4 border rounded text-black" // Tambahkan text-black
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-3 mb-6 border rounded text-black" // Tambahkan text-black
                />
                <div className="flex justify-between space-x-4">
                    <button
                        onClick={handleSignIn}
                        className="flex-1 bg-green-500 text-white p-3 rounded hover:bg-green-600 transition"
                    >
                        Sign In
                    </button>
                    <button
                        onClick={handleSignUp}
                        className="flex-1 bg-blue-500 text-white p-3 rounded hover:bg-blue-600 transition"
                    >
                        Sign Up
                    </button>
                </div>
            </div>
        </div>
    )
}