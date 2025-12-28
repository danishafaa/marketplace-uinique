// src/types/product.ts
export type ProductCategory = "Food" | "Drink" | "Service" | "Stationery";

export type Product = {
    id: string;             // UBAH DARI number KE string
    name: string;
    price: number;
    originalPrice?: number;
    category: ProductCategory;
    image: string;
    storeName: string;      // Pastikan ada ini untuk nama toko
    badge?: "Best Seller";
};