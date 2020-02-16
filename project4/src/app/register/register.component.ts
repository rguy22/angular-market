import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { UsersService } from "../users.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatStepper } from "@angular/material";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  error;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  formValid = false;

  constructor(
    private router: Router,
    private usersService: UsersService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.firstFormGroup = this.formBuilder.group({
      userName: ["", Validators.required],
      password: ["", Validators.required]
    });
    this.secondFormGroup = this.formBuilder.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      city: ["", Validators.required],
      street: ["", Validators.required]
    });
  }

  goForward(stepper: MatStepper) {
    setTimeout(() => {
      if (this.formValid) {
        stepper.next();
      }
    }, 1500);
  }

  firstSubmit(stepper: MatStepper) {
    const signUpDetails = this.firstFormGroup.getRawValue();
    const userData = {
      userName: signUpDetails.userName,
      password: signUpDetails.password
    };

    this.usersService.firstRegister(userData).subscribe(
      data => {
        if (data.checked) {
          console.log("okk");
          this.formValid = true;
          this.goForward(stepper);
        }
      },
      err => {
        if (err.status === 400) {
          this.error = err.error.errors;
          if (this.error) {
            this.error.forEach(data => {
              alert(data.msg);
            });
          } else {
            alert(this.error.errors);
          }
          this.formValid = false;
        }
      }
    );
  }

  secondSubmit() {
    const userData = this.firstFormGroup.getRawValue();
    const userData2 = this.secondFormGroup.getRawValue();

    const user = {
      userName: userData.userName,
      password: userData.password,
      lastName: userData2.lastName,
      firstName: userData2.firstName,
      city: userData2.city,
      street: userData2.street,
      admin: false
    };
    console.log(user);
    this.usersService.registerUser(user).subscribe(
      user => {
        if (user) {
          this.usersService.storeUserLocalStorage(user);
          this.router.navigate(["/"]);
        }
      },
      err => {
        if (err.status === 400) {
          this.error = err.error.errors;
          if (this.error) {
            this.error.forEach(data => {
              alert(data.msg);
            });
          } else {
            alert(this.error.errors);
          }
        }
      }
    );
  }
}
