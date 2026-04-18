import React from 'react';
import { Product } from '../../types';

interface ScannerProps {
  onScanSuccess: (product: Product) => void;
}

const Scanner: React.FC<ScannerProps> = ({ onScanSuccess }) => {
  const simulateScan = () => {
    const mockProduct: Product = {
      id: Math.random().toString(36).substr(2, 9),
      name: "New Scanned Item " + Math.floor(Math.random() * 100),
      barcode: "50123" + Math.floor(Math.random() * 100000),
      stock: 1,
      threshold: 5,
      price: 15.50,
      status: 'green'
    };
    onScanSuccess(mockProduct);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6">
      <div className="w-64 h-64 border-4 border-dashed border-emerald-300 rounded-3xl flex items-center justify-center mb-8 relative overflow-hidden bg-white shadow-inner">
        <div className="absolute inset-0 bg-emerald-500/5 animate-pulse" />
        <span className="text-6xl">📷</span>
      </div>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Scanner Ready</h2>
      <p className="text-gray-500 mb-8 max-w-xs">Simulate a barcode scan to add items to your inventory.</p>
      <button 
        onClick={simulateScan}
        className="bg-emerald-600 text-white px-10 py-4 rounded-2xl font-bold shadow-lg hover:bg-emerald-700 transform transition-all active:scale-95"
      >
        Simulate Scan
      </button>
    </div>
  );
};

export default Scanner;