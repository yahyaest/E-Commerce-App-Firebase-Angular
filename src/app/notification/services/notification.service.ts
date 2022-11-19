import { Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  Firestore,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from '@angular/fire/firestore';
import { Notification } from '../models/notification.model';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(public firestore: Firestore) {}

  getNotifications() {
    const collectionReference = collection(this.firestore, 'notifications');
    return collectionData(collectionReference);
  }

  getNotification(notificationId: string) {
    const collectionReference = collection(this.firestore, 'notifications');
    const documentReference = doc(collectionReference, notificationId);
    return getDoc(documentReference);
  }

  async getUserNotifications(userEmail:string){
    const collectionReference = collection(this.firestore, 'notifications');
    const q = query(collectionReference, where("userEmail", "==", userEmail))
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs
  }

  addNotification(notification: Notification) {
    const collectionReference = collection(this.firestore, 'notifications');
    return addDoc(collectionReference, notification);
  }

  updateNotification(notificationId: string, notification: any) {
    const collectionReference = collection(this.firestore, 'notifications');
    const documentReference = doc(collectionReference, notificationId);
    return updateDoc(documentReference, notification);
  }

  deleteNotification(notificationId: string) {
    const collectionReference = collection(this.firestore, 'notifications');
    const documentReference = doc(collectionReference, notificationId);
    return deleteDoc(documentReference);
  }
}
