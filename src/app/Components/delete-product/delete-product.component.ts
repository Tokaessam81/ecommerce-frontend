import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../Models/services/product.service';

@Component({
  selector: 'app-delete-product',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './delete-product.component.html',
})
export class DeleteProductComponent {
  loading = false;
  error: string = '';
  success: string = '';
  productId!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.productId = +id;
      }
    });
  }

  deleteProduct() {
    if (!this.productId) return;
    this.loading = true;
    this.error = '';
    this.success = '';
    this.productService.deleteProduct(this.productId).subscribe({
      next: (res) => {
        this.loading = false;
        this.success = 'Product deleted successfully!';
        setTimeout(() => this.router.navigate(['/products']), 1500);
      },
      error: (err) => {
        this.loading = false;
        if (err?.error?.message) {
          this.error = err.error.message;
        } else {
          this.error = 'Something went wrong';
        }
      }
    });
  }
}
