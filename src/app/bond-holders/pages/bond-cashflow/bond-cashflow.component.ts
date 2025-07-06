import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {BondsApiService} from '../../services/bonds-api.service';
import {CashFlow} from '../../model/cash-flow.entity';
import {MatIcon} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {CurrencyPipe, DatePipe, DecimalPipe, PercentPipe} from '@angular/common';
import {Bond} from '../../model/bond.entity';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {FormsModule} from '@angular/forms';

interface GracePeriod {
  value: string;
  viewValue: string;
}

interface Currency {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-bond-cashflow',
  imports: [
    MatTableModule,
    DatePipe,
    PercentPipe,
    CurrencyPipe,
    DecimalPipe,
    MatButtonModule,
    MatIcon,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    FormsModule
  ],
  template: `
    <section class="space-y-8">
      <div class="text-center mt-8">
        <h1 class="text-5xl md:text-6xl lg:text-7xl font-semibold">{{bond?.name}}</h1>
      </div>
      <div>
        <div class="flex justify-between items-center p-4 border-y border-(--mat-sys-outline) bg-(--mat-sys-surface)">
          <h2 class="font-semibold text-2xl"> Flujo de Caja </h2>

          <div class="flex items-center gap-4">
            <mat-form-field>
              <mat-label>Moneda Actual</mat-label>
              <mat-select [(ngModel)]="currentCurrency" (ngModelChange)="onCurrencyChange($event)">
                @for (currency of supportedCurrencies; track currency.value) {
                  <mat-option [value]="currency.value" >{{currency.viewValue}}</mat-option>
                }
              </mat-select>
            </mat-form-field>

            @if(isIssuer){
              <button matButton>Editar Bono</button>
            }
          </div>
        </div>
        <div class="bg-(--mat-sys-surface)">
          <div class="grid grid-cols-18 p-2 text-[12px] font-medium border-b border-(--mat-sys-outline) break-words">
            @for (title of titles; track title) {
              <p class="p-1">{{ title }}</p>
            }
          </div>
          @for (item of cashFlowData; track item.periodNumber) {
            <div class="grid grid-cols-18 border-b border-(--mat-sys-outline) p-2 h-[52px] text-[12px]" (click)="toggleAccordion(item.periodNumber)">
              <p>{{ item.periodNumber }}</p>
              <p>{{ item.assignedDate | date: 'shortDate' }}</p>
              <p>{{ item.anualInflation | percent }}</p>
              <p>{{ item.periodInflation | percent }}</p>
              <p>{{ item.gracePeriod }}</p>
              <p>{{ item.bondValue | currency:currentCurrency }}</p>
              <p>{{ item.indexedBondValue | currency:currentCurrency }}</p>
              <p>{{ item.cupon | currency:currentCurrency }}</p>
              <p>{{ item.payment | currency:currentCurrency }}</p>
              <p>{{ item.amortization | currency:currentCurrency }}</p>
              <p>{{ item.premium | currency:currentCurrency }}</p>
              <p>{{ item.shield | currency:currentCurrency }}</p>
              <p>{{ item.issuerFlow | currency:currentCurrency }}</p>
              <p>{{ item.issuerFlowWithShield | currency:currentCurrency }}</p>
              <p>{{ item.bondHolderFlow | currency:currentCurrency }}</p>
              <p>{{ item.updatedFlow | currency:currentCurrency }}</p>
              <p>{{ item.FAxPeriod | currency:currentCurrency }}</p>
              <p>{{ item.pFactor | number:'1.0-2' }}</p>
            </div>
            @if (this.isIssuer && this.accordionStates[item.periodNumber] && item.periodNumber !== 0) {
              <div class="bg-white/10 text-white rounded-b-lg p-4 relative flex items-center justify-between">
                <div class="absolute top-2 right-6">
                  <mat-icon fontIcon="keyboard_arrow_up" class="text-5xl" />
                </div>
                <div class="flex flex-col gap-4">
                  <span >Actualizar Periodo de Gracia del bono</span>
                  <mat-form-field>
                    <mat-label>Periodo de Gracia</mat-label>
                    <mat-select [(ngModel)]="newGracePeriod">
                      @for (gp of gracePeriods.slice(0, -1); track gp.value) {
                        <mat-option [value]="gp.value" [disabled]="item.gracePeriod === 'N'" >{{gp.viewValue}}</mat-option>
                      }
                    </mat-select>
                  </mat-form-field>
                </div>
                <button matButton="outlined" (click)="onSaveGracePeriod(bondId, item.periodNumber, newGracePeriod)" >Guardar Cambios</button>
              </div>
            }
          }
        </div>
      </div>



    </section>
  `,
  styles: ``
})




