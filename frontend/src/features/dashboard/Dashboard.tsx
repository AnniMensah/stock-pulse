import { Product } from '../../types'

interface DashboardProps {
  products: Product[]
}

const Dashboard = ({ products }: DashboardProps) => {
  const lowStockItems = products.filter(p => p.stock <= p.threshold);

  const stats = [
    { label: 'Today Sales', value: 'GH₵125.50', change: '+12%', color: 'emerald' },
    { label: 'Low Stock Items', value: lowStockItems.length.toString(), change: 'Action required', color: 'yellow' },
    { label: 'Total Products', value: products.length.toString(), change: 'Live', color: 'blue' }
  ]

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-900 mb-8">📊 Dashboard</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
            <p className="text-sm text-gray-600 uppercase tracking-wide font-medium">{stat.label}</p>
            <p className="text-4xl font-bold text-gray-900 mt-2">{stat.value}</p>
            <p className={`text-sm font-medium mt-1 ${stat.change.startsWith('+') ? 'text-emerald-600' : 'text-red-600'}`}>
              {stat.change} from yesterday
            </p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
        <h3 className="text-xl font-bold mb-6">Reorder List</h3>
        <ul className="space-y-2">
          {lowStockItems.map(product => (
            <li key={product.id} className="flex justify-between py-3 px-4 bg-red-50 rounded-xl border border-red-200">
              <span>{product.name}</span>
              <span className="font-bold text-red-600">{product.stock} pcs</span>
            </li>
          ))}
          {lowStockItems.length === 0 && (
            <p className="text-gray-500 italic">All stock levels are healthy! 🎉</p>
          )}
        </ul>
      </div>
    </div>
  )
}

export default Dashboard
