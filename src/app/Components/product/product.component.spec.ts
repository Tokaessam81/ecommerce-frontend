// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { ProductComponent } from './product.component';

// describe('ProductComponent', () => {
//   let component: ProductComponent;
//   let fixture: ComponentFixture<ProductComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports: [ProductComponent]
//     })
//     .compileComponents();
    
//     fixture = TestBed.createComponent(ProductComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
// src/app/components/products/products.component.ts
import { Component } from '@angular/core';
import { AuthService } from '../../Models/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  template: `
    <h2>Products Page</h2>
    <button (click)="logout()">Logout</button>
    <ul>
      <li *ngFor="let p of products">{{p}}</li>
    </ul>
  `
})
export class ProductCListomponent {
  products = ['Product 1', 'Product 2', 'Product 3'];

  constructor(private auth: AuthService, private router: Router) {}

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}

