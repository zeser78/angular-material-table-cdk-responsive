import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatButtonModule, MatTableModule } from "@angular/material";
import { CdkTableModule } from "@angular/cdk/table";

@NgModule({
  declarations: [],
  imports: [CommonModule, MatButtonModule, MatTableModule, CdkTableModule],
  exports: [MatButtonModule, MatTableModule, CdkTableModule]
})
export class MaterialModule {}
