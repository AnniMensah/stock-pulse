export interface Product {
  id: string;
  name: string;
  barcode: string;
  imageUrl?: string;
  stock: number;
  threshold: number;
  price: number;
  status: 'green' | 'yellow' | 'red';
}

export interface Sale {
  id: string;
  productId: string;
  quantity: number;
  date: string;
}

export type Tab = 'scan' | 'inventory' | 'dashboard';
