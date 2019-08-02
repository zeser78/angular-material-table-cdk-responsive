import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import {
  AngularFirestore,
  AngularFirestoreDocument
} from "@angular/fire/firestore";
import { AngularFireAuth } from "@angular/fire/auth";
import { Observable, of } from "rxjs";
import { switchMap } from "rxjs/operators";
import { map } from "rxjs/operators";
import { auth } from "firebase/app";
import { Item } from "./Item";
import { User } from "../models/user";

@Injectable({
  providedIn: "root"
})
export class CustomDataService {
  user: Observable<User>;

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private afs: AngularFirestore
  ) {
    // Get auth data, then get firestore user document || null
    // Observable under construction because any data can get in realtime
    // switchMap gave us user credential
    this.user = this.afAuth.authState.pipe(
      switchMap(user => {
        console.log("inside => " + user);
        if (user) {
          console.log("inside2 => " + user);
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

  async googleSignin() {
    console.log("custom => " + this.user);
    const provider = new auth.GoogleAuthProvider();
    const credential = await this.afAuth.auth.signInWithPopup(provider);
    return this.updateUserData(credential.user);
  }

  async signOut() {
    await this.afAuth.auth.signOut();
    return this.router.navigate(["/custom"]);
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
