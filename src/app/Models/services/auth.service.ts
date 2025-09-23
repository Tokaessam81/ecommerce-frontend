// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../Env/Enviroment';
import { AuthResponse } from '../interfaces/auth-response';



@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = `${environment.apiUrl}/Account`;

  constructor(private http: HttpClient) {}

  /** ===== Token Management ===== */
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getRefreshToken(): string | null {
    return localStorage.getItem('refreshToken');
  }

  setTokens(accessToken: string, refreshToken: string) {
    localStorage.setItem('token', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
  }

  removeTokens() {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
  }

  /** ===== Login ===== */
  login(username: string, password: string): Observable<AuthResponse> {
    const body = { email: username, password };
    return this.http.post<AuthResponse>(`${this.baseUrl}/login`, body)
      .pipe(
        tap(res => {
          if (res.statusCode === 200 && res.result?.accessToken) {
            this.setTokens(res.result.accessToken, res.result.refreshToken);
          }
        })
      );
  }

  /** ===== Logout ===== */
  logout() {
    this.removeTokens();
  }

  /** ===== Register ===== */
  register(userName: string, email: string, password: string): Observable<any> {
    const body = { userName, email, password };
    return this.http.post<any>(`${this.baseUrl}/register`, body);
  }

  /** ===== Refresh Token ===== */
  refreshToken(): Observable<AuthResponse> {
    const refreshToken = this.getRefreshToken();
    if (!refreshToken) throw new Error('No refresh token found');

    return this.http.post<AuthResponse>(`${this.baseUrl}/refresh-token`, { refreshToken })
      .pipe(
        tap(res => {
          if (res.statusCode === 200 && res.result?.accessToken) {
            this.setTokens(res.result.accessToken, res.result.refreshToken);
          }
        })
      );
  }
}