export class BondCashflowComponent {

  titles: string[] = [
    'N° periodo', 'Fecha programada', 'Inflacion programada', 'Inflacion del periodo',
    'Periodo de gracia', 'Bono', 'Bono Indexado', 'Cupon', 'Cuota', 'Amortizacion',
    'Prima', 'Escudo', 'Flujo Emisor', 'Flujo Emisor c/ Escudo', 'Flujo Bonista',
    'Flujo Actual', 'FA x plazo', 'Factor y Convexidad'
  ];

  bondId: number;
  bond: Bond | undefined;
  cashFlowData: CashFlow[] = [] ;
  originalCashFlowData: CashFlow[] = [];
  accordionStates : boolean[] = [];
  isIssuer: boolean = false;
  currentCurrency: string = 'USD';

  exchangeRates: { [key: string]: number } = {
    'USD': 1,
    'EUR': 0.92,
    'PEN': 3.75,
    'GBP': 0.79,
    'JPY': 157.28,
    'CHF': 0.90
  };

  gracePeriods: GracePeriod[] = [
    {value:'T' , viewValue: 'Total'},
    {value:'P' , viewValue: 'Parcial'},
    {value:'S' , viewValue: 'Ninguno'},
    {value:'N' , viewValue: 'No aplica'}
  ]

  supportedCurrencies: Currency[] = [
    {value: 'USD', viewValue: 'Dólar Estadounidense'},
    {value: 'EUR', viewValue: 'Euro'},
    {value: 'PEN', viewValue: 'Sol Peruano'},
    {value: 'GBP', viewValue: 'Libra Esterlina'},
    {value: 'JPY', viewValue: 'Yen Japonés'},
    {value: 'CHF', viewValue: 'Franco Suizo'}
  ]

  newGracePeriod: string = 'S';

  constructor(private router : Router, private bondsApiService : BondsApiService) {
    this.bondId = Number(this.router.url.split('/')[2]);
    this.loadCashFlow();
    this.bondsApiService.getBondById(this.bondId).subscribe({
      next: (data) => {
        this.bond = data;
      }
    })

  }

  loadCashFlow() {
    this.bondsApiService.getBondCashflowById(this.bondId).subscribe({
      next: (data) => {
        this.originalCashFlowData = JSON.parse(JSON.stringify(data));
        this.cashFlowData = data;
        this.accordionStates = new Array(this.cashFlowData.length).fill(false);
        this.isIssuer = localStorage.getItem('role') === 'ROLE_ISSUER';
        this.onCurrencyChange(this.currentCurrency);
      },
      error: (error) => {
        console.error('Error fetching cashflow data:', error);
      }
    });
  }

  // Toggles the accordion state
  toggleAccordion(index: number) {
    const currentState = this.accordionStates[index];
    this.accordionStates.fill(false);
    this.accordionStates[index] = !currentState;

    if (this.accordionStates[index]) {
      const cashFlowItem = this.cashFlowData.find(item => item.periodNumber === index);
      if (cashFlowItem) {
        this.newGracePeriod = cashFlowItem.gracePeriod;
      }
    }
  }

  onSaveGracePeriod(bondId: number , periodNumber: number, gracePeriod: string) {
    if (periodNumber === 0) {
      return;
    }
    this.bondsApiService.updatePeriodGraceByBondIdAndPeriodNumber(bondId, periodNumber, gracePeriod).subscribe({
      next: () => {
        console.log(`Grace period for bond ${bondId}, period ${periodNumber} updated to ${gracePeriod}`);
        this.loadCashFlow(); // Reload data to show changes
      },
      error: (err) => {
        console.error('Error updating grace period', err);
      }
    });
  }

  onCurrencyChange(selectedCurrency: string) {
    const rate = this.exchangeRates[selectedCurrency];
    if (!rate) {
      this.cashFlowData = JSON.parse(JSON.stringify(this.originalCashFlowData));
      return;
    }

    this.cashFlowData = this.originalCashFlowData.map(item => {
      const newItem = {...item};
      const fieldsToConvert: (keyof CashFlow)[] = [
        'bondValue', 'indexedBondValue', 'cupon', 'payment', 'amortization',
        'premium', 'shield', 'issuerFlow', 'issuerFlowWithShield',
        'bondHolderFlow', 'updatedFlow', 'FAxPeriod'
      ];
      fieldsToConvert.forEach(field => {
        if (typeof newItem[field] === 'number') {
          (newItem[field] as number) *= rate;
        }
      });
      return newItem;
    });
  }
}
