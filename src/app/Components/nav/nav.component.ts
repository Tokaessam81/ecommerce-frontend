import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
constructor(private router: Router) {}

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token'); // check if token exists
  }

  logout() {
    localStorage.removeItem('token'); // remove token
    this.router.navigate(['/login']); // redirect to login
  }
}
