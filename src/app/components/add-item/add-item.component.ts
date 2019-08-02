import { Component, OnInit } from "@angular/core";
import { ItemService } from "src/app/services/item.service";
import { Item } from "src/app/models/item";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-add-item",
  templateUrl: "./add-item.component.html",
  styleUrls: ["./add-item.component.css"]
})
export class AddItemComponent implements OnInit {
  item: Item = {
    uid: "",
    title: "",
    description: ""
  };

  constructor(
    private itemService: ItemService,
    private authService: AuthService
  ) {}

  ngOnInit() {}

  onSubmit() {
    if (this.item.title != "" && this.item.description != "") {
      // this.itemService.addItem(this.item);
      // this.item.uid = this.authService.user$;
      this.item.title = "";
      this.item.description = "";
    }
  }
}
