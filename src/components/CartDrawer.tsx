// src/components/CartDrawer.tsx

'use client';

// TODO: Tambahkan logika fetching item keranjang dari Server Action/API

export default function CartDrawer({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
    // Gunakan useEffect untuk memuat item keranjang jika diperlukan
    // ...

    // Tambahkan return JSX ini di CartDrawer.tsx:
    return (
        <>
            {/* Overlay Gelap */}
            <div
                className={`fixed inset-0 bg-black transition-opacity duration-300 ${isOpen ? 'opacity-50 z-40' : 'opacity-0 pointer-events-none'
                    }`}
                onClick={onClose}
            ></div>

            {/* Panel Keranjang (Meluncur dari Kanan) */}
            <div
                className={`fixed top-0 right-0 w-full md:w-96 bg-white h-full shadow-2xl transition-transform duration-500 z-50 transform ${isOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
            >
                <div className="flex justify-between items-center p-4 border-b bg-primary-light">
                    <h2 className="text-xl font-bold text-darkgray">Keranjang Belanja</h2>
                    <button onClick={onClose} className="text-darkgray hover:text-red-600">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                </div>

                {/* Isi Keranjang (Placeholder) */}
                <div className="p-4 flex flex-col justify-between h-[calc(100%-60px)]">
                    <div className="flex-grow space-y-4 overflow-y-auto">
                        {/* TODO: Tampilkan Daftar CartItem di sini */}
                        <p className="text-center text-gray-500 mt-10">
                            Keranjang masih kosong.
                        </p>
                    </div>

                    {/* Footer Total dan Checkout */}
                    <div className="border-t pt-4">
                        <div className="flex justify-between font-bold text-lg mb-4">
                            <span>Total:</span>
                            <span className="text-red-600">Rp0</span>
                        </div>
                        <button className="w-full bg-primary-dark text-white p-3 rounded-lg hover:bg-primary transition">
                            Lanjut ke Checkout
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}