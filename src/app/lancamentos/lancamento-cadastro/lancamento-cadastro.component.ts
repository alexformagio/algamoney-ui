import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ToastyService } from 'ng2-toasty';

import { Lancamento } from './../../core/lancamento.model';
import { PessoaService } from './../../pessoas/pessoa.service';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { CategoriasService } from './../../categorias/categorias.service';
import { LancamentoService } from '../lancamento.service';



@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent implements OnInit {

  tipos = [
    {label: 'Receita', value: 'RECEITA'},
    {label: 'Despesa', value: 'DESPESA'}
  ];

  categorias = [];
  pessoas = [];
  lancamento = new Lancamento();

  constructor(private categoriasService: CategoriasService,
              private errorHandler: ErrorHandlerService,
              private pessoaService: PessoaService,
              private lancamentoService: LancamentoService,
              private toasty: ToastyService,
              private route: ActivatedRoute,
              private router: Router,
              private title: Title) {}

  ngOnInit() {
    this.buscarCategorias();
    this.buscarPessoas();
    if (this.route.snapshot.params['codigo']) {
      this.buscarPorCodigo(this.route.snapshot.params['codigo']);
    }
    this.mySetTitle();
  }

  get getTitle(): string {
    if (this.lancamento.codigo) {
       return `Editar Lançamento ${this.lancamento.codigo}`;
    }else {
       return 'Novo Lançamento';
    }
  }

  buscarPorCodigo(codigo: number) {
    this.lancamentoService.buscarPorCodigo(codigo)
    .then(data => {
      this.lancamento = data;
      this.mySetTitle();
    })
    .catch(erro => this.errorHandler.handler(erro));
  }

  buscarPessoas() {
    this.pessoaService.getAll()
    .then(data => this.pessoas = data.filter(p => p.ativo === true)
                        .map(p => ({label: p.nome, value: p.codigo}))
    )
    .catch(erro => this.errorHandler.handler(erro));
  }

  buscarCategorias() {
    this.categoriasService.listarTodas()
    .then( resposta => {
      for (const cat of resposta) {
        this.categorias.push({label: cat.nome, value: cat.codigo});
      }
    })
    .catch(erro => this.errorHandler.handler(erro));
  }

  doUpdate() {
    this.lancamentoService.atualizar(this.lancamento)
    .then( lancamento => {
      this.lancamento = lancamento;
      this.toasty.success('Lançamento salvo com sucesso');
      this.mySetTitle();
    })
    .catch(erro => this.errorHandler.handler(erro));
  }

  doInsert(f: FormControl) {
    this.lancamentoService.adicionar(this.lancamento)
    .then(addedLanc => {
      this.toasty.success('Lançamento salvo com sucesso');
      // f.reset();
      // this.lancamento = new Lancamento;
      this.router.navigate(['/lancamentos', addedLanc.codigo]);
    })
    .catch(erro => this.errorHandler.handler(erro));
  }

  salvar(f: FormControl) {
    if (this.lancamento.codigo) {
      this.doUpdate();
    } else {
      this.doInsert(f);
    }

  }

  novo(f: FormControl) {
    f.reset();
    this.router.navigate(['/lancamentos', 'novo']);
    setTimeout(function(){
      this.lancamento = new Lancamento();
    }.bind(this), 1);
  }

  mySetTitle() {
    if (this.lancamento.codigo) {
       this.title.setTitle(`Editar lançamento ${this.lancamento.codigo}`);
    } else {
       this.title.setTitle('Novo Lançamento');
    }
  }
}
