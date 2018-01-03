import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { LazyLoadEvent, ConfirmationService } from 'primeng/components/common/api';
import { ToastyService } from 'ng2-toasty';

import { ErrorHandlerService } from './../../core/error-handler.service';
import { LancamentoService, LancamentoFilter } from './../lancamento.service';
import { AuthService } from '../../seguranca/auth.service';


@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent implements OnInit {
  lancamentos: any;
  filtro = new LancamentoFilter();
  totalRegistros = 0;
  @ViewChild('tabela') grid;

  constructor(private lancamentoService: LancamentoService,
              private toasty: ToastyService,
              private confirmation: ConfirmationService,
              private errorHandler: ErrorHandlerService,
              private title: Title,
              private auth: AuthService) { }

  ngOnInit() {
    this.title.setTitle('Pesquisar Lançamento');
  }

  consultar(pagina = 0) {
    this.filtro.pagina = pagina;
    this.lancamentoService.consultar(this.filtro)
      .then( resultado => {
        this.lancamentos = resultado.lancamentos;
        this.totalRegistros = resultado.total;
      })
      .catch(erro => this.errorHandler.handler(erro));
  }


  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.consultar(pagina);
  }

  excluir(lancamento: any) {
    this.lancamentoService.excluir(lancamento.codigo)
      .then(() => {
        if (this.grid.first === 0) {
           this.consultar();
        }else {
          this.grid.first = 0;
        }
        this.toasty.success(`Lançamento ${lancamento.codigo} excluido com sucesso`);
      })
      .catch(erro => this.errorHandler.handler(erro));
  }

  confirmarExclusao(lancamento: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
         this.excluir(lancamento);
      }
    });
  }

}
