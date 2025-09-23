import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProductService } from '../../Models/services//product.service';
import { IProduct } from '../../Models/interfaces/Iproduct';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-details',
  imports:[CommonModule,RouterModule],
  standalone:true,
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product!: IProduct;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id'); // جبت id من الـ URL
    if (id) {
      this.productService.getProductById(id).subscribe({
        next: (res:any) => {
          this.product = res;
          this.loading = false;
        },
        error: (err:any) => {
          console.error(err);
          this.loading = false;
        }
      });
    }
  }
    handleImageError(event: Event) {
    const img = event.target as HTMLImageElement;
    img.src = 'assets/default.png';
  }
}
