import {Component, Input} from '@angular/core';
import {Bond} from '../../model/bond.entity';
import {MatCard} from '@angular/material/card';
import {CommonModule} from '@angular/common';
import {MatDialog} from '@angular/material/dialog';
import {BondDialogComponent} from '../bond-dialog/bond-dialog-component';

@Component({
  selector: 'app-bond-card',
  imports: [
    MatCard,
    CommonModule,
  ],
  templateUrl: './bond-card.component.html',
  styleUrl: './bond-card.component.css'
})
export class BondCardComponent {
  @Input() bond!: Bond;

  constructor(private dialog: MatDialog) {}

  openDialog(): void {
    this.dialog.open(BondDialogComponent, {
      data: { bond: this.bond }
    });
  }
}
