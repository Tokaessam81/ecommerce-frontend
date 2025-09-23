import { Component, OnInit } from '@angular/core';
import { IProduct } from '../../Models/interfaces/Iproduct';
import { ProductService } from '../../Models/services/product.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-product-list',
  imports:[CommonModule,RouterModule],
  standalone:true,
  templateUrl: '../product/product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  products$!: Observable<IProduct[]>;
  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.products$ = this.productService.getProducts();
  }
  handleImageError(event: Event) {
    const img = event.target as HTMLImageElement;
    img.src = 'assets/default.png';
  }
}
