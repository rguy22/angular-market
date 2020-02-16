import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Cart } from "../models/cart";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json"
  })
};

@Injectable({
  providedIn: "root"
})
export class CartService {
  userCart;
  cartId;
  totalPrice;

  constructor(private http: HttpClient) {}

  NewCart(userId): Observable<any> {
    console.log(userId);
    return this.http.post<any>(`http://localhost:4000/cart/newCart`, {
      userId: userId
    });
  }

  storeCartLocalStorage = cartData => {
    console.log("localstorage in");
    localStorage.setItem("cart", JSON.stringify(cartData));
  };

  loadCartLocalStorage() {
    console.log("localstorage out");
    this.userCart = JSON.parse(localStorage.getItem("cart"));
    console.log(this.userCart);
  }

  updatePrice(totalPrice, cartId) {
    this.totalPrice = totalPrice;
    return this.http.put<Cart>(
      `http://localhost:4000/cart/setTotalPrice/${cartId}`,
      totalPrice
    );
  }

  addProductToCart(cartId, product): Observable<any> {
    this.cartId = cartId;
    console.log("in");
    return this.http.put<any>(
      `http://localhost:4000/cart/addProductToCart/${cartId}`,
      product,
      httpOptions
    );
  }

  deleteProductCart(cartId, productId): Observable<any> {
    return this.http.put<any>(
      `http://localhost:4000/cart/deleteProductCart/${cartId}`,
      productId
    );
  }
}
