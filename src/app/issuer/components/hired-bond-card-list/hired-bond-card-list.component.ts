import {Component, Input} from '@angular/core';
import {BondCardComponent} from '../../../bond-holders/components/bond-card/bond-card.component';
import {NgForOf, NgIf} from '@angular/common';
import {HiredBond} from '../../model/hiredBond.entity';
import {HiredBondCardComponent} from '../hired-bond-card/hired-bond-card.component';

@Component({
  selector: 'app-hired-bond-card-list',
  imports: [
    NgForOf,
    NgIf,
    HiredBondCardComponent
  ],
  templateUrl: './hired-bond-card-list.component.html',
  styleUrl: './hired-bond-card-list.component.css'
})
export class HiredBondCardListComponent {
  @Input() title: string = '';
  @Input() bonds: Array<HiredBond> = [];
}
