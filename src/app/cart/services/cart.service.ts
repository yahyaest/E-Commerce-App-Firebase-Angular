import { Injectable } from '@angular/core';
import {
  collection,
  collectionData,
  Firestore,
  addDoc,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
} from '@angular/fire/firestore';
import { Cart } from '../models/cart.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(public firestore: Firestore) {}

  getCarts() {
    const collectionReference = collection(this.firestore, 'carts');
    return collectionData(collectionReference);
  }

  getCart(cartId: string) {
    const collectionReference = collection(this.firestore, 'carts');
    const documentReference = doc(collectionReference, cartId);
    return getDoc(documentReference);
  }

  addCart(cart: Cart) {
    const collectionReference = collection(this.firestore, 'carts');
    return addDoc(collectionReference, cart);
  }

  updateCart(cartId: string, cart: any) {
    const collectionReference = collection(this.firestore, 'carts');
    const documentReference = doc(collectionReference, cartId);
    return updateDoc(documentReference, cart);
  }

  deleteCart(cartId: string) {
    const collectionReference = collection(this.firestore, 'carts');
    const documentReference = doc(collectionReference, cartId);
    return deleteDoc(documentReference);
  }
}
