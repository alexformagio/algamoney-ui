import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';
import { JwtHelper } from 'angular2-jwt';
import { environment } from '../../environments/environment';


@Injectable()
export class AuthService {

  tokenLoginURL: string;
  jwtPayload: any;

  constructor(private http: Http,
              private jwtHelper: JwtHelper) {
                this.loadToken();
                this.tokenLoginURL = `${environment.apiURL}/oauth/token`;
              }

  login(user: string, password: string): Promise <void> {
    const body = `username=${user}&password=${password}&grant_type=password`;
    const headers = new Headers();
    headers.append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEBy');
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    return this.http.post(this.tokenLoginURL, body, {headers, withCredentials: true})
      .toPromise()
      .then(resp => {
        this.storeToken(resp.json().access_token);
      })
      .catch(resp => {
        if (resp.status === 400) {
           const respJson = resp.json();

           if (respJson.error === 'invalid_grant') {
             return Promise.reject('Usuário ou senha inválida!');
           }
        }

        return Promise.reject(resp);
      });
  }

  renewAccessToken(): Promise <void> {
    const body = 'grant_type=refresh_token';
    const headers = new Headers();
    headers.append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEBy');
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    return this.http.post(this.tokenLoginURL, body, {headers, withCredentials: true})
      .toPromise()
      .then(resp => {
        this.storeToken(resp.json().access_token);
        return Promise.resolve(null);
      })
      .catch(resp => {
        console.log('Erro ao renovar access token');
        return Promise.resolve(null);
      });
  }

  private storeToken(token: string) {
    this.jwtPayload = this.jwtHelper.decodeToken(token);
    localStorage.setItem('token', token);
  }

  private loadToken() {
    const token = localStorage.getItem('token');

    if (token) {
      this.storeToken(token);
    }
  }

  hasPermission(permission: string): boolean {
    return this.jwtPayload && this.jwtPayload.authorities.includes(permission);
  }

  hasAnyPermission(roles: any): boolean {
    for (const role of roles){
      if (this.hasPermission(role)) {
        return true;
      }
    }
    return false;
  }

  isAccessTokenInvalid(): boolean {
    const token = localStorage.getItem('token');
    return !token || this.jwtHelper.isTokenExpired(token);
  }

  limparToken() {
    localStorage.removeItem('token');
    this.jwtPayload = null;
  }

}
