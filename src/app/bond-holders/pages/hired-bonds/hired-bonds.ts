import {Component, inject} from '@angular/core';
import {BondsApiService} from '../../services/bonds-api.service';
import {Bond} from '../../model/bond.entity';
import {BondCardComponent} from '../../components/bond-card/bond-card.component';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-hired-bonds',
  imports: [
    BondCardComponent,
    NgForOf,
    NgIf
  ],
  templateUrl: './hired-bonds.html',
  styleUrl: './hired-bonds.css'
})
export class HiredBonds {
  private bonsApiService = inject(BondsApiService);
  bonds: Array<Bond> = [];

  private getData() {
    this.bonsApiService.getAllHiredBondsOfIssuer().subscribe((response: Array<Bond>) => {
      this.bonds = response;
    }, error => {
      console.error('There was an error fetching bonds!', error);
    });
  }

  ngOnInit(): void {
    this.getData();
  }
}
