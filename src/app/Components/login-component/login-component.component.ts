import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../Models/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './login-component.component.html',
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  loading = false;
  error: string = '';

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  submit() {
    if (this.form.invalid) {
      this.error = 'Please fill all fields.';
      return;
    }

    this.loading = true;
    this.error = '';

    const { username, password } = this.form.value;

    this.auth.login(username.trim(), password.trim()).subscribe({
      next: (res:any) => {
        this.loading = false;
        this.router.navigate(['/products']); 
      },
      error: (err: any) => {
    this.loading = false;
    console.error(err);

    if (err?.error?.message) {
      this.error = err.error.message;
    } else {
      this.error = 'Something went wrong';
    }
  }
    });
  }
}
