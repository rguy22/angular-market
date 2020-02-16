import { Component, OnInit, Inject } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ProductService } from "../../product.service";
import { UsersService } from "../../users.service";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { User } from "../../../models/user";

@Component({
  selector: "app-add-product",
  templateUrl: "./add-product.component.html",
  styleUrls: ["./add-product.component.css"]
})
export class AddProductComponent implements OnInit {
  addProductForm: FormGroup;
  userData: User;

  constructor(
    private usersService: UsersService,
    private productService: ProductService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.usersService = this.usersService.userData;
    this.addProductForm = this.formBuilder.group({
      name: ["", Validators.required],
      price: ["", Validators.required],
      picture: ["", Validators.required]
    });
  }

  save() {
    const newProductValues = this.addProductForm.getRawValue();

    const newProduct = {
      productName: newProductValues.name,
      price: newProductValues.price,
      picture: newProductValues.picture
    };

    this.productService.addProducts(newProduct).subscribe(data => {
      this.dialogRef.close(data);
    });
  }
}
