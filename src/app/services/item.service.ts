import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { map } from "rxjs/operators";
import { auth } from "firebase/app";
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from "@angular/fire/firestore";

import { switchMap } from "rxjs/operators";
import { User } from "../models/user";
import { Item } from "../models/item";
import { AuthService } from "./auth.service";
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";

// import { Item } from './Item';

@Injectable({
  providedIn: "root"
})
export class ItemService {
  itemsCollection: AngularFirestoreCollection<Item>;

  items: Observable<Item[]>;
  // itemss: Item;
  userId: string;
  user$: Observable<User>;
  itemDoc: AngularFirestoreDocument<Item>;

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private afs: AngularFirestore
  ) {}
  itemsFbCollection() {
    this.itemsCollection = this.afs.collection("items", ref =>
      ref.orderBy("title", "asc")
    );
  }

  getItems() {
    this.itemsFbCollection();

    return this.itemsCollection.snapshotChanges().pipe(
      map(changes => {
        return changes.map(a => {
          const data = a.payload.doc.data() as Item;
          data.id = a.payload.doc.id;
          console.log(data);
          return data;
        });
      })
    );
  }

  addItem(item: Item) {
    this.itemsFbCollection();
    this.itemsCollection.add(item);
  }

  deleteItem(item: Item) {
    this.itemDoc = this.afs.doc(`items/${item.id}`);
    this.itemDoc.delete();
  }

  updateItem(item: Item) {
    this.itemDoc = this.afs.doc(`items/${item.id}`);
    this.itemDoc.update(item);
  }
}
// valueChanges()get the data without the id
// this.items = this.afs.collection("items").valueChanges()
// with observable, we can to subscribe and return something
