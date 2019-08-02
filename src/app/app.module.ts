import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { environment } from "src/environments/environment";

import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";

import { AngularFireStorageModule } from "@angular/fire/storage";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ItemsComponent } from "./components/items/items.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { AddItemComponent } from "./components/add-item/add-item.component";
import { LoginUsersComponent } from "./components/login-users/login-users.component";
import { HomeComponent } from "./home/home.component";
import { UserDataComponent } from './components/user-data/user-data.component';
import { SuperSecretComponent } from './super-secret/super-secret.component';
import { LoginItemsComponent } from './login-items/login-items.component';
import { LoginUserDataComponent } from './components/login-user-data/login-user-data.component';

@NgModule({
  declarations: [
    AppComponent,
    ItemsComponent,
    NavbarComponent,
    AddItemComponent,
    LoginUsersComponent,
    HomeComponent,
    UserDataComponent,
    SuperSecretComponent,
    LoginItemsComponent,
    LoginUserDataComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
