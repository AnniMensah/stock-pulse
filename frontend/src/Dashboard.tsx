
import React, { useState, useEffect } from 'react';
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
  Settings as SettingsIcon,
  Menu,
  X,
  User
} from 'lucide-react';
import InventoryTable from './components/InventoryTable';
import SettingsPanel from './components/SettingsPanel';

interface DashboardHomeProps {
  stats: any[];
  inventory: any[];
  activities: any[];
  onRecordSale: (itemId: number) => void;
}

const DashboardHome: React.FC<DashboardHomeProps> = ({ stats, inventory, activities, onRecordSale }) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className={`${stat.bg} ${stat.color} p-3 rounded-xl`}>
                <stat.icon size={24} />
              </div>
              <span className={`text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1 ${
                stat.change.startsWith('+') ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
              }`}>
                {stat.change.startsWith('+') ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                {stat.change}
              </span>
            </div>
            <h3 className="text-slate-500 text-xs font-bold uppercase tracking-widest">{stat.title}</h3>
            <p className="text-3xl font-black text-slate-900 mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-50 flex items-center justify-between">
            <h2 className="font-bold text-slate-800 flex items-center gap-2">
              <Clock size={18} className="text-indigo-500" /> Latest Changes
            </h2>
            <button className="text-indigo-600 text-sm font-bold flex items-center gap-1">
              View All <ChevronRight size={16} />
            </button>
          </div>
          <div className="p-4">
            {activities.length === 0 ? (
              <div className="p-8 text-center text-slate-400 font-medium">
                No recent activity to show for today.
              </div>
            ) : (
              <div className="space-y-3">
                {activities.map((activity, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center">
                        <TrendingUp size={16} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-800">{activity.description}</p>
                        <p className="text-xs text-slate-400">{activity.time}</p>
                      </div>
                    </div>
                    <span className="text-sm font-bold text-emerald-600">+{activity.amount}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
          <h2 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
            <AlertTriangle size={18} className="text-amber-500" /> Items Finishing
          </h2>
          <div className="space-y-4">
            {inventory.filter((i: any) => i.stock < 5).slice(0, 3).map((item: any, idx: number) => (
              <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white rounded-lg shadow-sm flex items-center justify-center text-lg">📦</div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">{item.name}</p>
                    <p className={`text-xs font-bold ${item.stock === 0 ? 'text-rose-600' : 'text-amber-600'}`}>
                      {item.stock} left
                    </p>
                  </div>
                </div>
                {item.stock > 0 && (
                  <button 
                    onClick={() => onRecordSale(item.id)}
                    className="px-3 py-1.5 bg-indigo-600 text-white text-xs font-bold rounded-lg hover:bg-indigo-700 transition-colors">
                    Sell
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

interface DashboardProps {
  onLogout: () => void;
}

const apiKey = ""; // Environment provided key

const Dashboard = ({ onLogout }: DashboardProps) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);
  const [, setIsSpeaking] = useState(false);
  const [selectedLang] = useState<'en' | 'akan' | 'ewe' | 'ga'>('en');

  const [inventory, setInventory] = useState<any[]>([]);

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/stock');
        if (response.ok) {
          const data = await response.json();
          setInventory(data);
        }
      } catch (error) {
        console.error("Error fetching inventory:", error);
      }
    };
    fetchInventory();
  }, []);

  const [moneyMade, setMoneyMade] = useState(42500);
  const [activities, setActivities] = useState<any[]>([]);

  const translations: any = {
    en: { dashboard: 'Dashboard', lowStock: 'Low Stock', moneyMade: 'Money Made', totalValue: 'Total Value', summary: 'Summary', logout: 'Logout', addItem: 'Add Item', findItem: 'Find items...', shopToday: 'My Shop Today' },
    akan: { dashboard: 'Kyerɛwfo', lowStock: 'Nneɛma a Asa', moneyMade: 'Sika a Yɛanya', totalValue: 'Nneɛma nyinaa bo', summary: 'Nsɛm Tiawa', logout: 'Pue', addItem: 'Fa bi ka ho', findItem: 'Hwehwɛ nneɛma...', shopToday: 'Me Dwumadi nnɛ' },
    ewe: { dashboard: 'Dɔwɔƒe', lowStock: 'Nu siwo vɔ kloe', moneyMade: 'Ga si wokpɔ', totalValue: 'Nuawo katã ƒe home', summary: 'Kpuotɔ', logout: 'Do le eme', addItem: 'Tsɔ nane kpee', findItem: 'Di nuwo...', shopToday: 'Nye fiasã egbe' },
    ga: { dashboard: 'Nitsumɔhe', lowStock: 'Nii ni egbe kɛ', moneyMade: 'Shika ni agbe', totalValue: 'Nii fɛɛ ajã', summary: 'Kukuotsoo', logout: 'Je kpo', addItem: 'Ke eko afata he', findItem: 'Tao nii...', shopToday: 'Mi fiashe ŋmɛnɛ' }
  };

  const handleSpeak = (key: string) => {
    const text = translations[selectedLang][key] || key;
    generateAndSpeakSummary({ name: selectedLang, id: selectedLang, native: text });
  };

  const handleRecordSale = async (itemId: number) => {
    const item = inventory.find(i => i.id === itemId);
    if (!item || item.stock <= 0) return;

    try {
      const response = await fetch('http://localhost:5000/api/sales', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId: itemId }),
      });

      if (response.ok) {
        const data = await response.json();
        // Update local state with the confirmed data from the server
        setInventory(prev => prev.map(i => i.id === itemId ? data.product : i));
        setMoneyMade(prev => prev + data.sale.amount);
        
        const newActivity = {
          description: data.sale.description,
          amount: `GH₵ ${data.sale.amount}`,
          time: new Date(data.sale.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setActivities(prev => [newActivity, ...prev].slice(0, 5));
      }
    } catch (error) {
      console.error("Failed to record sale:", error);
    }
  };

  const stats = [
    { id: 'totalItems', title: 'Total Items', value: inventory.reduce((acc, curr) => acc + curr.stock, 0).toLocaleString(), change: '+12%', icon: Package, color: 'text-blue-600', bg: 'bg-blue-50' },
    { id: 'finishedLow', title: 'Finished / Low', value: inventory.filter(i => i.stock < 5).length.toString(), change: '-2', icon: AlertTriangle, color: 'text-amber-600', bg: 'bg-amber-50' },
    { id: 'moneyMade', title: 'Money Made', value: `GH₵ ${moneyMade.toLocaleString()}`, change: '+18.5%', icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { id: 'totalValue', title: 'Total Value', value: `GH₵ ${inventory.reduce((acc, curr) => acc + (curr.price * curr.stock), 0).toLocaleString()}`, change: '+5.4%', icon: LayoutDashboard, color: 'text-indigo-600', bg: 'bg-indigo-50' },
  ];

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'inventory', label: 'Inventory', icon: Package },
    { id: 'settings', label: 'Settings', icon: SettingsIcon },
  ];

  const languages = [
    { id: 'en', name: 'English', native: 'English' },
    { id: 'akan', name: 'Akan Twi', native: 'Twi' },
    { id: 'ewe', name: 'Ewe', native: 'Eʋegbe' },
    { id: 'ga', name: 'Ga', native: 'Ga' }
  ];

  const playPCM = (base64Data: string) => {
    try {
      const binaryString = atob(base64Data);
      const len = binaryString.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) bytes[i] = binaryString.charCodeAt(i);

      const sampleRate = 24000;
      const buffer = new ArrayBuffer(44 + bytes.length);
      const view = new DataView(buffer);
      const writeString = (offset: number, string: string) => {
        for (let i = 0; i < string.length; i++) view.setUint8(offset + i, string.charCodeAt(i));
      };
      writeString(0, 'RIFF');
      view.setUint32(4, 36 + bytes.length, true);
      writeString(8, 'WAVE');
      writeString(12, 'fmt ');
      view.setUint32(16, 16, true);
      view.setUint16(20, 1, true);
      view.setUint16(22, 1, true);
      view.setUint32(24, sampleRate, true);
      view.setUint32(28, sampleRate * 2, true);
      view.setUint16(32, 2, true);
      view.setUint16(34, 16, true);
      writeString(36, 'data');
      view.setUint32(40, bytes.length, true);
      new Uint8Array(buffer, 44).set(bytes);

      const blob = new Blob([buffer], { type: 'audio/wav' });
      const url = URL.createObjectURL(blob);
      const audio = new Audio(url);
      audio.onended = () => setIsSpeaking(false);
      audio.onerror = () => setIsSpeaking(false);
      audio.play();
    } catch (e) {
      console.error("Audio playback error:", e);
      setIsSpeaking(false);
    }
  };

  const generateAndSpeakSummary = async (lang: { name: string; id: string; native: string }) => {
    setIsLanguageModalOpen(false);
    setIsSpeaking(true);

    const totalValue = inventory.reduce((acc, curr) => acc + (curr.price * curr.stock), 0);
    const lowStockCount = inventory.filter(i => i.stock < 5).length;

    const summaryPrompt = `
      Please provide a spoken business summary in ${lang.name} for a shop owner. 
      The summary should include:
      1. Total items in stock: ${inventory.reduce((acc, curr) => acc + curr.stock, 0)}.
      2. Number of items low or finished: ${lowStockCount}.
      3. Total money made today: ${moneyMade} Ghana Cedis.
      4. Total shop inventory value: ${totalValue} Ghana Cedis.
      Make it sound encouraging and professional.
    `;

    const fetchTTS = async () => {
      try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-tts:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: summaryPrompt }] }],
          generationConfig: {
            responseModalities: ["AUDIO"],
            speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: "Kore" } } }
          }
        })
      });

      const result = await response.json();
      const audioData = result.candidates[0].content.parts[0].inlineData.data;
      playPCM(audioData);
    } catch (error) {
      console.error("TTS Error:", error);
      setIsSpeaking(false);
    }
  };
  fetchTTS();
};

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden relative">
      {/* Sidebar - Desktop */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 transform transition-transform duration-300 md:relative md:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full">
          <div className="p-6 flex items-center justify-between border-b border-slate-50">
            <div className="flex items-center gap-2 text-indigo-600 font-bold text-xl">
              <LayoutDashboard /> StockPulse
            </div>
            <button onClick={() => setIsSidebarOpen(false)} className="md:hidden text-slate-400 hover:text-slate-600">
              <X size={24} />
            </button>
          </div>

  <nav className="flex-1 p-4 space-y-2">
            {menuItems.map((item) => (
              <button 
                key={item.id} 
                onClick={() => { setActiveTab(item.id); setIsSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 p-4 rounded-2xl transition-all duration-200 group ${
                  activeTab === item.id 
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' 
                    : 'text-slate-500 hover:bg-slate-50'
                }`}
              >
                <item.icon className={activeTab === item.id ? 'text-white' : 'text-slate-400 group-hover:text-indigo-500'} size={20} />
                <span className="font-bold">{item.label}</span>
              </button>
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
        <header className="bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsSidebarOpen(true)} className="md:hidden p-2 -ml-2 text-slate-500">
              <Menu size={24} />
            </button>
            <h1 className="text-xl font-bold text-slate-800 capitalize">
              {activeTab === 'dashboard' ? 'My Shop Today' : activeTab}
            </h1>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 p-2 bg-slate-50 rounded-xl px-4 border border-slate-100">
               <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
               <span className="text-xs font-bold text-slate-500 uppercase tracking-tight">System Online</span>
            </div>
            <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 font-bold border border-indigo-100">
               <User size={20} />
            </div>
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
                <h3 className="text-slate-500 text-xs font-bold uppercase tracking-widest">{stat.title}</h3>
                <p className="text-3xl font-black text-slate-900 mt-1">{stat.value}</p>
              </div>
            ))}
          </div>

          {activeTab === 'dashboard' && (
            <DashboardHome 
              stats={stats} 
              inventory={inventory} 
              activities={activities}
              onRecordSale={handleRecordSale} 
            />
          )}
          {activeTab === 'inventory' && <InventoryTable />}
          {activeTab === 'settings' && <SettingsPanel />}
        </main>
      </div>

      {/* Language Selection Modal */}
      {isLanguageModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsLanguageModalOpen(false)} />
          <div className="bg-white rounded-3xl w-full max-w-md relative shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6 bg-indigo-600 text-white text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Volume2 size={32} />
              </div>
              <h2 className="text-2xl font-bold">Listen to Summary</h2>
              <p className="opacity-80">Choose your preferred language</p>
            </div>
            
            <div className="p-6 grid grid-cols-2 gap-4">
              {languages.map((lang) => (
                <button
                  key={lang.id}
                  onClick={() => generateAndSpeakSummary(lang)}
                  className="flex flex-col items-center justify-center p-6 rounded-2xl border-2 border-slate-100 hover:border-indigo-500 hover:bg-indigo-50 transition-all group"
                >
                  <span className="text-2xl font-black text-slate-800 group-hover:text-indigo-600">{lang.native}</span>
                  <span className="text-sm text-slate-400 group-hover:text-indigo-400">{lang.name}</span>
                </button>
              ))}
            </div>
            
            <button 
              onClick={() => setIsLanguageModalOpen(false)}
              className="w-full p-4 text-slate-400 font-bold hover:text-slate-600 transition-colors border-t border-slate-50"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-slate-900/50 z-40 md:hidden backdrop-blur-sm" onClick={() => setIsSidebarOpen(false)} />
      )}
    </div>
  );
};

export default Dashboard;