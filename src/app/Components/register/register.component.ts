import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true, 
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit {
  form!: FormGroup;
  loading = false;
  error = '';
  success = '';

  private apiUrl = 'https://mecommerce.runasp.net/api/Account/register';

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      userName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  submit() {
    if (this.form.invalid) {
      this.error = 'Please fill all fields correctly.';
      return;
    }

    this.loading = true;
    this.error = '';
    this.success = '';

    this.http.post<any>(this.apiUrl, this.form.value).subscribe({
      next: (res) => {
        this.loading = false;
        if (res.statusCode === 200) {
          this.success = res.message;
          setTimeout(() => this.router.navigate(['/login']), 2000);
        } else {
          this.error = res.message || 'Something went wrong';
        }
      },
      error: (err) => {
        this.loading = false;
        this.error = err.error?.message || 'Server error';
      }
    });
  }
}
