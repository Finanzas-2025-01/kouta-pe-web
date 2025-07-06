

export class CashFlow {
  periodNumber: number;
  assignedDate: Date;
  anualInflation: number;
  periodInflation: number;
  gracePeriod: 'T' | 'S' | 'P' | 'N';
  bondValue: number;
  indexedBondValue: number;
  cupon: number;
  payment: number;
  amortization: number;
  premium: number;
  shield: number;
  issuerFlow: number;
  issuerFlowWithShield: number;
  bondHolderFlow: number;
  updatedFlow: number;
  FAxPeriod: number; // Financial Ax Period
  pFactor: number; // Present Factor

  constructor() {
    this.periodNumber = 0;
    this.assignedDate = new Date();
    this.anualInflation = 0;
    this.periodInflation = 0;
    this.gracePeriod = 'T';
    this.bondValue = 0;
    this.indexedBondValue = 0;
    this.cupon = 0;
    this.payment = 0;
    this.amortization = 0;
    this.premium = 0;
    this.shield = 0;
    this.issuerFlow = 0;
    this.issuerFlowWithShield = 0;
    this.bondHolderFlow = 0;
    this.updatedFlow = 0;
    this.FAxPeriod = 0;
    this.pFactor = 0;
  }
}
