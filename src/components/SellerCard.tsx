import { MapPin, Phone } from "lucide-react";

export default function SellerCard({ product }: { product: any }) {
  return (
    <div className="mb-6 flex flex-col items-center gap-8 rounded-xl bg-white p-6 shadow-sm md:flex-row border-l-[6px] border-[#002B45]">
      <div className="flex items-center gap-4 border-r pr-8 border-gray-100 min-w-[280px]">
        <div className="h-14 w-14 rounded-full border-2 border-gray-200 p-0.5 overflow-hidden">
          <img src="/logo-placeholder.png" alt="Store Logo" className="h-full w-full object-cover rounded-full" />
        </div>
        <div>
          <h4 className="font-bold text-gray-900 leading-tight text-base">{product.store?.name || "UINIQUE Seller"}</h4>
          <a href={`tel:${product.storePhone}`} className="mt-1 flex items-center gap-1 text-xs font-semibold text-gray-700">
            <Phone size={14} className="fill-black" /> {product.storePhone || "-"}
          </a>
        </div>
      </div>
      
      <div className="flex items-start gap-3">
        <MapPin size={22} className="shrink-0 text-gray-400 mt-1" />
        <p className="text-sm font-semibold text-gray-700 leading-relaxed">
          {product.storeAddress || "Alamat belum diatur."}
        </p>
      </div>
    </div>
  );
}