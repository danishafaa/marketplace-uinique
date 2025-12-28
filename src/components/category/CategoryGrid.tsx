// src/components/category/CategoryGrid.tsx
import ProductCard from "@/components/ProductCard";
import { Product } from "@/types/product";

export default function CategoryGrid({ title, products }: { title: string, products: Product[] }) {
    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{title}</h1>
            <div className="w-full h-[1px] bg-gray-200 mb-10"></div> {/* Garis sesuai desain */}

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {products.map((p) => (
                    <ProductCard key={p.id} product={p} />
                ))}
            </div>
        </div>
    );
}