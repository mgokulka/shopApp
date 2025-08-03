import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
  collectionData,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor(private firestore: Firestore) {
    // this.collectionRef = collection(this.firestore, 'accounts');
  }

  createAccount(data: any): Promise<any> {
    const collectionRef = collection(this.firestore, 'accounts');

    return addDoc(collectionRef, data);
  }

  getAccounts() {
    const collectionRef = collection(this.firestore, 'accounts');

    return collectionData(collectionRef, { idField: 'id' });
  }

  deleteAccount(accountId: string): Promise<void> {
    const collectionRef = collection(this.firestore, 'accounts');

    const docRef = doc(collectionRef.firestore, `accounts/${accountId}`);
    return deleteDoc(docRef);
  }
  updateAccount(id: string, data: any): Promise<void> {
    const collectionRef = collection(this.firestore, 'accounts');

    const docRef = doc(collectionRef.firestore, `accounts/${id}`);
    return updateDoc(docRef, data);
  }
  // Additional CRUD methods will go here later...
}
