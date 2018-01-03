import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-error-message',
  template: `
  <div *ngIf="hasError()"
  class="ui-message ui-messages-error">
    {{ text }}
</div>
  `,
  styles: [`
    .ui-messages-error {
      margin: 0;
      margin-top: 4px;
    }
  `]
})
export class ErrorMessageComponent {
  @Input() control: FormControl;
  @Input()error: string;
  @Input()text: string;

  hasError(): boolean {
    return this.control.hasError(this.error) && this.control.dirty;
  }
}
