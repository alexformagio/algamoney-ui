import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { ToastyService } from 'ng2-toasty';

import { PessoaService } from './../pessoa.service';
import { Pessoa } from './../../core/pessoa.model';
import { ErrorHandlerService } from '../../core/error-handler.service';



@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent implements OnInit {

  pessoa = new Pessoa();

  ngOnInit() {
    this.title.setTitle('Nova Pessoa');
    if (this.route.snapshot.params['codigo']) {
      this.buscarPorCodigo(this.route.snapshot.params['codigo']);
    }
    this.mySetTitle();
  }

  constructor(private pessoaService: PessoaService,
    private toasty: ToastyService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title) { }


  get getTitle(): string {
    if (this.pessoa.codigo) {
      return `Editar Pessoa ${this.pessoa.codigo}`;
    } else {
      return 'Nova Pessoa';
    }
  }

  buscarPorCodigo(codigo: number) {
    this.pessoaService.buscarPorCodigo(codigo)
      .then(data => {
        this.pessoa = data;
        this.mySetTitle();
      })
      .catch(erro => this.errorHandler.handler(erro));
  }


  doUpdate() {
    this.pessoaService.atualizar(this.pessoa)
    .then( pessoa => {
      this.pessoa = pessoa;
      this.toasty.success('Pessoa salva com sucesso');
      this.mySetTitle();
    })
    .catch(erro => this.errorHandler.handler(erro));
  }

  doInsert(f: FormControl) {
    this.pessoa.ativo = true;
    this.pessoaService.adicionar(this.pessoa)
    .then(addedPerson => {
      this.toasty.success('Pessoa salva com sucesso');
      this.router.navigate(['/pessoas', addedPerson.codigo]);
    })
    .catch(erro => this.errorHandler.handler(erro));
  }

  salvar(f: FormControl) {
    if (this.pessoa.codigo) {
      this.doUpdate();
    } else {
      this.doInsert(f);
    }

  }

  novo(f: FormControl) {
    f.reset();
    this.router.navigate(['/pessoas', 'novo']);
    setTimeout(function(){
      this.pessoa = new Pessoa();
    }.bind(this), 1);
  }

  mySetTitle() {
    if (this.pessoa.codigo) {
       this.title.setTitle(`Editar Pessoa ${this.pessoa.codigo}`);
    } else {
       this.title.setTitle('Nova Pessoa');
    }
  }

}
