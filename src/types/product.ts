// src/types/product.ts
export type ProductCategory = "Food" | "Drink" | "Service" | "Stationery";

export interface Product {
    id: number;
    name: string;
    price: number;
    originalPrice?: number; // Untuk harga coret (diskon)
    category: ProductCategory;
    image: string;
    badge?: "Best Seller"; // Muncul di pojok kiri atas
}