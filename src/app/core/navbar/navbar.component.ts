import { Router } from '@angular/router';
import { LogoutService } from './../../seguranca/logout.service';
import { AuthService } from './../../seguranca/auth.service';
import { Component, OnInit } from '@angular/core';
import { ErrorHandlerService } from '../error-handler.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  exibindoMenu = false;

  constructor(public auth: AuthService,
              private logoutService: LogoutService,
              private router: Router,
              private errorHandler: ErrorHandlerService) { }

  ngOnInit() {
  }

  logout() {
    this.logoutService.logout()
      .then(() => {
        this.router.navigate(['/login']);
      })
      .catch(erro => this.errorHandler.handler(erro));
  }

  navToPessoas() {
    this.exibindoMenu = false;
    this.router.navigate(['pessoas']);
  }

  navToLancamentos() {
    this.exibindoMenu = false;
    this.router.navigate(['lancamentos']);
  }

}
