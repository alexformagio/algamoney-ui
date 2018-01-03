import { environment } from './../../environments/environment';
import { Pessoa } from './../core/pessoa.model';
import { Injectable } from '@angular/core';
import { URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { AuthHttp } from 'angular2-jwt';

export class PessoaFilter {
  nome: string;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable()
export class PessoaService {
  pessoasURL: string;

  constructor(private http: AuthHttp) {
    this.pessoasURL = `${environment.apiURL}/pessoas`;
   }

  consultar(filtro: PessoaFilter): Promise<any> {
    const params = new URLSearchParams();

    if (filtro.nome) {
       params.set('nome', filtro.nome);
    }

    params.set('page', filtro.pagina.toString());
    params.set('size', filtro.itensPorPagina.toString());

    return this.http.get(this.pessoasURL, { search: params}).toPromise()
       .then(response => {
         const respJson = response.json();
         const pessoas = respJson.content;

         const resultado = {
           pessoas,
           total: respJson.totalElements
         };
         return resultado;
       });
  }

  getAll(): Promise<any> {
    return this.http.get(this.pessoasURL).toPromise()
       .then(response => response.json().content);
  }

  excluir(codigo: number) {
    return this.http.delete(`${this.pessoasURL}/${codigo}`)
    .toPromise().then(() => null);
  }

  changeStatus(pessoa: any): Promise<any> {
    return this.http.put(`${this.pessoasURL}/${pessoa.codigo}/ativo`, !pessoa.ativo)
    .toPromise().then(() => null);
  }

  adicionar(pessoa: Pessoa) {
    return this.http.post(this.pessoasURL, JSON.stringify(pessoa))
    .toPromise().then(resp => resp.json());
  }

  atualizar(pessoa: Pessoa): Promise<Pessoa> {
    return this.http.put(`${this.pessoasURL}/${pessoa.codigo}`, JSON.stringify(pessoa))
    .toPromise().then(resp => {
      return resp.json() as Pessoa;
    });
  }

  buscarPorCodigo(codigo: number): Promise<Pessoa> {

    return this.http.get(`${this.pessoasURL}/${codigo}`)
      .toPromise()
      .then(response => {
        return response.json() as Pessoa;
      });
  }

}
