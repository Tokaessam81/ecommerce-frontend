import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { CartService } from '../../Models/services/Cart.Service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, CurrencyPipe],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  private cartService = inject(CartService);

  userId = 1; // مؤقتًا - هنبقى نجيبه من الـ login بعدين
  cart = signal<any>(null);

  ngOnInit() {
    this.loadCart();
  }

  loadCart() {
    this.cartService.getCart(this.userId).subscribe({
      next: (data) => this.cart.set(data),
      error: (err) => console.error(err)
    });
  }
  addToCart(productId: number) {
    this.cartService.addToCart(this.userId, productId, 1).subscribe({
      next: () => this.loadCart()
    });
  }
  removeFromCart(productId: number) {
  this.cartService.removeFromCart(this.userId, productId).subscribe({
    next: () => {
      this.loadCart();
      // ✅ نحدث العدد بعد الحذف
      this.cartService.getCartCount(this.userId).subscribe({
        next: count => this.cartService.updateCountFromServer(count)
      });
    }
  });
}

clearCart() {
  this.cartService.clearCart(this.userId).subscribe({
    next: () => {
      this.loadCart();
      // ✅ نحدث العدد بعد التفريغ
      this.cartService.getCartCount(this.userId).subscribe({
        next: count => this.cartService.updateCountFromServer(count)
      });
    }
  });
}

 
}
