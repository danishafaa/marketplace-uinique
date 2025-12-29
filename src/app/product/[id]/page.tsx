import { getProductDetail } from "@/app/actions/product";
import SellerCard from "@/components/SellerCard";
import ProductSpecs from "@/components/ProductSpecs";
import { MessageCircle, Heart, Plus, Minus, ShoppingCart } from "lucide-react";

export default async function ProductDetailPage({ 
  params 
}: { 
  params: Promise<{ id: string }> // 1. Ubah tipe data params menjadi Promise
}) {
  // 2. Tambahkan baris ini untuk menunggu (await) nilai id
  const { id } = await params; 

  console.log("Mencari ID Produk:", id); 
  
  // 3. Gunakan variabel 'id' yang sudah di-await
  const product = await getProductDetail(id);
  
  console.log("Hasil Database:", product); 
  
  if (!product) {
    return (
      <div className="p-20 text-center font-bold">
        Produk tidak ditemukan (ID: {id})
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F0F2F5] pb-20 font-sans">
      <div className="container mx-auto max-w-5xl px-4 py-8">
        
        {/* CARD UTAMA: Galeri & Info Harga */}
        <div className="mb-6 flex flex-col gap-10 rounded-xl bg-white p-8 shadow-sm md:flex-row">
          {/* Sisi Kiri: Foto */}
          <div className="w-full md:w-[45%] space-y-4">
            <div className="aspect-square bg-gray-50 rounded-xl overflow-hidden border border-gray-100">
              <img src={product.imageUrl || "/placeholder.png"} className="w-full h-full object-cover" alt={product.name} />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[1,2,3,4].map(i => (
                <div key={i} className="aspect-square bg-gray-100 rounded-lg border border-gray-200" />
              ))}
            </div>
          </div>

          {/* Sisi Kanan: Info Pembelian */}
          <div className="flex-grow space-y-6">
            <div className="flex items-center gap-2">
              <span className="bg-[#002B45] text-white text-[10px] px-2 py-0.5 rounded font-bold">Star+</span>
              <h1 className="text-xl font-bold text-gray-800">{product.name}</h1>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-50 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold text-gray-900">Rp {product.price.toLocaleString('id-ID')}</span>
                <span className="text-xs text-gray-400 font-medium">/{product.weight || "pcs"}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-[10px] font-bold text-gray-600 bg-gray-50 w-fit px-4 py-2 rounded-lg">
               <span>👍 25 people have purchased this product</span>
            </div>

            <div className="pt-4">
              <p className="text-xs font-bold text-gray-400 mb-3">Quantity:</p>
              <div className="flex items-center border border-gray-200 rounded-lg w-fit">
                <button className="p-2 text-gray-400"><Minus size={14} /></button>
                <input type="text" className="w-10 text-center text-sm font-bold outline-none" defaultValue="1" />
                <button className="p-2 text-gray-400"><Plus size={14} /></button>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-4">
              <button className="flex-grow bg-[#002B45] text-white py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition">
                Add to Cart
              </button>
              <a href={`https://wa.me/${product.storePhone}`} className="p-2.5 border-2 border-[#25D366] rounded-full text-[#25D366] hover:bg-green-50">
                <MessageCircle size={22} fill="currentColor" />
              </a>
              <button className="p-2.5 border-2 border-gray-200 rounded-full text-gray-300 hover:text-red-500 transition">
                <Heart size={22} />
              </button>
            </div>
          </div>
        </div>

        {/* INFO PENJUAL */}
        <SellerCard product={product} />

        {/* SPESIFIKASI */}
        <ProductSpecs product={product} />

        {/* DESKRIPSI */}
        <div className="rounded-xl bg-white shadow-sm overflow-hidden border border-gray-100">
          <h3 className="text-sm font-bold text-gray-900 bg-gray-50 px-8 py-3 border-b">Product Description</h3>
          <div className="p-8">
            <h4 className="font-bold text-gray-800 mb-4 text-xs tracking-wider">THE PRICE LISTED IS FOR 1 PORTION OF {product.name.toUpperCase()}</h4>
            <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-wrap font-medium">
              {product.description}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}