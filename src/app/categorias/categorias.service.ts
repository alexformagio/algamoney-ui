import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { AuthHttp } from 'angular2-jwt';
import { environment } from '../../environments/environment';


@Injectable()
export class CategoriasService {
  categoriaURL: string;

  constructor(private http: AuthHttp) {
    this.categoriaURL = `${environment.apiURL}/categorias`;
   }

  listarTodas(): Promise<any> {
    return this.http.get(this.categoriaURL).toPromise()
    .then(response => response.json());
  }

}
