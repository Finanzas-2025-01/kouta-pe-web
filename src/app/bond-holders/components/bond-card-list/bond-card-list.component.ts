import {Component, inject, Input} from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';
import {BondCardComponent} from '../bond-card/bond-card.component';
import {Bond} from '../../model/bond.entity';
import {BondsApiService} from '../../services/bonds-api.service';

@Component({
  selector: 'app-bond-card-list',
  imports: [
    NgForOf,
    BondCardComponent,
    NgIf
  ],
  templateUrl: './bond-card-list.component.html',
  styleUrl: './bond-card-list.component.css'
})
export class BondCardListComponent {
  @Input() title: string = '';
  @Input() bonds: Array<Bond> = [];
}
