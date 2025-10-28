import { importProvidersFrom } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { JwtInterceptor } from '../src/app/Models/interceptors/jwt.interceptor.ts';
import { AuthService } from '../src/app/Models/services/auth.service';

import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

bootstrapApplication(AppComponent, {
  providers: [
    ...appConfig.providers,
    importProvidersFrom(ReactiveFormsModule),
    AuthService,
    provideHttpClient(withInterceptorsFromDi()), // ✅ هنا بيتفعل الـ interceptors
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }, // ✅ هنا تسجيل الـ interceptor
  ]
});

