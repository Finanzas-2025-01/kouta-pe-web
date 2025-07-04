import { Component } from '@angular/core';
import {MatToolbar} from '@angular/material/toolbar';

@Component({
  selector: 'app-bond-header',
  imports: [
    MatToolbar
  ],
  template: `
    <mat-toolbar class="">
      <span>Kouta.pe</span>
    </mat-toolbar>
  `,
  styles: ``
})
export class BondHeaderComponent {

}
