import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  collectionData,
  doc,
  deleteDoc,
  updateDoc,
} from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { IProduct } from '../model/item'; // your product model
import { IAccounts } from '../model/accounts';
export const COLLECTION_CONSTANT = {
  Product: 'products',
  Account: 'accounts',
};
@Injectable({ providedIn: 'root' })
export class ProductService {
  private selectedBarcodeSubject = new BehaviorSubject<string | null>(null);
  selectedBarcode$ = this.selectedBarcodeSubject.asObservable();
  checkBarcodeExists(barcode: string): boolean {
    return false; // return this.itemsSubject.value.some((item) => item.barcode === barcode);
  }
  constructor(private firestore: Firestore) {}

  addProduct(item: any, collectionName: string) {
    const productCollection = collection(this.firestore, collectionName);
    return addDoc(productCollection, item);
  }

  getProducts(collectionName: string): Observable<IProduct[]> {
    const productCollection = collection(this.firestore, collectionName);
    return collectionData(productCollection, { idField: 'id' }) as Observable<
      IProduct[]
    >;
  }

  deleteProduct(id: number | string) {
    const productDoc = doc(this.firestore, `products/${id}`);
    return deleteDoc(productDoc);
  }

  updateProduct(id: string | number, item: any, collectionName: string) {
    const productDoc = doc(this.firestore, `${collectionName}/${id}`);
    return updateDoc(productDoc, item);
  }
  getByID(id: number | string) {
    const docRef = doc(this.firestore, `accounts/${id}`);
    const snapshot = docRef;
  }
}
