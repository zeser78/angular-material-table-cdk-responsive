import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AppComponent } from "./app.component";
import { LoginUsersComponent } from "./components/login-users/login-users.component";
import { HomeComponent } from "./home/home.component";
import { SuperSecretComponent } from "./super-secret/super-secret.component";
import { AuthGuard } from "./services/auth.guard";
import { UserDataComponent } from "./components/user-data/user-data.component";
import { LoginUserDataComponent } from "./components/login-user-data/login-user-data.component";
import { LoginItemsComponent } from "./login-items/login-items.component";

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "custom", component: UserDataComponent },
  { path: "mixing", component: LoginItemsComponent },
  { path: "login", component: LoginUsersComponent },
  { path: "secret", component: SuperSecretComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
