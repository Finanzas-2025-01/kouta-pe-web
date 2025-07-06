import {Component, Input} from '@angular/core';
import {MatCard} from '@angular/material/card';
import {HiredBond} from '../../model/hiredBond.entity';
import { CommonModule } from '@angular/common'; // Importa CommonModule

@Component({
  selector: 'app-hired-bond-card',
  imports: [
    MatCard,
    CommonModule
  ],
  templateUrl: './hired-bond-card.component.html',
  styleUrl: './hired-bond-card.component.css'
})
export class HiredBondCardComponent {
  @Input() bond!: HiredBond;
}
