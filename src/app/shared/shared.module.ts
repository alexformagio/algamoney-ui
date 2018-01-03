import { ErrorMessageComponent } from './error-message/error-message.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ErrorMessageComponent],
  exports: [ErrorMessageComponent]
})
export class SharedModule { }
