import { Component, OnInit } from "@angular/core";
import { UsersService } from "../users.service";
import { ProductService } from "../product.service";
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef
} from "@angular/material/dialog";
import { AddProductComponent } from "../admin/add-product/add-product.component";
import { EditProductComponent } from "../admin/edit-product/edit-product.component";

@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.css"]
})
export class AdminComponent implements OnInit {
  products: [];

  constructor(
    private usersService: UsersService,
    private productService: ProductService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.getAllProducts();
  }

  getAllProducts() {
    this.productService.getProducts().subscribe(data => {
      this.products = data;
      console.log(data);
    });
  }

  openEditDialog(product): void {
    const dialogRef = this.dialog.open(EditProductComponent, {
      data: {
        editedData: product
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getAllProducts();
    });
  }

  openAddDialog(newProductData): void {
    const dialogRef = this.dialog.open(AddProductComponent, {
      data: {
        newData: newProductData
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getAllProducts();
    });
  }
}
