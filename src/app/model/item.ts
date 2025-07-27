import { Timestamp } from 'firebase/firestore';

export interface IProduct {
  id: string | number; // Auto-generated or custom
  name: string; // "Raymond Shirt"
  category?: string; // "Men Wear"
  brand?: string; // "Raymond"
  sizes: ISizes[]; // "M", "L", "XL", or number
  color?: string; // Optional: "Blue", "Red"
  barcode: string; // Barcode or unique product code
  costPrice: number; // Cost to you (purchase price)
  sellingPrice: number; // Price for customer
  tax?: number; // GST in percent (e.g., 5, 12, 18)
  stock: number; // Current available quantity
  lowStockAlert?: number; // Alert when stock goes below this
  imageUrl?: string; // Optional product photo
  createdAt?: Timestamp; // Server timestamp
  updatedAt?: Timestamp; // Last updated
}
interface ISizes {
  quantity: number;
  size: string;
}
export const sizes = [
  { size: 'M', quantity: 12 },
  { size: 'L', quantity: 7 },
  { size: 'XL', quantity: 20 },
];
