import { Component, OnInit } from "@angular/core";
import { MixingService } from "src/app/services/mixing.service";

@Component({
  selector: "app-login-user-data",
  templateUrl: "./login-user-data.component.html",
  styleUrls: ["./login-user-data.component.css"]
})
export class LoginUserDataComponent implements OnInit {
  constructor(public auth: MixingService) {}

  ngOnInit() {
    console.log("login-user-data");
  }
}
