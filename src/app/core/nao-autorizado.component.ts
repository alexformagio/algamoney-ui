import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nao-autorizado',
  template: `
    <p>
      acesso negado!
    </p>
  `,
  styles: []
})
export class NaoAutorizadoComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
