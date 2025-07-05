import { Component } from '@angular/core';
import {MatCard} from '@angular/material/card';
import {BondCardListComponent} from '../../components/bond-card-list/bond-card-list.component';

@Component({
  selector: 'app-bonds',
  imports: [
    MatCard,
    BondCardListComponent
  ],
  templateUrl: './bonds.html',
  styleUrl: './bonds.css'
})
export class Bonds {

}
