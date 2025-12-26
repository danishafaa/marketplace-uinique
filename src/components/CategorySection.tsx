import Image from 'next/image';

const categories = [
  { name: 'Food', icon: '/icons/food.png' },
  { name: 'Drink', icon: '/icons/drink.png' },
  { name: 'Service', icon: '/icons/service.png' },
  { name: 'Stationery', icon: '/icons/stationery.png' },
];

export default function CategorySection() {
  return (
    <div className="py-8 text-center">
      <p className="text-sm font-bold text-gray-600 mb-6">Browse by Category</p>
      <div className="flex justify-center space-x-8">
        {categories.map((cat) => (
          <div key={cat.name} className="flex flex-col items-center group cursor-pointer">
            <div className="w-16 h-16 bg-white shadow-md rounded-2xl flex items-center justify-center border border-gray-100 group-hover:shadow-xl transition">
              {/* Ganti dengan icon yang sesuai */}
              <span className="text-2xl">📦</span> 
            </div>
            <span className="text-xs font-semibold mt-2 text-gray-700">{cat.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}