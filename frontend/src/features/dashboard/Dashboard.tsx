const Dashboard = () => {
  const stats = [
    { label: 'Today Sales', value: 'GH₵125.50', change: '+12%', color: 'emerald' },
    { label: 'Low Stock Items', value: '3', change: '-1', color: 'yellow' },
    { label: 'Total Products', value: '47', change: '+2', color: 'blue' }
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
          <li className="flex justify-between py-3 px-4 bg-red-50 rounded-xl border border-red-200">
            <span>Voltic Water</span>
            <span className="font-bold text-red-600">5 pcs</span>
          </li>
          <li className="flex justify-between py-3 px-4 bg-yellow-50 rounded-xl border border-yellow-200">
            <span>Indomie Noodles</span>
            <span className="font-bold text-yellow-600">25 pcs</span>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Dashboard
