import {Component, inject, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import {Bond} from '../../model/bond.entity';
import {CommonModule} from '@angular/common';
import {Router} from '@angular/router';
import {BondsApiService} from '../../services/bonds-api.service';

@Component({
  selector: 'app-bond-dialog',
  imports: [
    MatButtonModule,
    CommonModule,
  ],
  templateUrl: './bond-dialog-component.html',
  styleUrl: './bond-dialog-component.css'
})
export class BondDialogComponent {
  private bondsApiService = inject(BondsApiService);
  bond: Bond;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { bond: Bond },
    private dialogRef: MatDialogRef<BondDialogComponent>,
    private router: Router
  ) {
    this.bond = data.bond;
  }

  goToCashFlow() {
    this.router.navigate(['/bonds', this.bond.id, 'cashflow']).then(() => {
      this.dialogRef.close();
    });
  }

  hireBond() {
    this.bondsApiService.hireBond(this.bond.id).subscribe({
      next: (response) => {
        console.log('bono contratado');
        this.dialogRef.close();
      },
      error: (error) => {
        console.error('There was an error fetching bonds!', error);
      }
    });
  }

  get isIssuer(): boolean {
    return localStorage.getItem('role') === 'ROLE_ISSUER';
  }

  get isBaseBond(): boolean{
    return this.bond.bondType === 'BASE';
  }

  get isBondHolder(): boolean {
    return localStorage.getItem('role') === 'ROLE_BONDHOLDER';
  }
}
