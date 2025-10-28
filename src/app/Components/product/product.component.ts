import { Component, OnInit } from '@angular/core';
import { IProduct } from '../../Models/interfaces/Iproduct';
import { ProductService } from '../../Models/services/product.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService } from '../../Models/services/Cart.Service';

@Component({
  selector: 'app-product-list',
  imports:[CommonModule,RouterModule],
  standalone:true,
  templateUrl: '../product/product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  products$!: Observable<IProduct[]>;
  constructor(private productService: ProductService, private cartService: CartService) {}
 userId = 1; // ✅ أضفناها هنا مؤقتًا
  ngOnInit() {
    this.products$ = this.productService.getProducts();
  }
  handleImageError(event: Event) {
    const img = event.target as HTMLImageElement;
    img.src = 'assets/default.png';
  }
addToCart(p: any) {
    this.cartService.addToCart(this.userId, p.id, 1).subscribe({
      next: () => {
        this.cartService.incrementCount();
        // ✅ تحديث العدد من السيرفر بعد الإضافة
        this.cartService.getCartCount(this.userId).subscribe({
          next: count => this.cartService.updateCountFromServer(count)
        });
      },
      error: (err) => console.error(err)
    });
  }
}

