import {Component, inject} from '@angular/core';
import {MatCard} from '@angular/material/card';
import {BondCardListComponent} from '../../components/bond-card-list/bond-card-list.component';
import {Bond} from '../../model/bond.entity';
import {BondsApiService} from '../../services/bonds-api.service';

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
  private bondsApiService = inject(BondsApiService);
  bonds: Array<Bond> = [];

  private getData() {
    this.bondsApiService.getAllBonds().subscribe((response: Array<Bond>) => {
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
