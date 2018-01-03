import { Injectable } from '@angular/core';
import { URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import * as moment from 'moment';

import { Lancamento } from './../core/lancamento.model';
import { AuthHttp } from 'angular2-jwt';
import { environment } from '../../environments/environment';

export class LancamentoFilter {
  descricao: string;
  dataVencimentoDe: Date;
  dataVencimentoAte: Date;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable()
export class LancamentoService {

  lancamentosURL: string;

  constructor(private http: AuthHttp) {
    this.lancamentosURL = `${environment.apiURL}/lancamentos`;
  }

  consultar(filtro: LancamentoFilter ): Promise<any> {
    const params = new URLSearchParams();


    if (filtro.descricao) {
      params.set('descricao', filtro.descricao);
    }

    if (filtro.dataVencimentoDe) {
      params.set('dataVencimentoDe', moment(filtro.dataVencimentoDe).format('YYYY-MM-DD'));
    }

    if (filtro.dataVencimentoAte) {
      params.set('dataVencimentoAte', moment(filtro.dataVencimentoAte).format('YYYY-MM-DD'));
    }

    params.set('page', filtro.pagina.toString());
    params.set('size', filtro.itensPorPagina.toString());

    return this.http.get(`${this.lancamentosURL}?resumo`, { search: params }).toPromise()
     .then( response => {
       const responseJson = response.json();
       const lancamentos = responseJson.content;

       const resultado = {
         lancamentos,
         total: responseJson.totalElements
       };

       return resultado;
     });
  }

  excluir(codigo: number): Promise<void> {
    return this.http.delete(`${this.lancamentosURL}/${codigo}`, {})
    .toPromise().then(() => null);
  }

  adicionar(lanc: Lancamento): Promise<Lancamento> {
    return this.http.post(this.lancamentosURL, JSON.stringify(lanc), {})
    .toPromise().then(resp => resp.json());
  }

  atualizar(lanc: Lancamento): Promise<Lancamento> {
    return this.http.put(`${this.lancamentosURL}/${lanc.codigo}`, JSON.stringify(lanc), {})
    .toPromise().then(resp => {
      const lancamentoAlterado = resp.json() as Lancamento;

      this.converterStringsParaDatas([lancamentoAlterado]);

      return lancamentoAlterado;
    });
  }

  buscarPorCodigo(codigo: number): Promise<Lancamento> {
    return this.http.get(`${this.lancamentosURL}/${codigo}`, {})
      .toPromise()
      .then(response => {
        const lancamento = response.json() as Lancamento;

        this.converterStringsParaDatas([lancamento]);

        return lancamento;
      });
  }

  private converterStringsParaDatas(lancamentos: Lancamento[]) {
    for (const lancamento of lancamentos) {
      lancamento.dataVencimento = moment(lancamento.dataVencimento,
        'YYYY-MM-DD').toDate();

      if (lancamento.dataPagamento) {
        lancamento.dataPagamento = moment(lancamento.dataPagamento,
          'YYYY-MM-DD').toDate();
      }
    }
  }
}
