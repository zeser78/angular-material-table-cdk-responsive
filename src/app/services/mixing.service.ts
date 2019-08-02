import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from "@angular/fire/firestore";
import { AngularFireAuth } from "@angular/fire/auth";
import { Observable, of } from "rxjs";
import { switchMap } from "rxjs/operators";
import { map } from "rxjs/operators";
import { auth, database } from "firebase/app";

import { User } from "../models/user";
import { Item } from "../models/item";

@Injectable({
  providedIn: "root"
})
export class MixingService {
  userId: string;
  user$: Observable<User>;
  itemsCollection: AngularFirestoreCollection<Item>;

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private afs: AngularFirestore
  ) {
    // this.user$ = this.afAuth.authState.subscribe(user => {
    //   console.log("dd1" + this.user$ + user + user.uid);
    //   if (user) {
    //     this.userId = user.uid;
    //     return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
    //   } else {
    //     return of(null);
    //   }
    // });
    // this.user$ = this.afAuth.authState.pipe(
    //   switchMap(user => {
    //     console.log("first" + this.userId);
    //     if (user) {
    //       console.log("second" + this.userId);
    //       this.userId = user.uid;
    //       return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
    //     } else {
    //       return of(null);
    //     }
    //   })
    // );
    // this.user$.subscribe(user => {
    //   if (user) this.userId = user.uid;
    // });
    // this.itemsCollection = this.afs.collection("items", ref =>
    //   ref.where("uid", "==", "1234")
    // );
  }

  getItems() {
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        console.log("first" + this.userId);
        if (user) {
          console.log("second" + this.userId);
          this.userId = user.uid;
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
    // this.user$.subscribe(user => {
    //   if (user) this.userId = user.uid;
    // });

    return this.afs
      .collection("items", ref => ref.where("uid", "==", "1234"))
      .snapshotChanges()
      .pipe(
        map(changes => {
          console.log("fifth => " + changes + this.user$);
          return changes.map(a => {
            console.log("fifth => " + a + this.user$);
          });
        })
      );
  }

  // getItems() {
  //   console.log("third" + this.userId);
  //   return this.afs
  //     .collection("items", ref => ref.where("uid", "==", "1234"))
  //     .snapshotChanges()
  //     .pipe(
  //       map(changes => {
  //         return changes.map(a => {
  //           const data = a.payload.doc.data() as Item;
  //           data.id = a.payload.doc.id;
  //           return data;
  //         });
  //       })
  //     );
  //   console.log("done");
  // }

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
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(
      `users/${user.uid}`
    );
    const data = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName
    };

    return userRef.set(data, { merge: true });
  }
}
