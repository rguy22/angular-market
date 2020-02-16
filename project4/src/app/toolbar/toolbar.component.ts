import { Component, OnInit } from "@angular/core";
import { UsersService } from "../users.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-toolbar",
  templateUrl: "./toolbar.component.html",
  styleUrls: ["./toolbar.component.css"]
})
export class ToolbarComponent implements OnInit {
  constructor(private usersService: UsersService, private router: Router) {}

  ngOnInit() {}

  onLogOut() {
    this.usersService.logOutUser();
    this.router.navigate([""]);
  }
}
