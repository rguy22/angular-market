import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from "../models/user";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json"
  })
};

@Injectable({
  providedIn: "root"
})
export class UsersService {
  constructor(private http: HttpClient) {}

  loggedUser: any;
  userData: any;

  loginUser(loginData): Observable<User> {
    return this.http.post<User>(
      "http://localhost:4000/users",
      loginData,
      httpOptions
    );
  }

  storeUserLocalStorage(data) {
    localStorage.setItem("user", JSON.stringify(data));
    console.log("localstorage");
    this.loggedUser = true;
    this.userData = data;
  }

  loadUserLocalStorage() {
    this.userData = JSON.parse(localStorage.getItem("user"));
  }

  logOutUser() {
    this.loggedUser = false;
    this.userData = null;
    localStorage.clear();
  }

  firstRegister(details) {
    return this.http.post<any>(
      "http://localhost:4000/users/firstRegister",
      details,
      httpOptions
    );
  }

  registerUser(user): Observable<User> {
    return this.http.post<User>(
      "http://localhost:4000/users/register",
      user,
      httpOptions
    );
  }
}
