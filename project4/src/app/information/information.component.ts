import { Component, OnInit } from "@angular/core";
import { ProductService } from "../product.service";
import { OrderService } from "../order.service";

@Component({
  selector: "app-information",
  templateUrl: "./information.component.html",
  styleUrls: ["./information.component.css"]
})
export class InformationComponent implements OnInit {
  constructor(
    private productService: ProductService,
    private orderService: OrderService
  ) {}

  numberOfProducts: Number;
  numberOfOrders: Number;

  ngOnInit() {
    this.productService.getProducts().subscribe(data => {
      this.numberOfProducts = data.length;
    });
    this.orderService.getOrders().subscribe(data => {
      this.numberOfOrders = data.length;
    });
  }
}
