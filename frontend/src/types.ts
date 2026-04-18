export interface Product {
  id: string;
  name: string;
  barcode: string;
  stock: number;
  threshold: number;
  price: number;
  status: 'red' | 'yellow' | 'green';
}