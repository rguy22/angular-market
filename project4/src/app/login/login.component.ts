import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UsersService } from "../users.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private UsersService: UsersService,
    private router: Router
  ) {}

  loginForm: FormGroup;
  private isLoggedIn = false;
  private error;

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      userName: ["", Validators.required],
      password: ["", Validators.required]
    });
  }

  onSubmit() {
    const FormData = this.loginForm.getRawValue();

    const loginData = {
      userName: FormData.userName,
      password: FormData.password
    };

    this.UsersService.loginUser(loginData).subscribe(
      data => {
        if (data.admin === true) {
          this.UsersService.storeUserLocalStorage(data);
          this.UsersService.loadUserLocalStorage();
          this.router.navigate(["admin"]);
        } else {
          this.UsersService.storeUserLocalStorage(data);
          this.UsersService.loadUserLocalStorage();
          this.router.navigate([""]);
        }
      },
      err => {
        if (err.status === 400) {
          this.error = err.error.errors;
          if (!this.error) {
            console.log(err.error[0].msg);
            this.error = err.error[0].msg;
          }
          alert(this.error);
        }
        this.isLoggedIn = false;
      }
    );
  }
}
