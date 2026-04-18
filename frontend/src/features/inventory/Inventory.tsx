import { Product } from '../../types'

interface InventoryProps {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

const Inventory = ({ products, setProducts }: InventoryProps) => {
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
