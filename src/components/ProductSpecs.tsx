export default function ProductSpecs({ product }: { product: any }) {
  const specs = [
    { label: "Category", value: product.category },
    { label: "Brand", value: product.brand || "-" },
    { label: "Product Weight", value: product.weight || "-" },
    { label: "Shelf Life", value: product.shelfLife || "-" },
    { label: "Flavor", value: product.flavor || "-" },
    { label: "Serving Instructions", value: product.servingInstructions || "-" },
    { label: "Packaging Type", value: product.packagingType || "-" },
  ];

  return (
    <div className="mb-6 rounded-xl bg-white shadow-sm overflow-hidden border border-gray-100">
      <h3 className="text-sm font-bold text-gray-900 bg-gray-50 px-8 py-3 border-b">Product Specifications</h3>
      <div className="p-8 space-y-4">
        {specs.map((item, idx) => (
          <div key={idx} className="flex border-b border-gray-50 pb-3 last:border-0">
            <span className="w-64 text-sm text-gray-400">{item.label}</span>
            <span className="text-sm font-medium text-gray-800">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}