import React, { useState } from 'react';
import { Search, Plus, Filter, Edit, Trash2 } from 'lucide-react';

const inventory = [
  { id: 1, name: 'iPhone 15 Case', category: 'Accessories', stock: 12, price: 150, status: 'In Stock' },
  { id: 2, name: 'Samsung Fast Charger', category: 'Electronics', stock: 0, price: 85, status: 'Out of Stock' },
  { id: 3, name: 'Bluetooth Speaker', category: 'Electronics', stock: 2, price: 450, status: 'Low Stock' },
  { id: 4, name: 'Screen Protector', category: 'Accessories', stock: 45, price: 30, status: 'In Stock' },
  { id: 5, name: 'USB-C Cable', category: 'Electronics', stock: 5, price: 45, status: 'Low Stock' },
  { id: 6, name: 'Wireless Earbuds', category: 'Electronics', stock: 8, price: 320, status: 'In Stock' },
];

const InventoryTable = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredInventory = inventory.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row gap-4 justify-between items-center">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search items, categories..." 
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 border border-slate-200 rounded-xl text-slate-600 font-bold text-sm hover:bg-slate-50">
            <Filter size={16} /> Filter
          </button>
          <button className="flex-1 sm:flex-none bg-indigo-600 text-white px-4 py-2 rounded-xl flex items-center justify-center gap-2 font-bold text-sm shadow-md">
            <Plus size={16} /> New Item
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-wider">
              <th className="px-6 py-4">Item Name</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">Stock</th>
              <th className="px-6 py-4">Price</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredInventory.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-4 font-bold text-slate-900">{item.name}</td>
                <td className="px-6 py-4 text-slate-500 text-sm">{item.category}</td>
                <td className="px-6 py-4 font-mono text-sm">{item.stock}</td>
                <td className="px-6 py-4 text-slate-900 font-bold">GH₵ {item.price}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-[10px] font-black uppercase ${
                    item.status === 'In Stock' ? 'bg-emerald-50 text-emerald-600' :
                    item.status === 'Low Stock' ? 'bg-amber-50 text-amber-600' :
                    'bg-rose-50 text-rose-600'
                  }`}>
                    {item.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                      <Edit size={16} />
                    </button>
                    <button className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InventoryTable;

