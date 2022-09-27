import { Injectable } from '@angular/core';
import {
  collection,
  collectionData,
  DocumentData,
  Firestore,
  docData,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  setDoc,
  deleteDoc,
} from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private firestore: Firestore, private route: ActivatedRoute) {}

  getProducts() {
    let data: DocumentData[] = [];
    let laptopData: any = { laptop: [] };
    const collectionReference = collection(this.firestore, 'products');
    //return collectionData(collectionReference);

    return collectionData(collectionReference).pipe(
      map((result :any) => {
        for (let collection of result) {
          if ((collection as any).laptop2 || (collection as any).laptop) {
            (collection as any).laptop
              ? laptopData.laptop.push((collection as any).laptop)
              : laptopData.laptop.push((collection as any).laptop2);
          } else {
            data.push(collection);
          }
        }
        laptopData.laptop = [...laptopData.laptop[0], ...laptopData.laptop[1]];
        data.push(laptopData);
        return data;
      })
    );
  }

  getCollectionProducts(urlParam: string | null) {
    let collection_title: string | null = '';
    let collection_products: any[] = [];
    const collectionReference = collection(this.firestore, 'products');
    return collectionData(collectionReference).pipe(
      map((result: any) => {
        collection_title = urlParam;
        let laptopData = [];
        for (let collection of result) {
          let collectionTitle = Object.keys(collection)[0];
          if (collectionTitle === 'laptop' || collectionTitle === 'laptop2') {
            laptopData.push(collection[collectionTitle]);
          } else if (collectionTitle === collection_title) {
            collection_products = collection[collectionTitle] as Product[];
          }
        }
        if (urlParam === 'laptop') {
          collection_products = [...laptopData[0], ...laptopData[1]];
        }
        return { collection_title, collection_products };
      })
    );
  }

  getProduct(urlParam: any) {
    const collectionReference = collection(this.firestore, 'products');
    return collectionData(collectionReference).pipe(
      map((result : any) => {
        for (let collection of result) {
          let collectionTitle = Object.keys(collection)[0];

          for (let product of collection[collectionTitle]) {
            if (product.slug === urlParam.slug) {
              return product;
            }
          }
        }
      })
    );
  }
}

// getDocs(collectionReference).then((result) =>
//   console.log(result.docs[0].id, result.docs[0].data())
// );

// const documentReference = doc(collectionReference, '69p7YUXzsgghWLD6UGW5');
//   getDoc(documentReference).then((result) => {
//     console.log(result.data());
//   });

//     addDoc(collectionReference, type)
//       .then(() => console.log(type.laptop2.length))
//       .catch((err) => console.log(err));;

//   updateDoc(documentReference, { laptop: laptop })
//     .then(() => console.log('done....'))
//     .catch((err) => console.log(err));
// }
