// src/middleware.ts

import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
    const res = NextResponse.next()

    // Buat Supabase client untuk middleware
    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return req.cookies.getAll()
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value, options }) => {
                        // Set cookie pada response
                        res.cookies.set(name, value, options)
                    })
                },
            },
        }
    )

    // Refresh sesi user di server. Jika sesi tidak valid, ini akan menghapusnya.
    // Ini memastikan sesi cookie yang valid untuk Server Components.
    await supabase.auth.getSession()

    // Redirect jika user mencoba mengakses dashboard tanpa sesi
    const { data: { session } } = await supabase.auth.getSession()
    if (!session && req.nextUrl.pathname.startsWith('/dashboard')) {
        return NextResponse.redirect(new URL('/login', req.url))
    }

    return res
}

export const config = {
    // Tentukan path mana saja yang akan dilewati/dicek oleh middleware
    matcher: [
        '/',
        '/login',
        '/dashboard/:path*',
        // Tambahkan path yang perlu dicek/dilindungi (misalnya /api/...)
    ],
}