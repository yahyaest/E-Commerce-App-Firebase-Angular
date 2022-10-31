import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  collectionData,
  doc,
  getDoc,
  query,
  where,
  getDocs,
} from '@angular/fire/firestore';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(public firestore: Firestore) {}

  getUsers() {
    const collectionReference = collection(this.firestore, 'users');
    return collectionData(collectionReference);
  }

  async getUser(email: string) {
     const collectionReference = collection(this.firestore, 'users');
     const q = query(collectionReference, where("email", "==", email))
    // const documentReference = doc(collectionReference, email);
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs[0]
  }

  addUser(user: User) {
    const collectionReference = collection(this.firestore, 'users');
    return addDoc(collectionReference, user);
  }
}
