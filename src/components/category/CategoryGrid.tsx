// src/components/category/CategoryGrid.tsx
import ProductCard from "@/components/ProductCard";
import { Product } from "@/types/product"; // Mengimpor tipe resmi

interface CategoryGridProps {
    title: string;
    products: Product[]; // Mengganti any[] menjadi Product[]
    isError?: boolean;
}

export default function CategoryGrid({ title, products, isError }: CategoryGridProps) {
    return (
        <div className="space-y-4">
            {/* Header sesuai desain dengan garis pembatas */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">{title}</h1>
                <div className="w-full h-[1px] bg-gray-100"></div>
            </div>

            {isError && <p className="text-red-500 py-10">Terjadi kesalahan sistem.</p>}

            {!isError && products.length === 0 && (
                <p className="text-gray-400 italic py-20 text-center">Belum ada produk di kategori ini.</p>
            )}

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {products.map((p) => (
                    <ProductCard key={p.id} product={p} />
                ))}
            </div>
        </div>
    );
}