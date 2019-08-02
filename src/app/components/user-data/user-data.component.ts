import { Component, OnInit } from "@angular/core";
import { CustomDataService } from "src/app/services/custom-data.service";

@Component({
  selector: "app-user-data",
  templateUrl: "./user-data.component.html",
  styleUrls: ["./user-data.component.css"]
})
export class UserDataComponent implements OnInit {
  constructor(public auth: CustomDataService) {}

  ngOnInit() {}
}
