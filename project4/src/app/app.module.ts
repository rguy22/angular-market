import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./login/login.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatCardModule } from "@angular/material/card";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { FlexLayoutModule } from "@angular/flex-layout";
import { AboutComponent } from "./about/about.component";
import { InformationComponent } from "./information/information.component";
import { ToolbarComponent } from "./toolbar/toolbar.component";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { RegisterComponent } from "./register/register.component";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { MatStepperModule } from "@angular/material/stepper";
import { ShopComponent } from "./shop/shop.component";
import { dialogBuy } from "./shop/shop.component";
import { MatDialogModule } from "@angular/material";
import { CartComponent } from "./cart/cart.component";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material";
import { AdminComponent } from "./admin/admin.component";
import { AdminGuard } from "./guards/admin-guard.service";
import { AuthGuard } from "./guards/auth-guard.service";
import { AddProductComponent } from "./admin/add-product/add-product.component";
import { EditProductComponent } from "./admin/edit-product/edit-product.component";
import { MatSidenavModule } from "@angular/material";

const appRoutes: Routes = [
  { path: "", component: HomeComponent },
  { path: "register", component: RegisterComponent },
  { path: "shop", component: ShopComponent, canActivate: [AuthGuard] },
  { path: "cart", component: CartComponent, canActivate: [AuthGuard] },
  { path: "admin", component: AdminComponent, canActivate: [AdminGuard] }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AboutComponent,
    InformationComponent,
    ToolbarComponent,
    RegisterComponent,
    HomeComponent,
    ShopComponent,
    dialogBuy,
    CartComponent,
    AdminComponent,
    AddProductComponent,
    EditProductComponent
  ],
  entryComponents: [dialogBuy, EditProductComponent, AddProductComponent],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatIconModule,
    MatStepperModule,
    HttpClientModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSidenavModule
  ],
  providers: [{ provide: MatDatepickerModule }, AdminGuard, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {}
