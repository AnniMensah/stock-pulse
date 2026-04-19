import React from 'react';
import { Save, Bell, ShieldCheck } from 'lucide-react';

const SettingsPanel = () => (
  <div className="max-w-4xl mx-auto space-y-8">
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="p-8 border-b border-slate-100">
        <h2 className="text-xl font-bold text-slate-900">Store Profile</h2>
        <p className="text-slate-500 text-sm">Update your shop information and branding</p>
      </div>
      <div className="p-8 space-y-6">
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 bg-slate-100 rounded-3xl flex items-center justify-center text-3xl shadow-inner border border-slate-200">🏪</div>
          <button className="px-4 py-2 border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50">Change Logo</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Shop Name</label>
            <input type="text" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500" defaultValue="Main Street Boutique" />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Contact Email</label>
            <input type="email" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500" defaultValue="admin@mainstreet.com" />
          </div>
        </div>
      </div>
      <div className="p-8 bg-slate-50 flex justify-end">
        <button className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-colors">
          <Save size={18} /> Save Profile
        </button>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        <h3 className="font-bold text-slate-900 flex items-center gap-2">
          <Bell size={20} className="text-indigo-600" /> Notifications
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
            <div>
              <p className="text-sm font-bold text-slate-900">Low Stock Alerts</p>
              <p className="text-xs text-slate-500">Get notified when stock drops below 5</p>
            </div>
            <div className="w-12 h-6 bg-indigo-600 rounded-full relative p-1 cursor-pointer">
              <div className="w-4 h-4 bg-white rounded-full absolute right-1" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        <h3 className="font-bold text-slate-900 flex items-center gap-2">
          <ShieldCheck size={20} className="text-emerald-600" /> Security
        </h3>
        <div className="space-y-4">
          <button className="w-full text-left p-4 bg-slate-50 hover:bg-slate-100 rounded-2xl transition-colors">
            <p className="text-sm font-bold text-slate-900">Change Password</p>
            <p className="text-xs text-slate-500">Update your account security</p>
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default SettingsPanel;

