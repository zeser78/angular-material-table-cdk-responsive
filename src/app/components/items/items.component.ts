import { Component, OnInit } from "@angular/core";
import { ItemService } from "src/app/services/item.service";
import { Item } from "src/app/models/item";

@Component({
  selector: "app-items",
  templateUrl: "./items.component.html",
  styleUrls: ["./items.component.css"]
})
export class ItemsComponent implements OnInit {
  items: Item[];
  editState: boolean = false;
  itemToEdit: Item;

  constructor(private itemService: ItemService) {}

  ngOnInit() {
    // this.itemService.getItems();
    this.itemService.getItems().subscribe(items => {
      console.log(items);
      this.items = items;
    });
  }

  deleteItem(event, item: Item) {
    this.itemService.deleteItem(item);
    this.clearState();
  }

  editItem(event, item: Item) {
    this.editState = true;
    this.itemToEdit = item;
  }

  clearState() {
    this.editState = false;
    this.itemToEdit = null;
  }

  updateItem(item: Item) {
    console.log(item);
    this.itemService.updateItem(item);
    this.clearState();
  }
}
