import React from 'react';
import { Product } from '../../types';

interface InventoryProps {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

const Inventory: React.FC<InventoryProps> = ({ products }) => {
  return (
    <div className="pb-24">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900">📦 Inventory</h2>
        <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-bold">
          {products.length} Items Total
        </span>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {products.map((product) => (
          <div key={product.id} className="product-card flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-gray-800">{product.name}</h3>
                {product.stock <= product.threshold && (
                  <span className="animate-pulse bg-red-100 text-red-600 text-[10px] uppercase px-2 py-0.5 rounded font-black">Low</span>
                )}
              </div>
              <p className="text-sm text-gray-400 font-mono">{product.barcode}</p>
              <p className="mt-2 font-bold text-emerald-600 text-lg">GH₵ {product.price.toFixed(2)}</p>
            </div>

            <div className="flex items-center gap-6">
              <div className={`traffic-light ${
                product.stock === 0 ? 'traffic-light-red' : 
                product.stock <= product.threshold ? 'traffic-light-amber' : 'traffic-light-green'
              }`}>
                {product.stock}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Inventory;