import {ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import {Router} from '@angular/router';
import {BondsApiService} from '../../services/bonds-api.service';
import {CashFlow} from '../../model/cash-flow.entity';
import {MatIcon} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {CurrencyPipe, DatePipe, DecimalPipe, NgClass, PercentPipe} from '@angular/common';
import {Bond} from '../../model/bond.entity';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {BondResult} from '../../model/bond-result.entity';
import {CurrencyConverterPipe} from '../../pipe/currency-converter.pipe';
import {ScrollingModule} from '@angular/cdk/scrolling';

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
    FormsModule,
    NgClass,
    CurrencyConverterPipe,
    ScrollingModule
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
              <mat-select [(ngModel)]="currentCurrency">
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
          <cdk-virtual-scroll-viewport itemSize="52" class="h-[520px]">
            <ng-container *cdkVirtualFor="let item of cashFlowData; trackBy: trackByPeriodNumber">
              <div class="grid grid-cols-18 border-b border-(--mat-sys-outline) p-2 h-[52px] text-[12px]"
                   (click)="toggleAccordion(item.periodNumber)">
                <p>{{ item.periodNumber }}</p>
                <p>{{ item.assignedDate | date: 'shortDate' }}</p>
                <p>{{ item.anualInflation | percent }}</p>
                <p>{{ item.periodInflation | percent }}</p>
                <p>{{ item.gracePeriod }}</p>
                <p [ngClass]="{'text-red-500': item.bondValue < 0, 'text-blue-500': item.bondValue >= 0}">{{ (item.bondValue | currencyConverter:currentCurrency:exchangeRates) | currency:currentCurrency }}</p>
                <p [ngClass]="{'text-red-500': item.indexedBondValue < 0, 'text-blue-500': item.indexedBondValue >= 0}">{{ (item.indexedBondValue | currencyConverter:currentCurrency:exchangeRates) | currency:currentCurrency }}</p>
                <p [ngClass]="{'text-red-500': item.cupon < 0, 'text-blue-500': item.cupon >= 0}">{{ (item.cupon | currencyConverter:currentCurrency:exchangeRates) | currency:currentCurrency }}</p>
                <p [ngClass]="{'text-red-500': item.payment < 0, 'text-blue-500': item.payment >= 0}">{{ (item.payment | currencyConverter:currentCurrency:exchangeRates) | currency:currentCurrency }}</p>
                <p [ngClass]="{'text-red-500': item.amortization < 0, 'text-blue-500': item.amortization >= 0}">{{ (item.amortization | currencyConverter:currentCurrency:exchangeRates) | currency:currentCurrency }}</p>
                <p [ngClass]="{'text-red-500': item.premium < 0, 'text-blue-500': item.premium >= 0}">{{ (item.premium | currencyConverter:currentCurrency:exchangeRates) | currency:currentCurrency }}</p>
                <p [ngClass]="{'text-red-500': item.shield < 0, 'text-blue-500': item.shield >= 0}">{{ (item.shield | currencyConverter:currentCurrency:exchangeRates) | currency:currentCurrency }}</p>
                <p [ngClass]="{'text-red-500': item.issuerFlow < 0, 'text-blue-500': item.issuerFlow >= 0}">{{ (item.issuerFlow | currencyConverter:currentCurrency:exchangeRates) | currency:currentCurrency }}</p>
                <p [ngClass]="{'text-red-500': item.issuerFlowWithShield < 0, 'text-blue-500': item.issuerFlowWithShield >= 0}">{{ (item.issuerFlowWithShield | currencyConverter:currentCurrency:exchangeRates) | currency:currentCurrency }}</p>
                <p [ngClass]="{'text-red-500': item.bondHolderFlow < 0, 'text-blue-500': item.bondHolderFlow >= 0}">{{ (item.bondHolderFlow | currencyConverter:currentCurrency:exchangeRates) | currency:currentCurrency }}</p>
                <p [ngClass]="{'text-red-500': item.updatedFlow < 0, 'text-blue-500': item.updatedFlow >= 0}">{{ (item.updatedFlow | currencyConverter:currentCurrency:exchangeRates) | currency:currentCurrency }}</p>
                <p [ngClass]="{'text-red-500': item.FAxPeriod < 0, 'text-blue-500': item.FAxPeriod >= 0}">{{ (item.FAxPeriod | currencyConverter:currentCurrency:exchangeRates) | currency:currentCurrency }}</p>
                <p>{{ item.pFactor | number:'1.0-2' }}</p>
              </div>
              @if (this.isIssuer && !this.isHired && this.accordionStates[item.periodNumber] && item.periodNumber !== 0) {
                <div class="bg-white/10 text-white rounded-b-lg p-4 relative flex items-center justify-between">
                  <div class="absolute top-2 right-6">
                    <mat-icon fontIcon="keyboard_arrow_up" class="text-5xl"/>
                  </div>
                  <div class="flex flex-col gap-4">
                    <span>Actualizar Periodo de Gracia del bono</span>
                    <mat-form-field>
                      <mat-label>Periodo de Gracia</mat-label>
                      <mat-select [(ngModel)]="newGracePeriod">
                        @for (gracePeriod of gracePeriods.slice(0,-1); track gracePeriod.value) {
                          <mat-option [value]="gracePeriod.value">{{ gracePeriod.viewValue }}</mat-option>
                        }
                      </mat-select>
                    </mat-form-field>
                  </div>
                  <button mat-button="outlined" (click)="onSaveGracePeriod(bondId, item.periodNumber, newGracePeriod)">Guardar Cambios</button>
                </div>
              }
            </ng-container>
          </cdk-virtual-scroll-viewport>
        </div>
      </div>
    </section>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
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
  cashFlowData: CashFlow[] = [];
  accordionStates: boolean[] = [];

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
    {value: 'T', viewValue: 'Total'},
    {value: 'P', viewValue: 'Parcial'},
    {value: 'S', viewValue: 'Ninguno'},
    {value: 'N', viewValue: 'No aplica'}
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

  isHired: boolean = false;

  constructor(private router: Router, private bondsApiService: BondsApiService, private cdr: ChangeDetectorRef) {
    this.bondId = Number(this.router.url.split('/')[2]);
    this.loadCashFlow();
    this.bondsApiService.getBondById(this.bondId).subscribe({
      next: (data) => {
        this.bond = data;
        this.isHired = this.bond.bondType === 'HIRED';
        this.cdr.markForCheck();
      }
    });
  }

  loadCashFlow() {
    this.bondsApiService.getBondCashflowById(this.bondId).subscribe({
      next: (data) => {
        this.cashFlowData = data;
        this.accordionStates = new Array(this.cashFlowData.length).fill(false);
        this.isIssuer = localStorage.getItem('role') === 'ROLE_ISSUER';
        this.cdr.markForCheck();
      },
      error: (error) => {
        console.error('Error fetching cashflow data:', error);
      }
    });
    this.bondsApiService.getBondResultById(this.bondId).subscribe({
      next: (data) => {
        this.bondResult = data;
        this.cdr.markForCheck();
      },
      error: (error) => {
        console.error('Error fetching bond result:', error);
      }
    })
  }

  trackByPeriodNumber(index: number, item: CashFlow): number {
    return item.periodNumber;
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

  onSaveGracePeriod(bondId: number, periodNumber: number, gracePeriod: string) {
    if (periodNumber === 0) {
      return;
    }
    this.bondsApiService.updatePeriodGraceByBondIdAndPeriodNumber(bondId, periodNumber, gracePeriod).subscribe({
      next: () => {
        console.log(`Grace period for bond ${bondId}, period ${periodNumber} updated to ${gracePeriod}`);
        this.loadCashFlow();
      },
      error: (err) => {
        console.error('Error updating grace period', err);
      }
    });
  }
  goToEditBond(id: number) {
    this.router.navigate([`/bonds/${id}/edit`]);
  }

}
