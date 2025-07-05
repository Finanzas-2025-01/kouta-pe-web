import {Component, inject} from '@angular/core';
import {NgForOf} from '@angular/common';
import {BondCardComponent} from '../bond-card/bond-card.component';
import {Bond} from '../../model/bond.entity';
import {BondsApiService} from '../../services/bonds-api.service';

@Component({
  selector: 'app-bond-card-list',
  imports: [
    NgForOf,
    BondCardComponent
  ],
  templateUrl: './bond-card-list.component.html',
  styleUrl: './bond-card-list.component.css'
})
export class BondCardListComponent {
  private bonsApiService = inject(BondsApiService);
  bonds: Array<Bond> = [];

  private getData() {
    this.bonsApiService.getAllBonds().subscribe((response: Array<Bond>) => {
      this.bonds = response;
    }, error => {
      console.error('There was an error fetching bonds!', error);
    });
  }

  ngOnInit(): void {
    this.getData();
  }
}
