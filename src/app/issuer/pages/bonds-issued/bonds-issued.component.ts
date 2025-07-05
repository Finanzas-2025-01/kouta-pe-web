import { Component } from '@angular/core';
import {IssuerService} from '../../services/issuer.service';

@Component({
  selector: 'app-bonds-issued',
  imports: [],
  template: `
    <p>
      bonds-issued works!
    </p>
  `,
  styles: ``
})
export class BondsIssuedComponent {

  constructor(private issuerService: IssuerService) {
    this.issuerService.getIssuedBonds();
  }

}
