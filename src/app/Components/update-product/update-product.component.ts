import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ProductService } from '../../Models/services/product.service';

@Component({
  selector: 'app-update-product',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './update-product.component.html',
})
export class UpdateProductComponent implements OnInit {
  form!: FormGroup;
  loading = false;
  error: string = '';
  success: string = '';
  productId!: number;
  imagePreview: string | null = null;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      Id: [null, Validators.required],
      Name: ['', Validators.required],
      Description: [''],
      Category: ['', Validators.required],
      ProductCode: ['', Validators.required],
      Price: [null, [Validators.required, Validators.min(0)]],
      MinimumQuantity: [null, [Validators.required, Validators.min(1)]],
      DiscountRate: [0],
      ImageFile: [null]
    });

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.productId = +id;
        this.loadProduct(+id);
      }
    });
  }

  loadProduct(id: number) {
  this.productService.getProductById(id.toString()).subscribe({
    next: (product) => {
      this.form.patchValue({
        Id: product.id,
        Name: product.name,
        Category: product.category,
        ProductCode: product.productCode,
        Price: product.price,
        MinimumQuantity: product.minimumQuantity,
        DiscountRate: product.discountRate,
        ImageFile: null
      });

      if (product.imagePath) {
        this.imagePreview = 'https://mecommerce.runasp.net/' + product.imagePath;
      }
    },
    error: () => {
      this.error = 'Failed to load product.';
    }
  });
}

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.form.patchValue({ ImageFile: file });
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  reset() {
    this.form.reset();
    this.error = '';
    this.success = '';
    if (this.productId) {
      this.loadProduct(this.productId);
    }
  }

 submit() {
  if (this.form.invalid) {
    this.error = 'Please fill all required fields.';
    this.success = '';
    return;
  }

  this.loading = true;
  this.error = '';
  this.success = '';

  const formData = new FormData();
  // Append only non-null fields
  Object.keys(this.form.controls).forEach(key => {
    const controlValue = this.form.get(key)?.value;
    if (controlValue !== null && controlValue !== undefined) {
      if (key === 'ImageFile' && controlValue instanceof File) {
        formData.append(key, controlValue, controlValue.name);
      } else {
        formData.append(key, controlValue.toString());
      }
    }
  });

  this.productService.updateProduct(formData, this.productId).subscribe({
    next: (event: any) => {
      // لو استخدمنا observe: 'events' ممكن نضيف progress هنا
      this.loading = false;
      this.success = 'Product updated successfully!';
      this.error = '';
    },
    error: (err: any) => {
      this.loading = false;
      if (err?.error?.errors) {
        this.error = err.error.errors.join(' ');
      } else if (err?.error?.message) {
        this.error = err.error.message;
      } else {
        this.error = 'Something went wrong';
      }
    }
  });
}


}
