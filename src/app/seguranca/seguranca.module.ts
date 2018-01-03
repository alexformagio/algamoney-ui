import { Http, RequestOptions } from '@angular/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ButtonModule } from 'primeng/components/button/button';
import { InputTextModule } from 'primeng/components/inputtext/inputtext';
import { AuthHttp, AuthConfig } from 'angular2-jwt';

import { LoginFormComponent } from './login-form/login-form.component';
import { SegurancaRoutingModule } from './seguranca-routing.module';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { LogoutService } from './logout.service';
import { MoneyHttp } from './money-http';

export function authHttpServiceFactory(auth: AuthService, http: Http, options: RequestOptions) {
  const config = new AuthConfig({
    globalHeaders: [
      { 'Content-Type': 'application/json'}
    ]
  });

  return new MoneyHttp(auth, config, http, options);
}

@NgModule({
  imports: [
    CommonModule,
    SegurancaRoutingModule,
    FormsModule,
    ButtonModule,
    InputTextModule
  ],
  declarations: [LoginFormComponent],
  providers: [
    {provide: AuthHttp,
    useFactory: authHttpServiceFactory,
    deps: [AuthService, Http, RequestOptions]},
    AuthGuard,
    LogoutService
  ]
})
export class SegurancaModule { }
