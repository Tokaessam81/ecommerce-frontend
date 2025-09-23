// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { LoginComponent } from './Components/login-component/login-component.component';
import { ProductComponent } from './Components/product/product.component';
import { authGuard } from './guards/auth.guard';
import { ProductDetailsComponent } from './Components/product-details/product-details.component';
import { RegisterComponent } from './Components/register/register.component';
import { AddProductComponent } from './Components/add-product/add-product.component';
import { UpdateProductComponent } from './Components/update-product/update-product.component';
import { DeleteProductComponent } from './Components/delete-product/delete-product.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
   {path: 'register', component: RegisterComponent },
  { path: 'products', component: ProductComponent, canActivate: [authGuard] },
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  { path: 'products/:id', component: ProductDetailsComponent },
  { path: 'add-product', component: AddProductComponent, canActivate: [authGuard] }
  ,{ path: 'update-product/:id', component: UpdateProductComponent, canActivate: [authGuard] }
  ,{ path: 'delete-product/:id', component: DeleteProductComponent, canActivate: [authGuard] }
];
