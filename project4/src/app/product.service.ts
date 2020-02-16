import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Product } from "../models/product";

@Injectable({
  providedIn: "root"
})
export class ProductService {
  constructor(private http: HttpClient) {}

  getProducts(): Observable<any> {
    return this.http.get<any>(`http://localhost:4000/products`);
  }

  addProducts(product): Observable<Product> {
    return this.http.post<Product>(`http://localhost:4000/products`, product);
  }

  editProduct(id, product): Observable<Product> {
    return this.http.put<Product>(
      `http://localhost:4000/products/${id}`,
      product
    );
  }
}
