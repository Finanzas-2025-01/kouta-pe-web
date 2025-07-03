import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {BondFooterComponent} from './public/components/bond-footer/bond-footer.component';
import {BondHeaderComponent} from './public/components/bond-header/bond-header.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, BondFooterComponent, BondHeaderComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'kouta-pe';
}
