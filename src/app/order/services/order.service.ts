import { Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  Firestore,
  getDoc,
  updateDoc,
} from '@angular/fire/firestore';
import { Order } from 'src/app/order/models/order.model';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(public firestore: Firestore) {}

  getOrders() {
    const collectionReference = collection(this.firestore, 'orders');
    return collectionData(collectionReference);
  }

  getOrder(orderId: string) {
    const collectionReference = collection(this.firestore, 'orders');
    const documentReference = doc(collectionReference, orderId);
    return getDoc(documentReference);
  }

  addOrder(order: Order) {
    const collectionReference = collection(this.firestore, 'orders');
    return addDoc(collectionReference, order);
  }

  updateOrder(orderId: string, order: any) {
    const collectionReference = collection(this.firestore, 'orders');
    const documentReference = doc(collectionReference, orderId);
    return updateDoc(documentReference, order);
  }

  deleteOrder(orderId: string) {
    const collectionReference = collection(this.firestore, 'orders');
    const documentReference = doc(collectionReference, orderId);
    return deleteDoc(documentReference);
  }
}
