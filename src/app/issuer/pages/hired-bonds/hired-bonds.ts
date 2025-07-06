import {Component, inject} from '@angular/core';
import {BondsApiService} from '../../../bond-holders/services/bonds-api.service';
import {HiredBond} from '../../model/hiredBond.entity';
import {HiredBondCardListComponent} from '../../components/hired-bond-card-list/hired-bond-card-list.component';

@Component({
  selector: 'app-hired-bonds',
  imports: [
    HiredBondCardListComponent
  ],
  templateUrl: './hired-bonds.html',
  styleUrl: './hired-bonds.css'
})
export class HiredBonds {
  private bonsApiService = inject(BondsApiService);
  bonds: Array<HiredBond> = [];

  private getData() {
    this.bonsApiService.getAllHiredBondsOfIssuer().subscribe((response: Array<HiredBond>) => {
      this.bonds = response;
    }, error => {
      console.error('There was an error fetching bonds!', error);
    });
  }

  ngOnInit(): void {
    this.getData();
  }
}
