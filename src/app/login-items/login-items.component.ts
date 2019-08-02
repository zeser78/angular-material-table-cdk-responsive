import { Component, OnInit, OnDestroy } from "@angular/core";
import { map } from "rxjs/operators";
import { MixingService } from "../services/mixing.service";
import { Router } from "@angular/router";

import { auth } from "firebase/app";
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from "@angular/fire/firestore";
import { AngularFireAuth } from "@angular/fire/auth";
import { switchMap } from "rxjs/operators";
import { Observable, of, Subscription } from "rxjs";

import { ItemService } from "../services/item.service";
import { Item } from "../models/item";
import { User } from "../models/user";

@Component({
  selector: "app-login-items",
  templateUrl: "./login-items.component.html",
  styleUrls: ["./login-items.component.css"]
})
export class LoginItemsComponent implements OnInit {
  items: Item[];
  // items: Observable<Item[]>;
  itemsCollection: AngularFirestoreCollection<Item>;
  user$: Observable<User>;
  userId: string;

  constructor(
    private afs: AngularFirestore,
    private afAuth: AngularFireAuth,
    private itemService: ItemService,
    private router: Router
  ) {}
  // now to add auth here, and combined to see how this work
  ngOnInit() {
    // this.fetchItems(this.userId);

    //
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );

    this.user$.subscribe(user => {
      this.userId = user.uid;
      console.log("working 1 =>" + this.userId + typeof this.userId);
      this.fetchItemOne(this.userId);
    });

    console.log(
      "not working, is outside =>" + this.userId + typeof this.userId
    );
    //

    // return this.afAuth.authState.pipe(
    //   switchMap(user => {
    //     if (user) {
    //       // return this.afs.doc<Item>(`items/${user.uid}`).valueChanges();
    //       return this.afs
    //         .collection("items")
    //         .valueChanges()
    //         .subscribe(items => {
    //           console.log(this.items);
    //           this.items = items;
    //           console.log(this.items);
    //         });
    //     } else {
    //       return of(null);
    //     }
    //   })
    // );
    // .subscribe(items => {
    //   console.log(this.items);
    //   this.items = items;
    //   console.log(this.items);
    // });

    // return (
    //   this.afs
    //     .collection("items")
    //     // .valueChanges()
    //     // .subscribe(result => {
    //     //   this.items = result;
    //     //   console.log(result);
    //     // });
    //     .snapshotChanges()
    //     .pipe(
    //       map(changes => {
    //         return changes.map(a => {
    //           const data = a.payload.doc.data() as Item;
    //           data.id = a.payload.doc.id;
    //           console.log(data);
    //           return data;
    //         });
    //       })
    //     )
    //     .subscribe(items => {
    //       console.log(this.items);
    //       this.items = items;
    //     })
    // );
    // this.mixingService.getItems();
    // console.log("done first");
    // this.mixingService.getItems().subscribe(items => {
    //   this.items = items;
    // });
  }

  // fetchItems(userId: string) {
  //   return this.afs
  //     .collection("items")
  //     .valueChanges()
  //     .subscribe(item => {
  //       this.items = item;
  //     });
  // }

  fetchItemOne(userId: string) {
    return this.afs
      .collection("items", ref => ref.where("uid", "==", userId))
      .valueChanges()
      .subscribe(item => {
        this.items = item;
      });
  }

  async googleSignin() {
    const provider = new auth.GoogleAuthProvider();
    const credential = await this.afAuth.auth.signInWithPopup(provider);
    return this.updateUserData(credential.user);
  }

  async signOut() {
    await this.afAuth.auth.signOut();
    return this.router.navigate(["/"]);
  }

  private updateUserData(user) {
    console.log(user);
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(
      `users/${user.uid}`
    );
    const data = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName
    };
    this.fetchItemOne(this.userId);
    console.log(user);
    return userRef.set(data, { merge: true });
  }
}
