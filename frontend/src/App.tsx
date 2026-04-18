import { useState } from 'react'
import Scanner from './features/inventory/Scanner'
import Inventory from './features/inventory/Inventory'
import Dashboard from './features/dashboard/Dashboard'
import { Product } from './types'
import './App.css'

function App() {
  const [activeTab, setActiveTab] = useState('inventory')
  const [products, setProducts] = useState<Product[]>([
    {
      id: '1',
      name: 'Indomie Instant Noodles 70g',
      barcode: '1234567890123',
      stock: 25,
      threshold: 20,
      price: 2.5,
      status: 'yellow'
    },
    {
      id: '2',
      name: 'Voltic Water 500ml',
      barcode: '9876543210987',
      stock: 5,
      threshold: 10,
      price: 1.0,
      status: 'red'
    }
  ])

  const handleScanSuccess = (newProduct: Product) => {
    setProducts(prev => {
      const exists = prev.find(p => p.barcode === newProduct.barcode)
      if (exists) {
        return prev.map(p => p.barcode === newProduct.barcode ? { ...p, stock: p.stock + 1 } : p)
      }
      return [...prev, newProduct]
    })
    // Switch to inventory to see the result
    setActiveTab('inventory')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-50">
      <header className="bg-white/80 backdrop-blur-md shadow-sm border-b border-green-100 p-4">
        <h1 className="text-2xl font-bold text-gray-900">Stock Pulse</h1>
      </header>
      
      <main className="p-4">
        {activeTab === 'scan' && <Scanner onScanSuccess={handleScanSuccess} />}
        {activeTab === 'inventory' && <Inventory products={products} setProducts={setProducts} />}
        {activeTab === 'dashboard' && <Dashboard />}
      </main>

      <nav className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-md shadow-xl rounded-2xl p-2 flex gap-2">
        <button 
          onClick={() => setActiveTab('scan')} 
          className={`p-3 rounded-xl transition-colors ${activeTab === 'scan' ? 'bg-emerald-600 text-white shadow-lg' : 'text-emerald-600 hover:bg-emerald-50'}`}
        >
          📷 Scan
        </button>
        <button 
          onClick={() => setActiveTab('inventory')} 
          className={`p-3 rounded-xl transition-colors ${activeTab === 'inventory' ? 'bg-emerald-600 text-white shadow-lg' : 'text-emerald-600 hover:bg-emerald-50'}`}
        >
          📦 Inventory
        </button>
        <button 
          onClick={() => setActiveTab('dashboard')} 
          className={`p-3 rounded-xl transition-colors ${activeTab === 'dashboard' ? 'bg-emerald-600 text-white shadow-lg' : 'text-emerald-600 hover:bg-emerald-50'}`}
        >
          📊
        </button>
      </nav>
    </div>
  )
}

export default App
