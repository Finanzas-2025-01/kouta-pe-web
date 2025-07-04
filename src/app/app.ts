import {Component, ViewChild} from '@angular/core';
import {NavigationEnd, Router, RouterLink, RouterOutlet} from '@angular/router';
import {MatSidenav} from '@angular/material/sidenav';
import {MatToolbar} from '@angular/material/toolbar';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatToolbar, RouterLink, NgIf],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = 'kouta-pe';
  showToolbar = false;
  redirect = '';

  @ViewChild(MatSidenav, {static: true}) sidenav!: MatSidenav;

  optionsIssuer = [
    {icon: '', path: '/issuers/my-bonds', title: 'Mis Bonos'},
    {icon: '', path: '/bonds/create', title: 'Crear Bono'},
  ];

  optionsBondholder = [
    {icon: '', path: '/bonds', title: 'Bonos'},
    {icon: '', path: '/cond-holders/my-bonds', title: 'Mis Bonos'}
  ];

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const currentRoute = this.router.url;
        this.showToolbar = !(currentRoute.includes('sign-in') || currentRoute.includes('sign-up'));
        console.log('Ruta actual:', currentRoute);
        console.log('showToolbar:', this.showToolbar);
      }
    });
    this.setRedirect();
  }

  private setRedirect() {
    if (this.isBondHolder) {
      this.redirect = '/bonds';
    } else {
      this.redirect = '/issuers/my-bonds';
    }
  }

  get isIssuer(): boolean {

    return localStorage.getItem('role') === 'ROLE_ISSUER';
  }

  get isBondHolder(): boolean {
    return localStorage.getItem('role') === 'ROLE_BONDHOLDER';
  }
}
