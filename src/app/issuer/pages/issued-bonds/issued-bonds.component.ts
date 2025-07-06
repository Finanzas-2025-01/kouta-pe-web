import {Component, inject} from '@angular/core';
import {BondsApiService} from '../../../bond-holders/services/bonds-api.service';
import {Bond} from '../../../bond-holders/model/bond.entity';
import {BondCardComponent} from '../../../bond-holders/components/bond-card/bond-card.component';
import {NgForOf, NgIf} from '@angular/common';
import {BondCardListComponent} from '../../../bond-holders/components/bond-card-list/bond-card-list.component';

@Component({
  selector: 'app-issued-bonds',
  imports: [
    BondCardListComponent
  ],
  templateUrl: './issued-bonds.component.html',
  styleUrl: './issued-bonds.component.css'
})
export class IssuedBondsComponent {
  private bonsApiService = inject(BondsApiService);
  bonds: Array<Bond> = [];

  private getData() {
    this.bonsApiService.getAllBondsOfIssuer().subscribe((response: Array<Bond>) => {
      this.bonds = response;
    }, error => {
      console.error('There was an error fetching bonds!', error);
    });
  }

  ngOnInit(): void {
    this.getData();
  }
}
