import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../Env/Enviroment';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/Cart`;

  cartCount = signal<number>(0);

  constructor() {
    this.loadSavedCount(); // ✅ تحميل العدد من localStorage عند البداية
  }

  getCart(userId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${userId}`);
  }

  addToCart(userId: number, productId: number, quantity: number = 1): Observable<any> {
    return this.http.post(`${this.baseUrl}/add?userId=${userId}&productId=${productId}&quantity=${quantity}`, {});
  }

  removeFromCart(userId: number, productId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/remove?userId=${userId}&productId=${productId}`);
  }

  clearCart(userId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/clear/${userId}`);
  }

  incrementCount() {
    this.cartCount.set(this.cartCount() + 1);
    localStorage.setItem('cartCount', this.cartCount().toString());
  }

  decrementCount() {
    if (this.cartCount() > 0) {
      this.cartCount.set(this.cartCount() - 1);
      localStorage.setItem('cartCount', this.cartCount().toString());
    }
  }

  getCartCount(userId: number): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/GetCartItemsCount/${userId}`);
  }

  updateCountFromServer(count: number) {
    this.cartCount.set(count);
    localStorage.setItem('cartCount', count.toString());
  }

  loadSavedCount() {
    const saved = localStorage.getItem('cartCount');
    if (saved) this.cartCount.set(+saved);
  }
}
