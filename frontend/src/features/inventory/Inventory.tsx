import { useState, useEffect } from 'react'
import { Product } from '../../types'

const Inventory = () => {
  const [products, setProducts] = useState<Product[]>([
    {
      id: '1',
      name: 'Indomie Instant Noodles 70g',
      barcode: '1234567890123',
      stock: 25,
      threshold: 20,
      price: 2.5,
      status: 'yellow' as const
    },
    {
      id: '2',
      name: 'Voltic Water 500ml',
      barcode: '9876543210987',
      stock: 5,
      threshold: 10,
      price: 1.0,
      status: 'red' as const
    },
    {
      id: '3',
      name: 'Gari 1kg',
      barcode: '5555555555555',
      stock: 45,
      threshold: 10,
      price: 8.0,
      status: 'green' as const
    }
  ])

  const updateStock = (id: string, delta: number) => {
    setProducts(products.map(p => p.id === id ? {...p, stock: p.stock + delta} : p))
  }

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-900 mb-8">📦 Inventory</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <div className={`traffic-light ${product.status}`}>
              {product.status.toUpperCase()}
            </div>
            <h3 className="text-xl font-bold mt-4 mb-2">{product.name}</h3>
            <p className="text-3xl font-bold text-emerald-600 mb-4">GH₵{product.price}</p>
            <div className="flex items-center justify-between mb-6">
              <span className="text-2xl font-mono">{product.stock}</span>
              <span className="text-sm text-gray-500">Thresh: {product.threshold}</span>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => updateStock(product.id, 1)}
                className="flex-1 bg-green-600 text-white py-2 px-4 rounded-xl font-medium hover:bg-green-700"
              >
                +1
              </button>
              <button 
                onClick={() => updateStock(product.id, -1)}
                className="flex-1 bg-red-600 text-white py-2 px-4 rounded-xl font-medium hover:bg-red-700"
              >
                -1
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Inventory
