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
import { Observable } from 'rxjs';
import { IProduct } from '../model/item'; // your product model

@Injectable({ providedIn: 'root' })
export class ProductService {
  constructor(private firestore: Firestore) {}

  addProduct(item: IProduct) {
    const productCollection = collection(this.firestore, 'products');
    return addDoc(productCollection, item);
  }

  getProducts(): Observable<IProduct[]> {
    const productCollection = collection(this.firestore, 'products');
    return collectionData(productCollection, { idField: 'id' }) as Observable<
      IProduct[]
    >;
  }

  deleteProduct(id: string) {
    const productDoc = doc(this.firestore, `products/${id}`);
    return deleteDoc(productDoc);
  }

  updateProduct(id: string, item: Partial<IProduct>) {
    const productDoc = doc(this.firestore, `products/${id}`);
    return updateDoc(productDoc, item);
  }
}
