// src/components/FavoriteProductCard.tsx

'use client';

import Image from "next/image";
import { Trash2, ShoppingCart } from "lucide-react"; // Pastikan install: npm install lucide-react
import { removeFromWishlist } from "@/app/actions/wishlist";
import { addItemToCart } from "@/app/actions/cart";

interface ProductProps {
    product: {
        id: string;
        name: string;
        price: number;
        imageUrl: string | null;
        store: { name: string };
    };
}

export default function FavoriteProductCard({ product }: ProductProps) {

    // 1. Logic Hapus dari Favorit (Tombol Sampah)
    const handleDelete = async () => {
        const confirmDelete = confirm("Hapus barang ini dari favorit?");
        if (!confirmDelete) return;

        const res = await removeFromWishlist(product.id);
        if (!res.success) alert("Gagal menghapus produk");
    };

    // 2. Logic Tambah ke Keranjang (Tombol Cart)
    const handleAddToCart = async () => {
        const res = await addItemToCart(product.id, 1);
        if (res.success) {
            alert("Berhasil masuk keranjang!");
        } else {
            alert("Gagal masuk keranjang: " + res.message);
        }
    };

    return (
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex gap-4 relative hover:shadow-md transition-shadow">

            {/* Badge Star+ (Sesuai Desain) */}
            <div className="absolute top-0 left-0 bg-[#002b45] text-white text-[10px] px-2 py-1 rounded-tl-xl rounded-br-xl font-bold z-10">
                Star+
            </div>

            {/* Gambar Produk */}
            <div className="w-28 h-28 relative flex-shrink-0 bg-gray-50 rounded-lg overflow-hidden mt-2">
                <Image
                    src={product.imageUrl || "/placeholder.png"}
                    alt={product.name}
                    fill
                    className="object-cover"
                />
            </div>

            {/* Detail Produk */}
            <div className="flex flex-col justify-between flex-grow py-1">
                <div>
                    {/* Nama Toko Kecil */}
                    <p className="text-[10px] text-gray-400 mb-1">{product.store.name}</p>
                    <h3 className="font-bold text-gray-800 text-sm line-clamp-2 leading-tight">
                        {product.name}
                    </h3>
                    <p className="text-[10px] text-gray-500 mt-1">Stock: Available</p>
                </div>

                <div>
                    {/* Harga Coret (Dummy Discount Visual) */}
                    <p className="text-[10px] text-gray-400 line-through">
                        Rp {(product.price * 1.2).toLocaleString('id-ID')}
                    </p>
                    {/* Harga Asli (Merah sesuai desain) */}
                    <p className="text-red-500 font-bold text-base">
                        Rp {product.price.toLocaleString('id-ID')}
                    </p>
                </div>

                {/* Tombol Aksi di Kanan Bawah */}
                <div className="flex justify-end gap-3 absolute bottom-4 right-4">
                    {/* Tombol Sampah */}
                    <button
                        onClick={handleDelete}
                        className="text-gray-400 hover:text-red-500 transition p-1"
                        title="Hapus dari Favorit"
                    >
                        <Trash2 size={20} />
                    </button>

                    {/* Tombol Keranjang */}
                    <button
                        onClick={handleAddToCart}
                        className="bg-[#002B45] text-white p-2 rounded-full hover:bg-[#001a2b] transition shadow-md"
                        title="Tambah ke Keranjang"
                    >
                        <ShoppingCart size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
}