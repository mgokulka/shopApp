import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
export interface Item {
  barcode: string;
  name: string;
  dateOfPurchase: Date;
  quantity: number;
  buyPrice: number;
  sellPrice: number;
  color?: string;
  [key: string]: any; // For optional fields
}
@Injectable({
  providedIn: 'root',
})
export class CreateItemService {
  private itemsSubject = new BehaviorSubject<Item[]>([]);
  items$ = this.itemsSubject.asObservable();

  private selectedBarcodeSubject = new BehaviorSubject<string | null>(null);
  selectedBarcode$ = this.selectedBarcodeSubject.asObservable();

  constructor() {}

  addItem(newItem: Item): void {
    const currentItems = this.itemsSubject.value;
    const exists = currentItems.some(
      (item) => item.barcode === newItem.barcode
    );
    if (exists) return;
    this.itemsSubject.next([...currentItems, newItem]);
  }
  updateItem(updatedItem: Item): void {
    const currentItems = this.itemsSubject.value;
    const index = currentItems.findIndex(item => item.barcode === updatedItem.barcode);
  
    if (index === -1) {
      console.warn(`Item with barcode ${updatedItem.barcode} not found.`);
      return;
    }
  
    const updatedItems = [...currentItems];
    updatedItems[index] = updatedItem;
  
    this.itemsSubject.next(updatedItems);
  }

  checkBarcodeExists(barcode: string): boolean {
    return this.itemsSubject.value.some((item) => item.barcode === barcode);
  }

  setSelectedBarcode(barcode: string) {
    this.selectedBarcodeSubject.next(barcode);
  }

  clearSelectedBarcode() {
    this.selectedBarcodeSubject.next(null);
  }
}
