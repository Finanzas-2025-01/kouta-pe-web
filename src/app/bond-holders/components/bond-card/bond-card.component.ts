import {Component, Input} from '@angular/core';
import {Bond} from '../../model/bond.entity';
import {MatCard} from '@angular/material/card';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-bond-card',
  imports: [
    MatCard,
    CommonModule,
  ],
  templateUrl: './bond-card.component.html',
  styleUrl: './bond-card.component.css'
})
export class BondCardComponent {
  @Input() bond!: Bond;
}
