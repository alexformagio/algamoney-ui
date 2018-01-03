import { AuthService } from './../seguranca/auth.service';
import { Title } from '@angular/platform-browser';
import { NgModule, LOCALE_ID  } from '@angular/core';
import { CommonModule } from '@angular/common';
// As 2 linhas abaixo foram essenciais para funcionar o locale
import localePt from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { RouterModule } from '@angular/router';

import { JwtHelper } from 'angular2-jwt';
import { ToastyModule } from 'ng2-toasty';
import { ConfirmDialogModule } from 'primeng/components/confirmdialog/confirmdialog';
import { ConfirmationService } from 'primeng/components/common/api';

import { ErrorHandlerService } from './error-handler.service';
import { NavbarComponent } from './navbar/navbar.component';
import { PessoasModule } from '../pessoas/pessoas.module';
import { LancamentosModule } from '../lancamentos/lancamentos.module';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada.component';
import { NaoAutorizadoComponent } from './nao-autorizado.component';



// E por fim, registre o localePt como 'pt-BR'
registerLocaleData(localePt, 'pt-BR');

@NgModule({
  imports: [
    CommonModule,
    LancamentosModule,
    PessoasModule,
    ToastyModule.forRoot(),
    ConfirmDialogModule,
    RouterModule
  ],
  declarations: [NavbarComponent, PaginaNaoEncontradaComponent, NaoAutorizadoComponent],
  exports: [NavbarComponent,
            ToastyModule,
            ConfirmDialogModule,
            LancamentosModule,
            PessoasModule],
  providers: [Title,
              AuthService,
              ErrorHandlerService,
              ConfirmationService,
              JwtHelper,
              {provide: LOCALE_ID, useValue: 'pt-BR'}]
})
export class CoreModule { }
