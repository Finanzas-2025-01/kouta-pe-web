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
  private bonsApiService = inject(BondsApiService);
  bonds: Array<Bond> = [];

  private getData() {
    this.bonsApiService.getAllBonds().subscribe((response: Array<Bond>) => {
      this.bonds = response;
      console.log('Tamaño del array de bonos'+this.bonds.length);

    }, error => {
      console.error('There was an error fetching bonds!', error);
    });
  }

  ngOnInit(): void {
    this.getData();
  }
}
