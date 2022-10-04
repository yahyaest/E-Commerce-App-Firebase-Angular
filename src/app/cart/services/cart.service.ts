import { Injectable } from '@angular/core';
import {
  collection,
  collectionData,
  Firestore,
  addDoc,
  doc,
  getDoc,
  updateDoc,
  deleteDoc
} from '@angular/fire/firestore';
import { Cart } from '../models/cart.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private firestore: Firestore) {}

  getCarts() {
    const collectionReference = collection(this.firestore, 'carts');
    return collectionData(collectionReference);
  }

  getCart(){
    const cartId = localStorage.getItem('cartId');
    const collectionReference = collection(this.firestore, 'carts');
    const documentReference = doc(collectionReference, cartId as string)
   return getDoc(documentReference)
  }

  addCart(cart: Cart) {
    const collectionReference = collection(this.firestore, 'carts');
    return addDoc(collectionReference, cart).then((result) =>
      localStorage.setItem('cartId', result.id)
    );
  }

  updateCart(cart: any){
    const cartId = localStorage.getItem('cartId');
    const collectionReference = collection(this.firestore, 'carts');
    const documentReference = doc(collectionReference, cartId as string)
    return updateDoc(documentReference,cart)
    
  }

  deleteCart(){
    const cartId = localStorage.getItem('cartId');
    const collectionReference = collection(this.firestore, 'carts');
    const documentReference = doc(collectionReference, cartId as string)
    localStorage.removeItem('cartId')
    return deleteDoc(documentReference)
  }
}
