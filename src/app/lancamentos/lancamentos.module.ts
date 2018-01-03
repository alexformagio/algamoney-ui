import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TooltipModule } from 'primeng/components/tooltip/tooltip';
import { ButtonModule } from 'primeng/components/button/button';
import { SelectButtonModule } from 'primeng/components/selectbutton/selectbutton';
import { CalendarModule } from 'primeng/components/calendar/calendar';
import { InputTextModule } from 'primeng/components/inputtext/inputtext';
import { DataTableModule } from 'primeng/components/datatable/datatable';
import { InputTextareaModule } from 'primeng/components/inputtextarea/inputtextarea';
import { DropdownModule } from 'primeng/components/dropdown/dropdown';
import { CurrencyMaskModule } from 'ng2-currency-mask';

import { CategoriasService } from './../categorias/categorias.service';
import { LancamentoService } from './lancamento.service';
import { LancamentoCadastroComponent } from './lancamento-cadastro/lancamento-cadastro.component';
import { LancamentosPesquisaComponent } from './lancamentos-pesquisa/lancamentos-pesquisa.component';
import { SharedModule } from '../shared/shared.module';
import { LancamentosRoutingModule } from './lancamentos-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    DataTableModule,
    TooltipModule,
    InputTextareaModule,
    CalendarModule,
    SelectButtonModule,
    DropdownModule,
    SharedModule,
    CurrencyMaskModule, // it's not from primeng. it's from ng2-currency-mask, it's a npm module
    LancamentosRoutingModule
  ],
  declarations: [
     LancamentoCadastroComponent,
     LancamentosPesquisaComponent
    ],
  providers: [
    LancamentoService,
    CategoriasService
  ],
  exports: []
})
export class LancamentosModule { }
