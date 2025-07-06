import {Component, inject} from '@angular/core';
import {BondsApiService} from '../../services/bonds-api.service';
import {Bond} from '../../model/bond.entity';
import {BondCardComponent} from '../../components/bond-card/bond-card.component';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-financial-instruments',
  imports: [
    BondCardComponent,
    NgForOf
  ],
  templateUrl: './financial-instruments.component.html',
  styleUrl: './financial-instruments.component.css'
})
export class FinancialInstrumentsComponent {
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
