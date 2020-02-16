import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { ProductService } from "../product.service";
import { CartService } from "../cart.service";
import { UsersService } from "../users.service";
import { OrderService } from "../order.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.css"]
})
export class CartComponent implements OnInit {
  cartForm: FormGroup;
  products;
  cartProducts;

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private cartService: CartService,
    private usersService: UsersService,
    private orderService: OrderService,
    private router: Router
  ) {}

  ngOnInit() {
    this.cartProducts = this.cartService.userCart;
    this.getAllProducts();
    this.cartForm = this.formBuilder.group({
      costumerName: ["", Validators.required],
      city: ["", Validators.required],
      street: ["", Validators.required],
      date: ["", Validators.required],
      creditCard: ["", Validators.required],
      cardName: ["", Validators.required],
      expiration: ["", Validators.required],
      cvv: ["", Validators.required]
    });
  }

  getAllProducts() {
    this.productService.getProducts().subscribe(data => {
      this.products = data;
    });
  }

  cartSubmit() {
    let cartData = this.cartForm.getRawValue();
    this.cartService.loadCartLocalStorage();
    this.cartProducts = this.cartService.userCart;

    cartData.products = this.cartProducts;
    cartData.totalPrice = this.cartService.totalPrice;
    console.log(cartData);
    this.orderService.createOrder(cartData).subscribe(data => {
      alert("Order Completed");
      this.router.navigate([""]);
    });
  }
}
