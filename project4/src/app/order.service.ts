import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class OrderService {
  constructor(private http: HttpClient) {}

  getOrders(): Observable<any> {
    return this.http.get<any>(`http://localhost:4000/order`);
  }

  createOrder(order): Observable<any> {
    return this.http.post<any>(
      `http://localhost:4000/order/createOrder`,
      order
    );
  }
}
