// src/utils/supabase/server.ts

import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'

/**
 * Membuat Supabase Client untuk lingkungan Server Side (Server Components atau Server Actions).
 * Client ini memiliki akses ke cookies untuk menangani sesi otentikasi (Auth).
 * @returns SupabaseClient instance
 */
export async function createSupabaseServerClient() { // ⬅️ Tambahkan async di sini
  const cookieStore = await cookies() // ⬅️ Tambahkan await di sini

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options })
          } catch (error) {
            // The set function can fail in a Server Component when a redirect happens
            // but this is fine since we do not need to set anything in a redirect
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: '', ...options })
          } catch (error) {
            // The remove function can fail in a Server Component when a redirect happens
            // but this is fine since we do not need to set anything in a redirect
          }
        },
      },
    }
  )
}