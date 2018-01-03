import { Title } from '@angular/platform-browser';
import { Component, OnInit, ViewChild } from '@angular/core';

import { LazyLoadEvent, ConfirmationService } from 'primeng/components/common/api';
import { ToastyService } from 'ng2-toasty';

import { ErrorHandlerService } from './../../core/error-handler.service';
import { PessoaService, PessoaFilter } from './../pessoa.service';




@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent implements OnInit {

  pessoas: any;
  filter = new PessoaFilter();
  totalRegistros = 0;
  @ViewChild('tabela') grid;


  constructor(private pessoaService: PessoaService,
              private toasty: ToastyService,
              private confirmation: ConfirmationService,
              private errorHandler: ErrorHandlerService,
              private title: Title) { }

  ngOnInit() {
    this.title.setTitle('Pesquisar Pessoas');
  }

  consultar(pagina = 0 ) {
    this.filter.pagina = pagina;
    this.pessoaService.consultar(this.filter)
    .then( resultado => {
      this.pessoas = resultado.pessoas;
      this.totalRegistros = resultado.total;
    })
    .catch(erro => this.errorHandler.handler(erro));
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.consultar(pagina);
  }

  excluir (pessoa: any) {
    this.pessoaService.excluir(pessoa.codigo)
    .then(() => {
      if (this.grid.first === 0) {
        this.consultar();
      } else {
        this.grid.first = 0;
      }
      this.toasty.success(`Pessoa ${pessoa.nome} excluida com successo!`);
    })
    .catch(erro => this.errorHandler.handler(erro));
  }

  confirmarExclusao (pessoa: any) {
    this.confirmation.confirm({
      message: `Tem certeza que deseja excluir ${pessoa.nome}`,
      accept: () => {
        this.excluir(pessoa);
      }
    });
  }

  changeStatus(pessoa: any): void {
    this.pessoaService.changeStatus(pessoa)
    .then(() => {
      const acao = pessoa.ativo ? 'desativado' : 'ativado';
      pessoa.ativo  = !pessoa.ativo;
      this.toasty.success(`Pessoa ${acao} com successo!`);
    })
    .catch(erro => this.errorHandler.handler(erro));
  }

}
