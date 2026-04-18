import { useState } from 'react';
import { 
  LayoutDashboard, 
  Package, 
  AlertTriangle, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight,
  Plus,
  Search,
  Clock,
  ChevronRight,
  LogOut,
  Volume2,
  Languages,
  Settings,
  Menu,
  X
} from 'lucide-react';

interface DashboardProps {
  onLogout: () => void;
}

const Dashboard = ({ onLogout }: DashboardProps) => {
  const [selectedLang, setSelectedLang] = useState<'en' | 'akan' | 'ewe' | 'ga'>('en');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Simplified translation map for audio feedback
  const translations = {
    en: {
      shopToday: "My Shop Today",
      totalItems: "Total Items",
      finishedLow: "Finished or Low",
      moneyMade: "Money Made",
      totalValue: "Total Value",
      findItem: "Find item",
      addItem: "Add Item",
      dashboard: "Dashboard",
      inventory: "Inventory",
      settings: "Settings",
      logout: "Logout"
    },
    akan: {
      shopToday: "Me dwasuo nnɛ",
      totalItems: "Nneɛma dodoɔ",
      finishedLow: "Ewie anaa ɛrehia",
      moneyMade: "Sika a manya",
      totalValue: "Boɔ a ɛsom",
      findItem: "Hwehwɛ adeɛ",
      addItem: "Fa bi ka ho",
      dashboard: "Dwasuo Titiri",
      inventory: "Nneɛma Korabea",
      settings: "Mpahyeɛ",
      logout: "Pue firi mu"
    },
    ewe: {
      shopToday: "Nye dɔwɔƒe egbe",
      totalItems: "Nuwo katã",
      finishedLow: "E vɔ alo esu dza",
      moneyMade: "Ga si mekpɔ",
      totalValue: "Asixɔxɔ katã",
      findItem: "Di nu",
      addItem: "Tsɔe kpee",
      dashboard: "Dɔwɔƒe",
      inventory: "Nuwo siwo le asime",
      settings: "Ðoɖowo",
      logout: "Do le eme"
    },
    ga: {
      shopToday: "Mi jua lɛ nɛ",
      totalItems: "Nii fɛɛ",
      finishedLow: "Egbe loo eeshe",
      moneyMade: "Shika ni minine",
      totalValue: "Jua ni eyɔɔ",
      findItem: "Tao nii",
      addItem: "Ke fɛɛ fata he",
      dashboard: "Nitsumɔ he",
      inventory: "Nii ni yɔɔ jua lɛ mli",
      settings: "Toigbelemɔi",
      logout: "Je kpo"
    }
  };

  const handleSpeak = (key: keyof typeof translations.en, extraText?: string) => {
    const text = translations[selectedLang][key] + (extraText ? `. ${extraText}` : "");
    const utterance = new SpeechSynthesisUtterance(text);
    
    // We attempt to set the rate slightly slower for better clarity
    utterance.rate = 0.9;
    utterance.pitch = 1;
    
    window.speechSynthesis.cancel(); // Stop current speech
    window.speechSynthesis.speak(utterance);
  };

  // Mock data for the dashboard
  const stats = [
    { id: 'totalItems', title: 'Total Items', value: '1,284', change: '+12%', icon: Package, color: 'text-blue-600', bg: 'bg-blue-50' },
    { id: 'finishedLow', title: 'Finished / Low', value: '14', change: '-2', icon: AlertTriangle, color: 'text-amber-600', bg: 'bg-amber-50' },
    { id: 'moneyMade', title: 'Money Made', value: 'GH₵ 42,500', change: '+18.5%', icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { id: 'totalValue', title: 'Total Value', value: 'GH₵ 124,000', change: '+5.4%', icon: LayoutDashboard, color: 'text-indigo-600', bg: 'bg-indigo-50' },
  ];

  const recentActivity = [
    { id: 1, action: 'Restocked', item: 'Wireless Headphones', user: 'Admin', time: '2h ago', qty: '+50', img: '🎧', akan: 'Wahyɛ mu foforɔ' },
    { id: 2, action: 'Sale', item: 'Smart Watch', user: 'POS-01', time: '4h ago', qty: '-1', img: '⌚', akan: 'Watɔn' },
    { id: 3, action: 'Adjustment', item: 'USB-C Cables', user: 'Manager', time: 'Yesterday', qty: '-5', img: '🔌', akan: 'Wasesa mu' },
    { id: 4, action: 'New Product', item: 'Keyboard', user: 'Admin', time: 'Yesterday', qty: '0', img: '⌨️', akan: 'Ade foforɔ' },
  ];

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'inventory', label: 'Inventory', icon: Package },
    { id: 'addItem', label: 'Add Item', icon: Plus },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Sidebar - Desktop */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full">
          <div className="p-6 flex items-center justify-between border-b border-slate-50">
            <div className="flex items-center gap-2 text-indigo-600 font-bold text-xl">
              <LayoutDashboard /> StockPulse
            </div>
            <button onClick={() => setIsSidebarOpen(false)} className="md:hidden text-slate-400 hover:text-slate-600">
              <X size={24} />
            </button>
          </div>

          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {menuItems.map((item) => (
              <div key={item.id} className="group flex items-center justify-between p-3 rounded-xl hover:bg-indigo-50 transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                  <item.icon className="text-slate-400 group-hover:text-indigo-600 transition-colors" size={20} />
                  <span className="font-bold text-slate-600 group-hover:text-indigo-700">{translations[selectedLang][item.id as keyof typeof translations.en]}</span>
                </div>
                <button 
                  onClick={(e) => { e.stopPropagation(); handleSpeak(item.id as any); }}
                  className="p-1.5 rounded-lg bg-slate-50 text-slate-400 hover:text-indigo-600 hover:bg-white transition-all shadow-sm"
                >
                  <Volume2 size={16} />
                </button>
              </div>
            ))}
          </nav>

          <div className="p-4 border-t border-slate-100">
            <button onClick={onLogout} className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-rose-50 text-slate-600 hover:text-rose-600 transition-colors">
              <div className="flex items-center gap-3">
                <LogOut size={20} />
                <span className="font-bold">{translations[selectedLang].logout}</span>
              </div>
              <Volume2 size={16} className="opacity-50" onClick={(e) => { e.stopPropagation(); handleSpeak('logout'); }} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Navigation Bar */}
        <header className="bg-white border-b border-slate-200 px-6 py-4 flex flex-wrap justify-between items-center sticky top-0 z-10 gap-4">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsSidebarOpen(true)} className="md:hidden p-2 -ml-2 text-slate-500">
              <Menu size={24} />
            </button>
            <div className="hidden md:block">
              {/* Empty placeholder to balance layout on desktop if needed, or put breadcrumbs here */}
            </div>
          </div>
          
          {/* Language Selector */}
          <div className="flex items-center bg-slate-100 p-1 rounded-lg">
            <Languages size={18} className="mx-2 text-slate-500" />
            {(['en', 'akan', 'ewe', 'ga'] as const).map((lang) => (
              <button
                key={lang}
                onClick={() => setSelectedLang(lang)}
                className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${
                  selectedLang === lang 
                  ? 'bg-white text-indigo-600 shadow-sm' 
                  : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                {lang.toUpperCase()}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 text-slate-600 text-sm font-medium">
            {/* User profile or status can go here */}
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6 focus:outline-none">
          {/* Header Area */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-slate-900">My Shop Today</h1>
                <button onClick={() => handleSpeak('shopToday')}>
                  <Volume2 size={20} className="text-indigo-400 cursor-pointer hover:text-indigo-600" />
                </button>
              </div>
              <p className="text-slate-500 text-sm">See how your business is doing</p>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="text" 
                  placeholder={translations[selectedLang].findItem}
                  className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full md:w-64 transition-all"
                />
              </div>
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-xl flex items-center gap-2 font-bold transition-colors shadow-lg shadow-indigo-200">
                <Plus size={18} />
                <span>{translations[selectedLang].addItem}</span>
              </button>
            </div>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, idx) => (
              <div key={idx} className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className={`${stat.bg} ${stat.color} p-3 rounded-lg`}>
                    <stat.icon size={24} />
                  </div>
                  <span className={`text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1 ${
                    stat.change.startsWith('+') ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                  }`}>
                    {stat.change.startsWith('+') ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                    {stat.change}
                  </span>
                </div>
                <button 
                  onClick={() => handleSpeak(stat.id as any, stat.value)}
                  className="flex items-center gap-2 text-left"
                >
                  <h3 className="text-slate-500 text-sm font-bold uppercase tracking-wider">{translations[selectedLang][stat.id as keyof typeof translations.en]}</h3>
                  <Volume2 size={14} className="text-slate-300" />
                </button>
                <p className="text-3xl font-black text-slate-900 mt-1">{stat.value}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Recent Activity Table */}
            <div className="lg:col-span-2 bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="p-5 border-b border-slate-50 flex items-center justify-between">
                <h2 className="font-bold text-slate-800 flex items-center gap-2">
                  <Clock size={18} className="text-indigo-500" />
                  Latest Changes
                </h2>
                <button className="text-indigo-600 text-sm font-semibold hover:text-indigo-700 flex items-center gap-1">
                  View All <ChevronRight size={16} />
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                      <th className="px-6 py-3 font-semibold">Action</th>
                      <th className="px-6 py-3 font-semibold">Item</th>
                      <th className="px-6 py-3 font-semibold">User</th>
                      <th className="px-6 py-3 font-semibold">Change</th>
                      <th className="px-6 py-3 font-semibold">Time</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {recentActivity.map((log) => (
                      <tr key={log.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-6 py-4">
                          <span className={`text-xs font-medium px-2 py-1 rounded-md ${
                            log.action === 'Sale' ? 'bg-blue-50 text-blue-700' : 
                            log.action === 'Restocked' ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-700'
                          }`}>
                            {log.action}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <span className="text-2xl bg-slate-100 w-10 h-10 flex items-center justify-center rounded-lg">{log.img}</span>
                            <span className="text-sm font-bold text-slate-900">{log.item}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-600">{log.user}</td>
                        <td className={`px-6 py-4 text-sm font-bold ${
                          log.qty.startsWith('+') ? 'text-emerald-600' : log.qty.startsWith('-') ? 'text-rose-600' : 'text-slate-400'
                        }`}>
                          {log.qty}
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-400">{log.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Quick Insights / Low Stock */}
            <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-5">
              <h2 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
                <AlertTriangle size={18} className="text-amber-500" />
                Items Finishing
              </h2>
              <div className="space-y-4">
                {[
                  { name: 'iPhone Case', stock: 3, limit: 10, img: '📱' },
                  { name: 'Speaker', stock: 1, limit: 5, img: '🔊' },
                  { name: 'Laptop Stand', stock: 0, limit: 8, img: '💻' },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-100">
                    <div className="flex items-center gap-3">
                      <span className="text-xl bg-white p-2 rounded-md shadow-sm">{item.img}</span>
                      <div>
                        <p className="text-sm font-bold text-slate-900">{item.name}</p>
                        <p className={`text-xs font-bold ${item.stock === 0 ? 'text-rose-600' : 'text-amber-600'}`}>
                          {item.stock} left
                        </p>
                      </div>
                    </div>
                    <div className="w-16 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${item.stock === 0 ? 'bg-rose-500' : 'bg-amber-500'}`} 
                        style={{ width: `${(item.stock / item.limit) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-6 py-2 border border-indigo-100 text-indigo-600 rounded-lg text-sm font-bold hover:bg-indigo-50 transition-colors">
                Manage Alerts
              </button>
            </div>
          </div>
        </main>
      </div>

      {/* Sidebar Overlay for Mobile */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 z-40 md:hidden backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default Dashboard;