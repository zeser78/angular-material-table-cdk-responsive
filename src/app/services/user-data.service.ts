// import { Injectable } from "@angular/core";
// import { AngularFireDatabase, AngularFireList } from "@angular/fire/database";
// import { AngularFireAuth } from "@angular/fire/auth";
// import { Item } from "../models/item";

// @Injectable({
//   providedIn: "root"
// })
// export class UserDataService {
//   items: AngularFireList<Item[]> = null; // list of objects
//   userId: string;
//   // method use it like twitter feed
//   constructor(
//     private db: AngularFireDatabase,
//     private afAuth: AngularFireAuth
//   ) {
//     this.afAuth.authState.subscribe(user => {
//       if (user) this.userId = user.uid;
//     });
//   }

//   getItemsList(): AngularFireList<Item[]> {
//     if (!this.userId) return;
//     this.items = this.db.list(`items/${this.userId}`);
//     return this.items;
//   }

//   // Create a brand new Item
//   createItem(item: Item) {
//     // item.userId = this.userId;
//     // this.items.push(item);
//   }
// }
// // create a auth service
// // create interface
// // a variable will be  Observable
