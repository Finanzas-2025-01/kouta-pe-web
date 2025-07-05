import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {BondsApiService} from '../../services/bonds-api.service';
import {CashFlow} from '../../model/cash-flow.entity';
import {MatIcon} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {CurrencyPipe, DatePipe, DecimalPipe, PercentPipe} from '@angular/common';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
];

//accordion
/*
* <!-- This is the clickable header of the accordion -->
      <div class="bg-gray-800 text-white rounded-t-lg p-4 flex justify-between items-center cursor-pointer" (click)="toggleAccordion()">
        <span>Monse</span>
        <mat-icon [fontIcon]="isAccordionOpen ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"/>
      </div>

      <!-- This content will be shown or hidden when the header is clicked -->
      @if (isAccordionOpen) {
        <div class="bg-gray-700 text-white rounded-b-lg p-4">
          <p>Accordion content goes here.</p>
        </div>
      }
      *
      * <div>
        <table mat-table [dataSource]="dataSource" class="mat-elevation-z8">

          <!--- Note that these columns can be defined in any order.
                The actual rendered columns are set as a property on the row definition" -->

          <!-- Position Column -->
          <ng-container matColumnDef="position">
            <th mat-header-cell *matHeaderCellDef> No.</th>
            <td mat-cell *matCellDef="let element"> {{ element.position }}</td>
          </ng-container>

          <!-- Name Column -->
          <ng-container matColumnDef="name">
            <th mat-header-cell *matHeaderCellDef> Name</th>
            <td mat-cell *matCellDef="let element"> {{ element.name }}</td>
          </ng-container>

          <!-- Weight Column -->
          <ng-container matColumnDef="weight">
            <th mat-header-cell *matHeaderCellDef> Weight</th>
            <td mat-cell *matCellDef="let element"> {{ element.weight }}</td>
          </ng-container>

          <!-- Symbol Column -->
          <ng-container matColumnDef="symbol">
            <th mat-header-cell *matHeaderCellDef> Symbol</th>
            <td mat-cell *matCellDef="let element"> {{ element.symbol }}</td>
          </ng-container>

          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
        </table>
      </div>
* */

@Component({
  selector: 'app-bond-cashflow',
  imports: [
    MatTableModule,
    DatePipe,
    PercentPipe,
    CurrencyPipe,
    DecimalPipe
  ],
  template: `
    <section class="w-full h-full">

      <div class="bg-(--mat-sys-surface)">
        <div class="grid grid-cols-18 p-2 text-[14px] font-medium border-b border-(--mat-sys-outline) break-words">
          @for (title of titles; track title) {
            <p class="p-1">{{ title }}</p>
          }
        </div>
        @for (item of cashFlowData; track item.periodNumber) {
          <div class="grid grid-cols-18 border-b border-(--mat-sys-outline) p-2 h-[52px] text-[14px]" (click)="toggleAccordion(item.periodNumber)">
            <p>{{ item.periodNumber }}</p>
            <p>{{ item.assignedDate | date: 'shortDate' }}</p>
            <p>{{ item.anualInflation | percent }}</p>
            <p>{{ item.periodInflation | percent }}</p>
            <p>{{ item.gracePeriod }}</p>
            <p>{{ item.bondValue | currency:'USD' }}</p>
            <p>{{ item.indexedBondValue | currency:'USD' }}</p>
            <p>{{ item.cupon | currency:'USD' }}</p>
            <p>{{ item.payment | currency:'USD' }}</p>
            <p>{{ item.amortization | currency:'USD' }}</p>
            <p>{{ item.premium | currency:'USD' }}</p>
            <p>{{ item.shield | currency:'USD' }}</p>
            <p>{{ item.issuerFlow | currency:'USD' }}</p>
            <p>{{ item.issuerFlowWithShield | currency:'USD' }}</p>
            <p>{{ item.bondHolderFlow | currency:'USD' }}</p>
            <p>{{ item.updatedFlow | currency:'USD' }}</p>
            <p>{{ item.FAxPeriod | currency:'USD' }}</p>
            <p>{{ item.pFactor | number:'1.0-2' }}</p>
          </div>
          @if (this.accordionStates[item.periodNumber]) {
            <div class="bg-gray-700 text-white rounded-b-lg p-4">
              <p>Accordion content goes here.</p>
            </div>
          }
        }
      </div>



    </section>
  `,
  styles: ``
})


export class BondCashflowComponent {

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;

  titles: string[] = [
    'N° periodo', 'Fecha programada', 'Inflacion programada', 'Inflacion del periodo',
    'Periodo de gracia', 'Bono', 'Bono Indexado', 'Cupon', 'Cuota', 'Amortizacion',
    'Prima', 'Escudo', 'Flujo Emisor', 'Flujo Emisor c/ Escudo', 'Flujo Bonista',
    'Flujo Actual', 'FA x plazo', 'Factor y Convexidad'
  ];

  bondId: number;
  cashFlowData: CashFlow[] = [] ;
  accordionStates : boolean[] = [];

  constructor(private router : Router, private bondsApiService : BondsApiService) {
    this.bondId = Number(this.router.url.split('/')[2]);

    this.bondsApiService.getBondCashflowById(this.bondId).subscribe({
      next: (data) => {
        this.cashFlowData = data;
        this.accordionStates = new Array(this.cashFlowData.length).fill(false);
      },
      error: (error) => {
        console.error('Error fetching cashflow data:', error);
      }
    });
     // Initialize accordion states

  }

  // Toggles the accordion state
  toggleAccordion(index: number) {
    this.accordionStates[index] = !this.accordionStates[index];
  }

}
