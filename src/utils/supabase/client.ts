// src/utils/supabase/client.ts

import { createBrowserClient } from '@supabase/ssr'

/**
 * Membuat Supabase Client untuk lingkungan Client Side (Browser).
 * @returns SupabaseClient instance
 */
export function createSupabaseClient() {
    return createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
}