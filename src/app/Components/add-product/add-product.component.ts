import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './add-product.component.html',
})
export class AddProductComponent {
  form: FormGroup;
  loading = false;
  error: string = '';
  success: string = '';

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.form = this.fb.group({
      Name: ['', Validators.required],
      Description: [''],
      Category: ['', Validators.required],
      ProductCode: ['', Validators.required],
      Price: [null, [Validators.required, Validators.min(0)]],
      MinimumQuantity: [null, [Validators.required, Validators.min(1)]],
      DiscountRate: [0],
      ImageFile: [null, Validators.required]
    });
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.form.patchValue({ ImageFile: file });
    }
  }

  reset() {
    this.form.reset();
    this.error = '';
    this.success = '';
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
    Object.entries(this.form.value).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        if (key === 'ImageFile' && value instanceof File) {
          formData.append(key, value, value.name);
        } else {
          formData.append(key, value.toString());
        }
      }
    });

    this.http.post('https://mecommerce.runasp.net/api/Product/CreateProduct', formData).subscribe({
      next: (res: any) => {
        this.loading = false;
        this.success = 'Product added successfully!';
        this.error = '';
        this.form.reset();
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
