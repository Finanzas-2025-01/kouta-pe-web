import {Component, inject} from '@angular/core';
import {BondsApiService} from '../../services/bonds-api.service';
import {Bond} from '../../model/bond.entity';
import {BondCardListComponent} from '../../components/bond-card-list/bond-card-list.component';

@Component({
  selector: 'app-financial-instruments',
  imports: [
    BondCardListComponent
  ],
  templateUrl: './financial-instruments.html',
  styleUrl: './financial-instruments.css'
})
export class FinancialInstruments {
  private bonsApiService = inject(BondsApiService);
  bonds: Array<Bond> = [];

  private getData() {
    this.bonsApiService.getAllBondsOfBondHolder().subscribe((response: Array<Bond>) => {
      this.bonds = response;
    }, error => {
      console.error('There was an error fetching bonds!', error);
    });
  }

  ngOnInit(): void {
    this.getData();
  }
}
