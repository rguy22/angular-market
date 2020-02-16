import { UsersService } from "../users.service";
import { Injectable } from "@angular/core";
import { CanActivate, Router, Route } from "@angular/router";

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private usersService: UsersService, private _router: Router) {}

  canActivate() {
    this.usersService.loadUserLocalStorage();
    if (
      this.usersService.loggedUser === true &&
      this.usersService.userData.admin === true
    ) {
      console.log("true");
      return true;
    }

    // navigate to login page
    this._router.navigate(["/"]);
    // you can save redirect url so after authing we can move them back to the page they requested
    return false;
  }
}
