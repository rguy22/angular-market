import { Injectable } from "@angular/core";
import { Router, CanActivate } from "@angular/router";
import { UsersService } from "../users.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private usersService: UsersService, private router: Router) {}

  canActivate() {
    if (this.usersService.loggedUser) {
      return true;
    } else {
      this.router.navigate([""]);
      return false;
    }
  }
}
