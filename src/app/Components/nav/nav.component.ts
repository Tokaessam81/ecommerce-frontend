import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, computed } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CartService } from '../../Models/services/Cart.Service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  private cartService = inject(CartService);
  cartCount = computed(() => this.cartService.cartCount()); // ✅ استخدام signal صح
  userId = 1;

  constructor(private router: Router) {}

  ngOnInit() {
    // ✅ تحميل العدد من السيرفر أول مرة
    this.cartService.getCartCount(this.userId).subscribe(count => {
      this.cartService.updateCountFromServer(count);
    });
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
