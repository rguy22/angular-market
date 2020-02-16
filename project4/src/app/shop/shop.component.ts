import { Component, OnInit, Inject } from "@angular/core";
import { ProductService } from "../product.service";
import { CartService } from "../cart.service";
import { UsersService } from "../users.service";
import { Product } from "../../models/product";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from "@angular/material/dialog";

@Component({
  selector: "app-shop",
  templateUrl: "./shop.component.html",
  styleUrls: ["./shop.component.css"]
})
export class ShopComponent implements OnInit {
  sidebarOpen = true;

  products: Product[];
  product: Product;

  userData;
  public cartId;
  cartProducts: Product[] = [];
  quantity;
  userId;
  totalPrice = 0;

  constructor(
    public dialog: MatDialog,
    private productService: ProductService,
    private cartService: CartService,
    private usersService: UsersService
  ) {}

  openDialog(item): void {
    this.product = item;
    const dialogRef = this.dialog.open(dialogBuy, {
      width: "250px",
      data: { data: this.quantity, product: this.product }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.product.quantity = result;
      this.cartService.loadCartLocalStorage();

      this.addToCart(this.product);
      this.addProductCart(this.product);

      this.setPrice();

      this.cartService.storeCartLocalStorage(this.cartProducts);
    });
  }

  ngOnInit() {
    this.usersService.loadUserLocalStorage();
    this.userData = this.usersService.userData;
    this.userId = this.usersService.userData._id;

    this.getAllProducts();

    this.cartService.loadCartLocalStorage();
    this.cartProducts = this.cartService.userCart;
  }

  addProductCart(product) {
    if (this.cartProducts === null || this.cartProducts === undefined) {
      this.cartProducts = [];
    }
    const cartProduct = this.cartProducts.find(
      prod => prod._id === product._id
    );
    if (cartProduct === undefined) {
      this.cartProducts.push(this.product);
      this.setPrice();
    } else if (cartProduct._id === product._id) {
      this.deleteProductCart(cartProduct);
      this.product.quantity = cartProduct.quantity;

      this.cartProducts.push(this.product);
      this.setPrice();
    }
  }

  deleteProductCart(product) {
    const cartId = this.cartId;
    const newCartProducts = this.cartProducts.filter(
      prod => prod._id !== product._id
    );

    this.cartService.deleteProductCart(cartId, product._id).subscribe(data => {
      console.log(data);
    });
    this.cartProducts = newCartProducts;
    this.setPrice();
    this.cartService.storeCartLocalStorage(this.cartProducts);
    this.cartService.loadCartLocalStorage();
  }

  addToCart(data) {
    if (data.quantity === null) {
      return;
    }

    if (data.quantity === 0) {
      console.log("quantity 0");
      this.deleteProductCart(data);
      return;
    }

    if (this.cartProducts === undefined || this.cartProducts === null) {
      this.cartService.NewCart(this.userId).subscribe(cartData => {
        this.cartId = cartData.cart._id;
        this.cartService
          .addProductToCart(this.cartId, data)
          .subscribe(dataa => {
            console.log(dataa);
            this.updateLocalStorage();
            this.setPrice();
          });
      });
    } else {
      this.cartService.loadCartLocalStorage();
      const cartId = this.cartId;
      this.cartService.addProductToCart(cartId, data).subscribe(dataa => {
        console.log(dataa);
        this.updateLocalStorage();
        this.setPrice();
      });
    }
  }

  setPrice() {
    if (this.cartProducts === null || this.cartProducts === undefined) {
      this.cartProducts = [];
    }
    this.totalPrice = 0;
    for (let i = 0; i < this.cartProducts.length; i++) {
      this.totalPrice +=
        this.cartProducts[i].quantity * this.cartProducts[i].price;
    }
  }

  updateLocalStorage() {
    this.cartService.storeCartLocalStorage(this.cartProducts);
    this.cartService.loadCartLocalStorage();
  }

  getAllProducts() {
    this.productService.getProducts().subscribe(data => {
      this.products = data;
    });
  }
}

@Component({
  selector: "dialog-buy",
  templateUrl: "dialog-buy.html"
})
export class dialogBuy {
  constructor(
    public dialogRef: MatDialogRef<dialogBuy>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
