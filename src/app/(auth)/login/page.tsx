// src/app/(auth)/login/page.tsx

'use client'

import { useState } from 'react'
import { createSupabaseClient } from '@/utils/supabase/client' // Gunakan helper client Anda

export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')

    const supabase = createSupabaseClient()

    const handleSignUp = async () => {
        setMessage('Processing...')
        const { error } = await supabase.auth.signUp({
            email,
            password,
        })

        if (error) {
            setMessage(error.message)
        } else {
            setMessage('Success! Check your email for confirmation.')
        }
    }

    const handleSignIn = async () => {
        setMessage('Processing...')
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })

        if (error) {
            setMessage(error.message)
        } else {
            setMessage('Signed in successfully! Redirecting...')
            // Di sini Anda bisa menambahkan redirect ke halaman /dashboard
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-3xl font-bold mb-6">Marketplace Login/Signup</h1>
            <div className="w-full max-w-md bg-white p-8 shadow-md rounded-lg">
                {message && <p className="text-sm text-red-500 mb-4">{message}</p>}
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 mb-4 border rounded"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-3 mb-6 border rounded"
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