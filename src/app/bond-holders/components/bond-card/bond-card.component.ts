import {Component, Input} from '@angular/core';
import {Bond} from '../../model/bond.entity';
import {MatCard, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle} from '@angular/material/card';

@Component({
  selector: 'app-bond-card',
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardSubtitle,
    MatCardContent
  ],
  templateUrl: './bond-card.component.html',
  styleUrl: './bond-card.component.css'
})
export class BondCardComponent {
  @Input() bond!: Bond;
}
