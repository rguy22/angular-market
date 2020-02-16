import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ProductService } from "../../product.service";
import { UsersService } from "../../users.service";

@Component({
  selector: "app-edit-product",
  templateUrl: "./edit-product.component.html",
  styleUrls: ["./edit-product.component.css"]
})
export class EditProductComponent implements OnInit {
  editProductForm: FormGroup;
  userData;

  constructor(
    private productService: ProductService,
    private usersService: UsersService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<EditProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    // this.authService.loadToken();
    this.userData = this.usersService.userData;

    this.editProductForm = this.formBuilder.group({
      name: ["", Validators.required],
      // categoryId: ["", Validators.required],
      price: ["", Validators.required],
      picture: ["", Validators.required]
    });

    const editForm = this.editProductForm.controls;
    const editedData = this.data.editedData;

    // editForm.categoryId = editedData.categoryId;
    editForm.name.setValue(editedData.name);
    editForm.price.setValue(editedData.price);
    editForm.picture.setValue(editedData.picture);

    console.log(editForm, editedData);
  }

  save(productId) {
    const newFormValues = this.editProductForm.getRawValue();

    const editedProduct = {
      productName: newFormValues.name,
      // categoryId: newFormValues.categoryId,
      price: newFormValues.price,
      picture: newFormValues.picture
    };

    this.productService
      .editProduct(productId, editedProduct)
      .subscribe(data => {
        this.dialogRef.close(data);
      });
  }
}
