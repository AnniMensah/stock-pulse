import { useState } from 'react'
import Scanner from './features/inventory/Scanner'
import Inventory from './features/inventory/Inventory'
import Dashboard from './features/dashboard/Dashboard'
import './App.css'

function App() {
  const [activeTab, setActiveTab] = useState('inventory')

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-50">
      <header className="bg-white/80 backdrop-blur-md shadow-sm border-b border-green-100 p-4">
        <h1 className="text-2xl font-bold text-gray-900">Stock Pulse</h1>
      </header>
      
      <main className="p-4">
        {activeTab === 'scan' && <Scanner />}
        {activeTab === 'inventory' && <Inventory />}
        {activeTab === 'dashboard' && <Dashboard />}
      </main>

      <nav className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-md shadow-xl rounded-2xl p-2 flex gap-2">
        <button onClick={() => setActiveTab('scan')} className="p-3 rounded-xl text-emerald-600">
          📷 Scan
        </button>
        <button onClick={() => setActiveTab('inventory')} className="p-3 rounded-xl bg-emerald-600 text-white shadow-lg">
          📦 Inventory
        </button>
        <button onClick={() => setActiveTab('dashboard')} className="p-3 rounded-xl text-emerald-600">
          📊
        </button>
      </nav>
    </div>
  )
}

export default App
