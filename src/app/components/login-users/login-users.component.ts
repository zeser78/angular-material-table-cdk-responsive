import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-login-users",
  templateUrl: "./login-users.component.html",
  styleUrls: ["./login-users.component.css"]
})
export class LoginUsersComponent implements OnInit {
  constructor(public auth: AuthService) {}

  ngOnInit() {}
}
