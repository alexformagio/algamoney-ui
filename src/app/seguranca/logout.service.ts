import { AuthHttp } from 'angular2-jwt';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';


@Injectable()
export class LogoutService {

  tokenRevokeURL: string;

  constructor(private http: AuthHttp,
              private auth: AuthService) {
                this.tokenRevokeURL = `${environment.apiURL}/tokens/revoke`;
               }

  logout() {
    return this.http.delete(this.tokenRevokeURL, { withCredentials: true })
    .toPromise()
    .then(() => {
      this.auth.limparToken();
    });
  }

}
