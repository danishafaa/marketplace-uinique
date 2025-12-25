// src/app/cart/page.tsx
import { getCart } from '@/app/actions/cart';
import { redirect } from 'next/navigation';
import CartClient from './CartClient';

export default async function CartPage() {
    const cart = await getCart();

    if (!cart) {
        redirect('/login');
    }

    return (
        <div className="bg-[#f5f5f5] min-h-screen py-10">
            <div className="max-w-7xl mx-auto px-4">
                <CartClient initialItems={cart.items} />
            </div>
        </div>
    );
}